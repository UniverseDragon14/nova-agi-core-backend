# NOVA AGI Advanced

Advanced defensive NOVA proto-agent scaffold.

## Setup

```bash
npm install
cp .env.example .env
# edit .env and add your GEMINI_API_KEY
npm start
```

## CLI

```bash
npm run cli
```

## API

POST `/api/nova`

```json
{
  "user": "UniversalDragon",
  "command": "Analyze my web architecture and suggest hardening steps"
}
```
