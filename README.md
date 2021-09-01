#  @TeachForward pie-lib-extra/\*

Elements are in `packages`.

These elements designed by TeachForward to replace some components used in `@pie-lib` that are further used
into pie-elements in order to customize behavior and ux of those components

## install

```bash
yarn install
```

## Commands

| Action  | Cmd                                 | Notes                                                     |
| ------- | ----------------------------------- | --------------------------------------------------------- |
| test    | `npm test`                          |                                                           |
| lint    | `npm run lint`                      |                                                           |
| build   | `npm run build`                     |                                                           |
| release | `npm run release`                   |                                                           |
## Workflow

- merging to `main` releases `next` version

### test a single package

Just point jest to the dir/file:

```bash
./node_modules/.bin/jest packages/pkg-name/src/
```

## Contributing

- the packages use `independent` versioning, meaning that a change in 1 package won't bump another package's version.

## Development

You will need to link the library used here using `yarn link` command in order to use it in pie-elements
Then run `scripts/watch ediable-html-tm` for example and start writing code here that will reflect in the actual element

