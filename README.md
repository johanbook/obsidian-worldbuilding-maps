# obsidian-worldbuilding-maps

> [!WARNING] This plugin is a work in progress and usability might vary.

**obsidian-worldbuilding-maps** is an [Obsidian](https://obsidian.md/) plugin
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

Open a PR.
