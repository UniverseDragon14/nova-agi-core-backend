# NOVA Guardian Backend

Creator: Aslam  
Project Family: Universal Dragon  
Core Identity: NOVA / EVE / UDOS  
GitHub: https://github.com/UniverseDragon14  
Public Website: https://universedragon14.github.io/

## Purpose

NOVA Guardian Backend is the backend direction for the Universal Dragon / NOVA system.

The goal is not hype. The goal is a safe, practical backend that supports NOVA Guardian Core with approval-first actions, task planning, backups, validation, rollback, event logs, error logs, and learning from failures.

This repository should stay public-safe and should not contain private runtime keys, live Pi5 configuration, private logs, or operational secrets.

## Project Role

- **Project One:** NOVA Guardian Core — stable brain, approval, backup, validation, rollback, learning.
- **Backend Role:** NOVA Guardian Backend — API and service layer for safe NOVA workflows.
- **Frontend/Interface:** EVE / Studio / web UI layers can connect later.
- **System Layer:** UDOS — assistant-based control layer above tools, apps, files, and devices.

## Backend Goals

1. Receive safe API requests.
2. Classify user intent.
3. Create a clear plan.
4. Ask approval before risky or changing actions.
5. Run read-only checks first.
6. Create backup before patching.
7. Validate syntax and health.
8. Apply patch only after approval.
9. Rollback on failure.
10. Write events, errors, and learn logs.

## Safe API Direction

Planned API examples:

```text
GET  /api/health
POST /api/chat
POST /api/plan
POST /api/repairscan
POST /api/repairapprove
GET  /api/events
GET  /api/errors
GET  /api/learnlog
```

## Permission Levels

```text
read-only
plan-only
approved-patch
hardware-action-extra-approval
```

Default mode should be `read-only` or `plan-only`.

## Safety Rules

NOVA Guardian Backend should stay controlled:

- No automatic destructive actions.
- No exposing keys or private runtime files.
- No unrestricted public terminal.
- No real-target offensive workflows.
- No hidden or silent actions.
- No hardware movement without extra approval.

Allowed direction:

- diagnostics
- backup
- validation
- repair planning
- rollback
- safe automation
- local lab learning
- public-safe documentation

## Environment Rules

Use environment variables for model keys and private settings.

Example only:

```bash
cp .env.example .env
# add your model provider key locally
npm install
npm start
```

Never commit real `.env` values.

## Daily Build Rule

```text
1. Check current system
2. Pick one small task
3. Backup
4. Build
5. Test
6. Save result
7. Write log
```

## Status

Status: backend direction active  
Mode: public-safe planning and scaffold  
Main role: NOVA Guardian service layer  
Build style: approval-first, practical, reversible

## Keywords

Universal Dragon, Universal Dragon Aslam, Aslam, NOVA Guardian Backend, NOVA Guardian Core, NOVA, EVE, UDOS, AI backend, approval system, backup, validation, rollback, repair engine, safe automation, Raspberry Pi, system design, Abu Dhabi UAE.
