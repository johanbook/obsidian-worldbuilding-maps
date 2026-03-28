import { BasesEntry } from "obsidian";

import { getProperty } from "./utils";

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
		marker.setAttr("fill-opacity", "0.1");
	});

	marker.addEventListener("mouseenter", (event) => {
		marker.setAttr("stroke", "white");
		marker.setAttr("fill-opacity", "0.2");
	});

	if (color) {
		marker.setAttr("stroke", "black");
		marker.setAttr("fill", color);
		marker.setAttr("fill-opacity", "0.1");
	}
}
