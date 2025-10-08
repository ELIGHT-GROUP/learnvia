# Learnvia Backend - Architecture Overview

This document provides a concise overview of the backend service in this repository, how it starts, key modules, important environment variables, and recommended next steps for maintainers.

## High-level architecture

- Entrypoint: `src/index.ts` — initializes Express, attaches middleware, mounts routes and starts server after connecting to MongoDB.
- Configuration: small config modules in `src/config` (API base, Mongo connection, Winston logger).
- Layers:
  - Routes: `src/routes/*` — define HTTP endpoints and attach middleware.
  - Controllers: `src/controllers/*` — HTTP handlers that orchestrate service calls and shape responses.
  - Services: `src/services/*` — business logic, interactions with models and external providers.
  - Models: `src/models/*` — Mongoose models and schema definitions.
  - Middleware: `src/middleware/*` — logging (morgan -> winston), authentication, error handling, etc.
  - Utils: `src/utils/*` — JWT helper, API response formatter, logger helper.

## Request/auth flow (Google OAuth)

1. Client calls `GET /api/v1/auth/google` to start OAuth. Server signs a `state` token and redirects to Google consent page.
2. Google calls back to `GET /api/v1/auth/google/callback` with a code + state.
3. Server verifies the signed `state` token, exchanges code for tokens with Google, verifies the `id_token`.
4. Server finds/creates a local user record, issues an application JWT and redirects client back to the client `redirect_uri` with the token in the URL fragment.
5. Protected APIs require `Authorization: Bearer <token>`; `src/middleware/auth.middleware.ts` validates JWT and enforces optional role checks.

## Key files

- `src/index.ts` — app bootstrap
- `src/config/mongo.config.ts` — mongoose connection
- `src/config/logger.config.ts` — winston configuration
- `src/middleware/logger.middleware.ts` — morgan -> winston
- `src/middleware/error.middleware.ts` — centralized error handling
- `src/middleware/auth.middleware.ts` — JWT verification + role checks
- `src/controllers/google.auth.controller.ts` — OAuth endpoints
- `src/services/google.auth.service.ts` — Google token exchange & user provisioning
- `src/models/User.model.ts` — user schema
- `src/utils/jwt.util.ts` — sign & verify helpers
- `src/utils/apiResponse.ts` — consistent API response shape

## Notable environment variables

- `PORT` — HTTP port (default 8080)
- `NODE_ENV` — environment (development/production)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign application JWTs and short-lived state tokens
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` — Google OAuth config
- `FRONTEND_ORIGIN` — used as default redirect
- `CLIENT_REDIRECT_WHITELIST` — comma-separated allowed client redirect URIs

Refer to `.env.example` for full sample values.

## How to run (development)

1. Copy `.env.example` to `.env` and fill in values (especially `MONGO_URI` and `JWT_SECRET`).
2. Install dependencies:

   npm install

3. Run in development with auto-reload (requires `ts-node-dev`):

   npm run dev

4. Or build and run production artifacts:

   npm run build
   npm start

## Health, logs and observability

- Logs are emitted via Winston to the console and `logs/error.log` and `logs/combined.log` (controlled by `NODE_ENV` and `ENABLE_COMBINED_LOGS`).
- Morgan request logs are forwarded to Winston at `http` level.

## Short list of recommended improvements (non-breaking, prioritized)

1. Fail-fast validation of required environment variables at startup (JWT_SECRET, MONGO_URI).
2. Ensure application JWTs have a reasonable expiration (`JWT_EXPIRES_IN`) and use refresh tokens for longer sessions.
3. Sanitize logs to avoid printing tokens or secrets (remove token previews from logs).
4. Use typed HttpError exceptions in services for clearer error handling, and let centralized middleware handle responses.
5. Add input validation for public endpoints (e.g., `zod`/`celebrate`) and rate limiting for auth endpoints.
6. Align `UserRole` enum and Mongoose `role` enum/default values so roles are consistent.

## Next steps I can help with

- Add a small startup env validation (non-breaking), or implement typed errors in services.
- Add input validation for critical endpoints.
- Harden OAuth usage (short `state` expiry, remove token preview logging) and set token TTLs.

If you want, I can make one of the safe improvements above now (for example, add `ARCHITECTURE.md` — done — or add an env validation check at startup). Tell me which you prefer and I'll proceed.
