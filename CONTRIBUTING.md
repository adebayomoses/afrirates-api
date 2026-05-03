# Contributing to afrirates-api

Thank you for your interest in contributing! This project is community-driven and every contribution matters — whether it's adding a new corridor, improving the scraper, fixing a bug, or improving documentation.

---

## Ways to contribute

- **Add a corridor** — support more African currency pairs
- **Improve the scraper** — better resilience, accuracy, or speed
- **Fix bugs** — check the [issues](https://github.com/YOUR_USERNAME/afrirates-api/issues) tab
- **Improve docs** — clearer README, better examples
- **Add tests** — increase coverage

---

## Development setup

1. Fork and clone the repo
2. Follow the [Getting started](README.md#getting-started) guide
3. Create a branch: `git checkout -b feat/your-feature`

---

## Adding a new corridor

1. Open `packages/types/src/corridors.ts`
2. Add your corridor to the `CORRIDORS` array:
   ```ts
   { from: "USD", to: "ETB", label: "US Dollar → Ethiopian Birr" }
   ```
3. Update the scraper in `apps/scraper/src/` to fetch rates for the new pair
4. Add a migration if the DB schema changes: `pnpm db:migrate`
5. Open a PR with the corridor name in the title, e.g. `feat: add USD → ETB corridor`

---

## Pull request guidelines

- Keep PRs focused — one feature or fix per PR
- Include a clear description of what changed and why
- Add or update tests where relevant
- Make sure `pnpm lint` and `pnpm typecheck` pass before submitting

---

## Code style

- TypeScript strict mode — no `any`
- ESLint + Prettier (run `pnpm format` before committing)
- Prefer named exports over default exports
- Keep functions small and single-purpose

---

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add EUR → GHS corridor
fix: handle rate parsing error for NGN
docs: update API reference
chore: upgrade Playwright to 1.44
```

---

## Questions?

Open a [discussion](https://github.com/YOUR_USERNAME/afrirates-api/discussions) or file an issue.
