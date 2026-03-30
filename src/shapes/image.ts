interface RenderImageProps {
	imageUrl: string;
	svgEl: SVGElement;
	width: number;
	height: number;
}

/** Renders an image onto a SVG element */
export function renderImage({
	imageUrl,
	svgEl,
	width,
	height,
}: RenderImageProps): void {
	svgEl.createSvg("image", {
		attr: {
			href: imageUrl,
			x: "0",
			y: "0",
			width: String(width),
			height: String(height),
		},
	});
}
