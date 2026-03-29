import { App, BasesEntry, Notice, setIcon } from "obsidian";

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
			return "lucide-map-pin";
	}
}

export function renderMarker(
	x: number,
	y: number,
	svgEl: SVGElement,
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
