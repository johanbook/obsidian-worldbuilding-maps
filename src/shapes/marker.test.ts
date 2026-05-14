import { describe, it, expect, vi } from "vitest";
import { renderMarker } from "./marker";

vi.mock("obsidian", () => ({}));

describe(renderMarker.name, () => {
	it("works", () => {
		renderMarker({
			app: vi.fn(),
			x: 0,
			y: 0,
			item: vi.fn(),
			svgEl: new SVGElement(),
		});
	});
});
