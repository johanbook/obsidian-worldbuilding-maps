export * from "./zoom-and-pan";

import { BasesEntry, ListValue } from "obsidian";

interface Coordinate {
	x: number;
	y: number;
}

/** Parses coordinates from an Obsidian entry */
export function parseCoordinates(
	item: BasesEntry,
	width: number,
	height: number,
): Coordinate[] | undefined {
	const coords = item.getValue("note.coordinates");

	if (!coords) {
		return;
	}

	if (!(coords instanceof ListValue)) {
		return;
	}

	if (coords.length() % 2 !== 0) {
		console.error(
			`Number of coordinates must be even, got '${coords.length()}'`,
		);
		return;
	}

	try {
		const result: Coordinate[] = [];

		// Parse coordinates in x and y pairs
		for (let index = 0; index < coords.length(); index += 2) {
			const x = Number(coords.get(index)) * width;
			const y = Number(coords.get(index + 1)) * height;

			result.push({ x, y });
		}

		return result;
	} catch (error) {
		console.error("Failed to parse coordinates", error);
	}
	return;
}

/** Get property from note by checking first available value
 * in formula and later one in frontmatter */
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
