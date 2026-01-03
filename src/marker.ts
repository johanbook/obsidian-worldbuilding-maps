import { BasesEntry } from "obsidian";

export function renderMarker(
	x: number,
	y: number,
	svgEl: SVGSVGElement,
	item: BasesEntry,
): void {
	const fillColor = "red";
	const size = "16";

	const circle = svgEl.createSvg("circle", {
		attr: {
			cx: String(x),
			cy: String(y),
			r: size,
			fill: fillColor,
		},
	});

	const titleEl = circle.createSvg("title");
	titleEl.textContent = title;
}
