import { BasesEntry, ListValue } from "obsidian";

export function getCoordinates(
	item: BasesEntry,
	width: number,
	height: number,
): [number, number] | undefined {
	const coords = item.getValue("note.coordinates");

	if (!coords) {
		return;
	}

	try {
		if (coords instanceof ListValue) {
			const x = Number(coords.get(0)) * width;
			const y = Number(coords.get(1)) * height;
			return [x, y];
		}
	} catch (error) {
		console.error("Failed to parse coordinates", error);
	}
	return;
}

// Get property from note by checking first available value in formula
// and later one in frontmatter
export function getProperty(item: BasesEntry, property: string): string {
	const propertyFromFormula = item
		.getValue(`formula.${property}`)
		?.toString();

	if (propertyFromFormula && propertyFromFormula !== "null") {
		return propertyFromFormula;
	}

	const propertyFromNote = item.getValue(`note.${property}`)?.toString();

	if (propertyFromNote && propertyFromNote !== "null") {
		return propertyFromNote;
	}

	return "";
}
