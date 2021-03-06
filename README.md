<h1 align="center">Bridged - SJSU CMPE-195 Senior Project</h1>

## Prerequisites

1. Node, ESLint, and Prettier installed.
2. Download dependencies by running `npm install`

## Setting up your workspace

1. Go to settings.json in VSCode and paste `"editor.defaultFormatter": "esbenp.prettier-vscode", "editor.formatOnSave": true` and then save.

## How to run the app in development mode

1. In root directory, run `npm run dev`
2. Go to `localhost:8080` in your browser
3. CD to truffle folder and run `truffle migrate --network development`

## Commit rules

1. Use descriptive commit messages.
2. Active verbs, i.e. `Adds x feature`, `Fixes y bug`
3. Start with a capital. See above.
4. Commit often! Don't change 700 lines and make it into one commit.

## Merging Process

1. Branch off onto your own branch.
2. Lint code by running `npm run lint`
3. If both lint passes, open a PR into master.
4. Inside the PR, connect issue with Zenhub (download Google Chrome Zenhub extension).
5. Code review.
