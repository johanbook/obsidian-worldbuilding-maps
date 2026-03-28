import { BasesEntry } from "obsidian";

import { getProperty } from "./utils";

const FILL_OPACITY = 0.1;
const FILL_OPACITY_HIGHLIGHTED = 0.2;

type Coordinates = { x: number; y: number }[];

export function renderPolygon(
	points: Coordinates,
	svgEl: SVGSVGElement,
	item: BasesEntry,
): void {
	const color = getProperty(item, "color");

	const pointString = points.map(({ x, y }) => `${x},${y}`).join(" ");

	const marker = svgEl.createSvg("polygon", {
		attr: {
			points: pointString,
		},
		cls: "wb-marker",
	});

	marker.addEventListener("mouseleave", (event) => {
		marker.setAttr("stroke", "black");
		marker.setAttr("fill-opacity", FILL_OPACITY);
	});

	marker.addEventListener("mouseenter", (event) => {
		marker.setAttr("stroke", "white");
		marker.setAttr("fill-opacity", FILL_OPACITY_HIGHLIGHTED);
	});

	marker.setAttr("stroke", "black");
	marker.setAttr("fill-opacity", FILL_OPACITY);

	if (color) {
		marker.setAttr("fill", color);
	}
}
