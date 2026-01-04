import { App, BasesEntry, setIcon } from "obsidian";

import { getProperty } from "./utils";

function getIconName(type: string): string {
	switch (type) {
		case "City":
			return "lucide-castle";
		case "Country":
			return "lucide-shield";
		case "Forest":
			return "lucide-trees";
		case "Fortress":
			return "lucide-chess-rook";
		default:
			return "lucide-shield";
	}
}

export function renderMarker(
	x: number,
	y: number,
	svgEl: SVGSVGElement,
	item: BasesEntry,
	app: App,
): void {
	const type = getProperty(item, "type");
	const color = getProperty(item, "color");

	const marker = svgEl.createSvg("g", {
		attr: {
			transform: `translate(${x} ${y})`,
		},
		cls: "wb-marker",
	});

	const iconName = getIconName(type);

	// @ts-expect-error // TODO: Fix type error
	setIcon(marker, iconName);

	const svg = marker.querySelector("svg");

	if (!svg) {
		return;
	}

	svg.setAttr("stroke", "black");

	if (color) {
		svg.setAttr("fill", color);
	}
}
