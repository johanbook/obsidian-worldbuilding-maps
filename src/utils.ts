import { BasesEntry } from "obsidian";

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
