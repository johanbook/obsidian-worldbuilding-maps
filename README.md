# Obsidian Worldbuilding Maps

> [!WARNING]
> This plugin is a work in progress and usability might vary.

**Obsidian Worldbuilding Maps** is an [Obsidian](https://obsidian.md/) plugin
that adds a bases view that plots coordinates from your vault notes on an
image-based map. It is intended for TTRPG and worldbuilding.

## Installation

Add this as a community plugin (when it has become one). Create a new base and
pick the type "Worldbuilding Map" and select an image in the "Background Image"
field to be used as your map.

## Properties

The drawn markers and shapes are based on either formulas or note properties.
The recognized properties are the following:

- `color`: Color of marker or polygon. Should be HEX format.
- `coordinates`: A `multitext` property that contains first the x-coordinate and
  second the y-coordinate. The coordinates are relative to the image dimensions.
- `icon`: [Lucide](https://lucide.dev/) icon to be used in the marker. Default
  is `lucide-map-pin`.

## Example

Below is an example base:

```yaml
views:
    - type: worldbuilding-map-view
      name: Map
      filters:
          and:
              - "!coordinates.isEmpty()"
      imageUrl: Map/World.jpg
```

## Development

To set up for development:

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start compilation in watch mode. When you're ready to
   submit your changes, please open a pull request.
