import { BasesView, Notice, QueryController } from "obsidian";

import { renderImage, renderMarker, renderPath } from "./shapes";
import { getProperty, parseCoordinates, setUpSvgZoomAndPan } from "./utils";
import { VIEW_TYPE } from "./constants";

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

	private createSvgContainer(width: number, height: number) {
		const svgEl = this.containerEl.createSvg("svg", {
			attr: {
				viewBox: `0 0 ${width} ${height}`,
				preserveAspectRatio: "xMidYMid meet",
			},
		});
		svgEl.setCssStyles({ width: "100%", height: "100%" });

		const container = svgEl.createSvg("g");

		setUpSvgZoomAndPan({
			contentGroup: container,
			svgElement: svgEl,
			originalHeight: height,
			originalWidth: width,
		});

		return container;
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
			this.render(imageUrl, image.naturalWidth, image.naturalHeight);
		image.onerror = (error) => {
			new Notice("Failed to resolve map dimensions");
			console.error("Failed to resolve map dimensions", error);
		};

		image.src = imageUrl;
	}

	private render(imageUrl: string, width: number, height: number) {
		const svgEl = this.createSvgContainer(width, height);

		// Render background image
		renderImage({
			svgEl,
			imageUrl,
			width,
			height,
		});

		// Render shapes from items in base
		for (const item of this.data.data) {
			const region = getProperty(item, "region");
			if (region) {
				renderPath({ app: this.app, path: region, svgEl, item });
				continue;
			}

			const coordinates = parseCoordinates(item);
			if (coordinates) {
				renderMarker({ coordinates, svgEl, item, app: this.app });
			}
		}
	}
}
