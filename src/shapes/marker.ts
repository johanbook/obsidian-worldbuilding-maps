import { App, BasesEntry, IconName, Notice, setIcon } from "obsidian";

import { getProperty } from "../utils";

const DEFAULT_COLOR = "white";
const DEFAULT_ICON = "lucide-map-pin";

interface RenderMarkerProps {
	x: number;
	y: number;
	svgEl: SVGElement;
	item: BasesEntry;
	app: App;
}

export function renderMarker({
	x,
	y,
	svgEl,
	item,
	app,
}: RenderMarkerProps): void {
	const color = getProperty(item, "color") || DEFAULT_COLOR;
	const icon: IconName = getProperty(item, "icon") || DEFAULT_ICON;

	const marker = svgEl.createSvg("g", {
		attr: {
			transform: `translate(${x} ${y})`,
		},
		cls: "wb-marker",
	});

	marker.addEventListener("click", (event) => {
		event.stopPropagation();
		app.workspace.openLinkText(item.file.path, "", false).catch((error) => {
			new Notice("Failed to open link");
			console.error("Failed to open link", error);
		});
	});

	marker.addEventListener("mouseleave", (event) => {
		const svg = marker.querySelector("svg");

		if (svg) {
			svg.setAttr("stroke", "black");
		}
	});

	marker.addEventListener("mouseenter", (event) => {
		const svg = marker.querySelector("svg");

		if (svg) {
			svg.setAttr("stroke", "white");
		}
	});

	setIcon(marker as unknown as HTMLElement, icon);

	const svg = marker.querySelector("svg");

	if (!svg) {
		return;
	}

	svg.setAttr("stroke", "black");
	svg.setAttr("fill", color);
}
