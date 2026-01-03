import { App, BasesEntry, setIcon } from "obsidian";

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
			return "lucide-shield";
	}
}

function getColor(item: BasesEntry): string {
	const colorFromFormula = item.getValue("formula.color")?.toString();

	if (colorFromFormula && colorFromFormula !== "null") {
		return colorFromFormula;
	}

	const colorFromNote = item.getValue("note.color")?.toString();

	if (colorFromNote && colorFromNote !== "null") {
		return colorFromNote;
	}

	return "";
}

export function renderMarker(
	x: number,
	y: number,
	svgEl: SVGSVGElement,
	item: BasesEntry,
	app: App,
): void {
	const type = item.getValue("note.type")!.toString();

	const marker = svgEl.createSvg("g", {
		attr: {
			transform: `translate(${x} ${y})`,
		},
		cls: "wb-marker",
	});

	const iconName = getIconName(type);

	// @ts-expect-error // TODO: Fix type error
	setIcon(marker, iconName);

	const svg = marker.querySelector("svg");

	if (!svg) {
		return;
	}

	svg.setAttr("stroke", "black");

	const color = getColor(item);

	if (color) {
		svg.setAttr("fill", color);
	}
}
