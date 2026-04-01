import { BasesEntry, ListValue } from "obsidian";

import type { Coordinates } from "../types";

export * from "./zoom-and-pan";

/** Parses coordinates from an Obsidian entry */
export function parseCoordinates(item: BasesEntry): Coordinates | undefined {
	const coords = item.getValue("note.coordinates");

	if (!coords) {
		return;
	}

	if (!(coords instanceof ListValue)) {
		console.error(
			`Note '${item.file.path}' has coordinates but they are not formatted as a list. Fix the type to make them render in the map view.`,
		);
		return;
	}

	if (coords.length() !== 2) {
		console.error(
			`Number of coordinates must be 2, got ${coords.length()} in '${item.file.path}'`,
		);
		return;
	}

	try {
		const x = Number(coords.get(0));
		const y = Number(coords.get(1));

		if (Number.isNaN(x) || Number.isNaN(y)) {
			throw new Error(
				`Invalid numeric values: ${String(coords.get(0))}, ${String(coords.get(1))}`,
			);
		}

		return { x, y };
	} catch (error) {
		console.error(
			`Failed to parse coordinates in note '${item.file.path}'`,
			error,
		);
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
