import { BasesView, ListValue, QueryController } from "obsidian";

export const VIEW_TYPE = "worldbuilding-map-view";

export class WorldBuildingMapsBasesView extends BasesView {
	readonly type = VIEW_TYPE;
	private containerEl: HTMLElement;

	constructor(controller: QueryController, parentEl: HTMLElement) {
		super(controller);
		this.containerEl = parentEl.createDiv(`${VIEW_TYPE}-container`);
	}

	private getImage(path: string) {
		const file = this.app.vault.getFileByPath(path);

		if (!file) {
			return null;
		}

		return this.app.vault.getResourcePath(file);
	}

	private createSvgFromImage(imageUrl: string) {
		const svgEl = this.containerEl.createSvg("svg", {
			attr: {
				viewBox: "0 0 1000 1000",
				preserveAspectRatio: "xMidYMid meet",
			},
		});
		svgEl.setCssStyles({ width: "100%", height: "100%" });

		svgEl.createSvg("image", {
			attr: {
				href: imageUrl,
				x: "0",
				y: "0",
				width: "1000",
				height: "1000",
			},
		});

		return svgEl;
	}

	public onDataUpdated(): void {
		this.containerEl.empty();

		const imageUrl = String(this.config.get("imageUrl"));

		if (!imageUrl) {
			this.containerEl.createDiv({ text: `Missing image url` });
			return;
		}

		const resolvedImageUrl = this.getImage(imageUrl);

		if (!resolvedImageUrl) {
			this.containerEl.createDiv({
				text: `Cannot find image at url '${imageUrl}'`,
			});
			return;
		}

		const svgEl = this.createSvgFromImage(resolvedImageUrl);

		for (const item of this.data.data) {
			// @ts-expect-error // TODO: Look into this. Works for now
			const coords = item.getValue("coordinates");

			if (!coords) {
				continue;
			}

			try {
				if (coords instanceof ListValue) {
					const x = Number(coords.get(0));
					const y = Number(coords.get(1));
					this.renderMarker(x, y, item, svgEl);
				}
			} catch (error) {
				console.error("Failed to parse coordinates", error);
			}
		}
	}

	private renderMarker(
		x: number,
		y: number,
		item: any,
		svgEl: SVGSVGElement,
	): void {
		const circle = svgEl.createSvg("circle", {
			attr: {
				cx: String(x),
				cy: String(y),
				r: "8",
				fill: "red",
			},
		});

		const title = circle.createSvg("title");
		title.textContent = item.getValue("file.name") ?? "Unknown";
	}
}
