import { App, BasesEntry, Notice } from "obsidian";

import { VIEW_TYPE } from "../constants";
import { getProperty } from "../utils";

const DEFAULT_COLOR = "rgba(200,200,200,0.85)";
const FILL_OPACITY = 0.1;
const FILL_OPACITY_HIGHLIGHTED = 0.3;

interface RenderPathProps {
	app: App;
	path: string;
	svgEl: SVGElement;
	item: BasesEntry;
}

/** Renders a SVG polygon */
export function renderPath({ app, path, svgEl, item }: RenderPathProps): void {
	const color = getProperty(item, "color") || DEFAULT_COLOR;

	const marker = svgEl.createSvg("path", {
		attr: {
			d: path,
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

	// Add hover effect
	marker.addEventListener("mouseenter", (event) => {
		marker.setAttr("fill-opacity", FILL_OPACITY_HIGHLIGHTED);

		app.workspace.trigger("hover-link", {
			event,
			source: VIEW_TYPE,
			hoverParent: marker,
			targetEl: marker,
			linktext: item.file.path,
			sourcePath: item.file.path,
		});
	});

	// Remove hover effect
	marker.addEventListener("mouseleave", (event) => {
		marker.setAttr("fill-opacity", FILL_OPACITY);
	});

	marker.setAttr("fill-opacity", FILL_OPACITY);
	marker.setAttr("fill", color);
}
