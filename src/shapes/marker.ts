import { App, BasesEntry, IconName, Notice, setIcon } from "obsidian";

import { VIEW_TYPE } from "../constants";
import type { Coordinates } from "../types";
import { getProperty } from "../utils";

const DEFAULT_COLOR = "rgba(200,200,200,0.85)";
const DEFAULT_ICON = "lucide-map-pin";

interface RenderMarkerProps {
	coordinates: Coordinates;
	svgEl: SVGElement;
	item: BasesEntry;
	app: App;
}

export function renderMarker({
	coordinates,
	svgEl,
	item,
	app,
}: RenderMarkerProps): void {
	const color = getProperty(item, "color") || DEFAULT_COLOR;
	const icon: IconName = getProperty(item, "icon") || DEFAULT_ICON;

	const marker = svgEl.createSvg("g", {
		attr: {
			transform: `translate(${coordinates.x} ${coordinates.y})`,
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

		if (!svg) {
			return;
		}

		svg.setAttr("stroke", "white");

		app.workspace.trigger("hover-link", {
			event,
			source: VIEW_TYPE,
			hoverParent: marker,
			targetEl: marker,
			linktext: item.file.path,
			sourcePath: item.file.path,
		});
	});

	setIcon(marker as unknown as HTMLElement, icon);

	const svg = marker.querySelector("svg");

	if (!svg) {
		return;
	}

	svg.setAttr("stroke", "black");
	svg.setAttr("fill", color);
}
