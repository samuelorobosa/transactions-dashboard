# Transactions Dashboard

## What it is

- React + TypeScript dashboard for balances, transactions, trends, and CSV export.
- Uses TanStack Query for data, Tailwind for styling, Recharts for charts.

## Quick start

```bash
npm install
npm run dev
```

App defaults to http://localhost:5173.

## Env

Create `.env` in project root:

```env
VITE_API_BASE_URL=https://fe-task-api.mainstack.io
```

## Scripts

- `npm run dev` - dev server with HMR
- `npm run build` - production build
- `npm run test` - vitest suite
- `npm run lint` - lint

## Tests

```bash
npm run test
```

## Notes for reviewers

- Components follow atomic design (`src/components/atoms|molecules|organisms`).
- Mocked data and tests live alongside features for fast iteration.
