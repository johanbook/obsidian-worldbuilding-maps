# Obsidian Worldbuilding Maps

> [!WARNING] This plugin is a work in progress and usability might vary.

**Obsidian Worldbuilding Maps** is an [Obsidian](https://obsidian.md/) plugin
that adds a bases view that plots coordinates from your vault notes on an
image-based map.

## Coordinates

Coordinates are stored in the frontmatter of the files like below

```yaml
type: City
coordinates:
    - "0.8"
    - "0.2"
color: red
```

Color and type of icon is inferred from the `type` and `country` props.

## Development

To set up for development:

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start compilation in watch mode. When you're ready to
   submit your changes, please open a pull request.
