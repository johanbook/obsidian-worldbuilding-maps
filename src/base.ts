import { BasesView, QueryController } from "obsidian";

import { renderMarker } from "./marker";
import { parseCoordinates } from "utils";
import { renderPolygon } from "polygon";
import { setUpSvgZoom } from "zoom";

export const VIEW_TYPE = "worldbuilding-map-view";

export class WorldBuildingMapsBasesView extends BasesView {
	readonly type = VIEW_TYPE;
	private containerEl: HTMLElement;

	constructor(controller: QueryController, parentEl: HTMLElement) {
		super(controller);
		this.containerEl = parentEl.createDiv(`${VIEW_TYPE}-container`);
	}

	private getImageUrl() {
		const path = String(this.config.get("imageUrl"));

		const file = this.app.vault.getFileByPath(path);

		if (!file) {
			return null;
		}

		return this.app.vault.getResourcePath(file);
	}

	private createSvgFromImage(
		imageUrl: string,
		width: number,
		height: number,
	) {
		const svgEl = this.containerEl.createSvg("svg", {
			attr: {
				viewBox: `0 0 ${width} ${height}`,
				preserveAspectRatio: "xMidYMid meet",
			},
		});
		svgEl.setCssStyles({ width: "100%", height: "100%" });

		svgEl.createSvg("image", {
			attr: {
				href: imageUrl,
				x: "0",
				y: "0",
				width: String(width),
				height: String(height),
			},
		});

		setUpSvgZoom({
			svg: svgEl,
			originalHeight: height,
			originalWidth: width,
		});

		return svgEl;
	}

	public onDataUpdated(): void {
		this.containerEl.empty();

		const imageUrl = this.getImageUrl();

		if (!imageUrl) {
			this.containerEl.createDiv({
				text: `Cannot find image at url '${imageUrl}'`,
			});
			return;
		}

		// Get image dimensions and render map
		const image = new Image();
		image.onload = () =>
			this.renderMap(imageUrl, image.naturalWidth, image.naturalHeight);
		image.onerror = (error) =>
			console.error("Failed to resolve map dimensions", error);

		image.src = imageUrl;
	}

	private renderMap(imageUrl: string, width: number, height: number) {
		const svgEl = this.createSvgFromImage(imageUrl, width, height);

		for (const item of this.data.data) {
			const coords = parseCoordinates(item, width, height);

			if (!coords) {
				continue;
			}

			// If more than one coordinate is specified we treat it as
			// a ploygin
			if (coords.length > 1) {
				renderPolygon(coords, svgEl, item);
				// If just one coordinate then treat it as a marker
			} else if (coords.length === 1) {
				const { x, y } = coords[0]!;
				renderMarker(x, y, svgEl, item);
			}
		}
	}
}
