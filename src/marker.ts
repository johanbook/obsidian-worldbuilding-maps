import { BasesEntry } from "obsidian";

const fillColor = "red";
const size = "8";
const strokeWidth = "2";

export function renderMarker(
	x: number,
	y: number,
	svgEl: SVGSVGElement,
	item: BasesEntry,
): void {
	svgEl.createSvg("circle", {
		attr: {
			cx: String(x),
			cy: String(y),
			r: size,
			fill: fillColor,
			stroke: "black",
			"stroke-width": strokeWidth,
		},
		cls: "wb-marker",
	});

	const title = item.getValue("file.name");

	if (title) {
		const titleEl = svgEl.createSvg("text", {
			attr: {
				x: String(x),
				y: String(y) + 30,
				fill: "black",
			},
			cls: "wb-marker-text",
		});
		titleEl.textContent = title.toString();
	}
}
