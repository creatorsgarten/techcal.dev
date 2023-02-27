# techcal-discord

Automatically updates the [#upcoming-events](https://discord.gg/YRczwr7krE) channel on Discord.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/main.ts
```

This project was created using `bun init` in bun v0.4.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Triggering manually

Anyone with write access to this repo can manually trigger the synchronization to Discord by running:

```
gh --repo creatorsgarten/techcal.dev workflow run discord.yml
```
