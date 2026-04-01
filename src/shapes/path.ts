import { App, BasesEntry, Notice } from "obsidian";

import { Config } from "../config";
import { VIEW_TYPE } from "../constants";
import { getProperty } from "../utils";

const DEFAULT_COLOR = "rgba(200,200,200,0.85)";
const FILL_OPACITY_HIGHLIGHTED = 0.2;

interface RenderPathProps {
	app: App;
	config: Config;
	path: string;
	svgEl: SVGElement;
	item: BasesEntry;
}

/** Renders a SVG path */
export function renderPath({
	app,
	config,
	path,
	svgEl,
	item,
}: RenderPathProps): void {
	const color = getProperty(item, "color") || DEFAULT_COLOR;

	const pathEl = svgEl.createSvg("path", {
		attr: {
			d: path,
		},
		cls: "wb-marker",
	});

	pathEl.addEventListener("click", (event) => {
		event.stopPropagation();
		app.workspace.openLinkText(item.file.path, "", false).catch((error) => {
			new Notice("Failed to open link");
			console.error("Failed to open link", error);
		});
	});

	// Add hover effect
	pathEl.addEventListener("mouseenter", (event) => {
		pathEl.setAttr(
			"fill-opacity",
			config.regions.fillOpacity + FILL_OPACITY_HIGHLIGHTED,
		);

		app.workspace.trigger("hover-link", {
			event,
			source: VIEW_TYPE,
			hoverParent: pathEl,
			targetEl: pathEl,
			linktext: item.file.path,
			sourcePath: item.file.path,
		});
	});

	// Remove hover effect
	pathEl.addEventListener("mouseleave", (event) => {
		pathEl.setAttr("fill-opacity", config.regions.fillOpacity);
	});

	pathEl.setAttr("fill-opacity", config.regions.fillOpacity);
	pathEl.setAttr("fill", color);

	if (config.regions.showBorders) {
		pathEl.setAttr("stroke", color);
	}
}
