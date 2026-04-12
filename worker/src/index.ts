/**
 * Contact form endpoint for static sites (e.g. GitHub Pages).
 * 1) Verifies Cloudflare Turnstile server-side
 * 2) Sends mail via HTTPS transactional API (Resend, Postmark, or Brevo SMTP API)
 */

export interface Env {
  TURNSTILE_SECRET: string;
  /** Comma-separated origins, e.g. "https://user.github.io,https://arcimpact.eu" */
  ALLOWED_ORIGINS: string;
  MAIL_DRIVER: 'resend' | 'postmark' | 'brevo';
  MAIL_TO: string;
  MAIL_FROM: string;
  RESEND_API_KEY?: string;
  POSTMARK_SERVER_TOKEN?: string;
  BREVO_API_KEY?: string;
}

const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function parseOrigins(raw: string | undefined): Set<string> {
  const set = new Set<string>();
  if (!raw) return set;
  for (const part of raw.split(',')) {
    const o = part.trim();
    if (o) set.add(o);
  }
  return set;
}

function corsHeaders(origin: string | null, allowed: Set<string>): HeadersInit {
  const h = new Headers();
  if (origin && allowed.has(origin)) {
    h.set('Access-Control-Allow-Origin', origin);
    h.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    h.set('Access-Control-Allow-Headers', 'Content-Type');
    h.set('Access-Control-Max-Age', '86400');
  }
  return h;
}

async function verifyTurnstile(
  secret: string,
  token: string,
  remoteip: string | undefined
): Promise<boolean> {
  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteip) body.set('remoteip', remoteip);

  const res = await fetch(TURNSTILE_VERIFY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

function buildEmailText(fields: Record<string, string>): { subject: string; text: string } {
  const replyEmail = fields.email || fields['adresse-mail'] || fields.mail || '';
  const name =
    [fields.prenom, fields.nom].filter(Boolean).join(' ').trim() ||
    fields.name ||
    'Contact form';

  const lines: string[] = [];
  lines.push('New message from arcimpact.eu contact form', '');
  for (const [k, v] of Object.entries(fields)) {
    if (k === 'cf-turnstile-response') continue;
    if (!v) continue;
    lines.push(`${k}: ${v}`);
  }
  lines.push('', `Reply-To suggestion: ${replyEmail || '(none)'}`);

  const subject = `[Arc IMPACT] ${name}${replyEmail ? ` <${replyEmail}>` : ''}`.slice(0, 200);
  return { subject, text: lines.join('\n') };
}

async function sendWithResend(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  text: string,
  replyTo?: string
): Promise<Response> {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
}

async function sendWithPostmark(
  token: string,
  from: string,
  to: string,
  subject: string,
  text: string,
  replyTo?: string
): Promise<Response> {
  return fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'X-Postmark-Server-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      From: from,
      To: to,
      Subject: subject,
      TextBody: text,
      ...(replyTo ? { ReplyTo: replyTo } : {}),
    }),
  });
}

function parseFromAddress(from: string): { email: string; name: string } {
  const m = from.match(/^(?:"?([^"]*)"?\s*)?<([^>]+)>$/);
  if (m) return { name: (m[1] || 'Arc IMPACT').trim(), email: m[2].trim() };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from.trim())) {
    return { name: 'Arc IMPACT', email: from.trim() };
  }
  return { name: 'Arc IMPACT', email: from.replace(/.*<([^>]+)>.*/, '$1').trim() || from.trim() };
}

async function sendWithBrevo(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  text: string,
  replyTo?: string
): Promise<Response> {
  const sender = parseFromAddress(from);
  return fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { email: sender.email, name: sender.name },
      to: [{ email: to }],
      subject,
      textContent: text,
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
    }),
  });
}

async function sendMail(env: Env, subject: string, text: string, replyTo?: string): Promise<Response> {
  const driver = (env.MAIL_DRIVER || 'resend').toLowerCase() as Env['MAIL_DRIVER'];
  const to = env.MAIL_TO;
  const from = env.MAIL_FROM;

  if (driver === 'resend') {
    const key = env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY missing');
    return sendWithResend(key, from, to, subject, text, replyTo);
  }
  if (driver === 'postmark') {
    const key = env.POSTMARK_SERVER_TOKEN;
    if (!key) throw new Error('POSTMARK_SERVER_TOKEN missing');
    return sendWithPostmark(key, from, to, subject, text, replyTo);
  }
  if (driver === 'brevo') {
    const key = env.BREVO_API_KEY;
    if (!key) throw new Error('BREVO_API_KEY missing');
    return sendWithBrevo(key, from, to, subject, text, replyTo);
  }
  throw new Error(`Unknown MAIL_DRIVER: ${driver}`);
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const allowed = parseOrigins(env.ALLOWED_ORIGINS);
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, allowed) });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, allowed) },
      });
    }

    if (!origin || !allowed.has(origin)) {
      return new Response(JSON.stringify({ error: 'Forbidden origin' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let body: Record<string, string>;
    try {
      body = (await request.json()) as Record<string, string>;
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, allowed) },
      });
    }

    const token = body['cf-turnstile-response'] || '';
    if (!token) {
      return new Response(JSON.stringify({ error: 'Missing Turnstile token' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, allowed) },
      });
    }

    const ip = request.headers.get('CF-Connecting-IP') || undefined;
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET, token, ip);
    if (!ok) {
      return new Response(JSON.stringify({ error: 'Turnstile verification failed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, allowed) },
      });
    }

    const { subject, text } = buildEmailText(body);
    const replyTo =
      body.email?.trim() ||
      body['adresse-mail']?.trim() ||
      body.mail?.trim() ||
      undefined;

    try {
      const mailRes = await sendMail(env, subject, text, replyTo);
      if (!mailRes.ok) {
        const errText = await mailRes.text();
        console.error('Mail provider error:', mailRes.status, errText);
        return new Response(JSON.stringify({ error: 'Could not send message' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, allowed) },
        });
      }
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ error: 'Mail configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, allowed) },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, allowed) },
    });
  },
};
