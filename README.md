# @piplup/cache-buster

Cache busting for React apps, and the Vite plugin that wires it into a build.
Both packages release together from this repository on a shared version.

**[Documentation](https://www.piplupjs.com/docs/cache-busting)** ·
[Reload users after a deploy](https://www.piplupjs.com/docs/reload-after-deploy)

## [@piplup/cache-buster](./packages/cache-buster/README.md)

React library that checks for updates and reloads the page when a new release is
detected. Ships the `piplup-cache-buster` CLI, which writes the release id into
your public directory at build time.

## [@piplup/vite-plugin-cache-buster](./packages/vite-plugin-cache-buster/README.md)

A Vite plugin that runs the `piplup-cache-buster` CLI during the build, so you
don't have to add it to your own scripts.

## Development

```bash
npm install
npm run build
npm run lint
npm run typecheck
```

Releases are cut from `main` by the
[Release workflow](./.github/workflows/release.yml), which runs
`npm run release`. Use `npm run release:dry` locally to rehearse one — it
reverts everything it does.

Documentation for both packages lives in
[piplupjs/piplup-docs](https://github.com/piplupjs/piplup-docs).
