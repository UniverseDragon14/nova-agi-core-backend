# NOVA Guardian Backend

Experimental Express backend for the Universal Dragon NOVA decision pipeline.

## Current request flow

~~~text
POST /api/nova
  -> command risk check
  -> named profile lookup
  -> task decomposition
  -> Gemini generation
  -> output judge
  -> at most one retry
  -> JSON response and in-process memory
~~~

## API

| Method | Route | Purpose |
|---|---|---|
| GET | / | service identity |
| GET | /api/health | process health |
| POST | /api/nova | run the NOVA pipeline |

Example request:

~~~json
{
  "command": "Review this deployment plan",
  "user": "Guest"
}
~~~

The command is required. The user field selects an application profile; it is **not authentication**.

## Run locally

~~~bash
npm install
cp .env.example .env
# set GEMINI_API_KEY in .env
npm start
~~~

Development mode:

~~~bash
npm run dev
~~~

## Current implementation notes

- Gemini is called through the Google Gen AI SDK.
- The safety module blocks configured command patterns.
- The planner decomposes a request before generation.
- The judge can reject an answer and trigger one retry.
- session and long-term stores are process-local/volatile and reset when the service restarts.

## Security boundary

Do not expose this service directly to the internet in its current form.

- A request-provided user name can select a privileged profile; add real identity verification and server-side authorization first.
- Add rate limiting, request logging/redaction, stricter CORS, abuse controls, and durable storage before production use.
- Keep model keys only in environment variables.
- Generated text is advice/data, not proof that a system action occurred.

This is an experimental orchestration backend, not AGI and not an autonomous root controller.
