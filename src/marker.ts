import { App, BasesEntry, Notice, setIcon } from "obsidian";

import { getProperty } from "./utils";

// Possible other icons
// City - lucide-castle
// Country - lucide-shield
// Fortress lucide-chess-rook
// Fortest - lucide-trees
function getIconName(type: string): string {
	switch (type) {
		case "Country":
			return "lucide-shield";
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
	const color = getProperty(item, "color");
	const icon = getProperty(item, "icon");
	const type = getProperty(item, "type");

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

	const iconName = icon ?? getIconName(type);

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
