# Arc IMPACT — contact mailer (Cloudflare Worker)

Receives JSON from the static site contact form, verifies **Cloudflare Turnstile**, then sends email through a transactional **HTTPS** API (no raw SMTP socket; providers expose an HTTP “SMTP API”).

## Supported mail drivers

| `MAIL_DRIVER` | Secret variable        | Provider docs |
|---------------|------------------------|---------------|
| `resend`      | `RESEND_API_KEY`       | [Send with Workers](https://developers.cloudflare.com/workers/tutorials/send-emails-with-resend/) |
| `postmark`    | `POSTMARK_SERVER_TOKEN`| [Postmark API](https://postmarkapp.com/developer) |
| `brevo`       | `BREVO_API_KEY`        | [Brevo transactional](https://developers.brevo.com/docs/send-a-transactional-email) |

Set `MAIL_FROM` and `MAIL_TO` to real addresses. The `from` domain must be authorized in your provider.

## Environment

**Plain vars** (wrangler.toml `[vars]` or dashboard → Worker → Settings → Variables):

- `ALLOWED_ORIGINS` — Comma-separated list of exact origins allowed to call this worker (include `https://<user>.github.io` if you use GitHub Pages default host).
- `MAIL_DRIVER` — `resend` | `postmark` | `brevo`
- `MAIL_TO` — Inbox that receives submissions
- `MAIL_FROM` — Sender shown to recipients (and provider)

**Secrets** (never commit):

```bash
cd worker
npx wrangler secret put TURNSTILE_SECRET
npx wrangler secret put RESEND_API_KEY   # or POSTMARK_SERVER_TOKEN / BREVO_API_KEY
```

## Routing

Point a hostname (e.g. `contact.arcimpact.eu`) at this worker and map a path such as `/api/contact`:

1. Workers & Pages → your worker → **Triggers** → **Routes** → add `contact.arcimpact.eu/api/*` on the correct zone, **or**
2. Use `[[routes]]` in `wrangler.toml` (see commented example).

The static site’s `WORKER_URL` must match the public URL (see `assets/js/main.js`).

## Turnstile (site)

1. Create a Turnstile widget in the Cloudflare dashboard (same account as the worker is fine).
2. Put the **site key** in the HTML widget; put the **secret key** in `TURNSTILE_SECRET`.
3. On submit, the browser must send the token as `cf-turnstile-response` in the JSON body (default field name for Turnstile).

## Local test

```bash
cd worker
npm install
npm run dev
```

Use Turnstile [test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) while developing.

## Deploy

```bash
cd worker
npm install
npm run deploy
```

After changing `[vars]`, redeploy or update variables in the dashboard.
