import { BasesEntry } from "obsidian";

import { Coordinate } from "../types";
import { getProperty } from "../utils";

const FILL_OPACITY = 0.1;
const FILL_OPACITY_HIGHLIGHTED = 0.3;

interface RenderPolygonProps {
	coordinates: Coordinate[];
	svgEl: SVGElement;
	item: BasesEntry;
}

/** Renders a SVG polygon */
export function renderPolygon({
	coordinates,
	svgEl,
	item,
}: RenderPolygonProps): void {
	const color = getProperty(item, "color");

	const marker = svgEl.createSvg("polygon", {
		attr: {
			// Expected format is `x1,y1 x2,y2`
			points: coordinates.map(({ x, y }) => `${x},${y}`).join(" "),
		},
		cls: "wb-marker",
	});

	marker.addEventListener("mouseleave", (event) => {
		marker.setAttr("fill-opacity", FILL_OPACITY);
	});

	marker.addEventListener("mouseenter", (event) => {
		marker.setAttr("fill-opacity", FILL_OPACITY_HIGHLIGHTED);
	});

	marker.setAttr("stroke", "black");
	marker.setAttr("fill-opacity", FILL_OPACITY);

	if (color) {
		marker.setAttr("fill", color);
	}
}
