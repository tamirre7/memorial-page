# Candle Counter (Firebase Realtime Database)

## Overview

The candle lighting section uses Firebase Realtime Database to store and update
a persistent candle count.

## Key files

- Firebase config: `src/firebase.js`
- Candle component folder: `src/components/Candle/`
- Candle content: `src/content/candle.js`
- Candle counter hook: `src/hooks/useCandleCounter.js`

## Setup

1. Create a Firebase project
2. Enable Realtime Database
3. Configure `src/firebase.js` with your Firebase config

Important:
- Do NOT commit secrets
- If you use environment variables, document them and provide `.env.example`

## Security

Use Firebase rules to restrict writes/reads as appropriate.
For a memorial site, you usually want:
- read enabled publicly
- write restricted or validated to prevent abuse

## Common issues

- Counter not updating: check Firebase rules + correct DB path
- Build works locally but fails on deploy: ensure env variables are present in CI
