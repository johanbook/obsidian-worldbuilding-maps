# obsidian-worldbuilding-maps

NB: This is very much a Work in Progress

A plugin similar to the official Obsidian Maps but that uses a static image in
the vault instead.

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
