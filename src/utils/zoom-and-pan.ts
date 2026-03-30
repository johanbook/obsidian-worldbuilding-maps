import { select } from "d3-selection";
import { zoom, ZoomBehavior, D3ZoomEvent } from "d3-zoom";

const MAX_ZOOM = 5;

interface SetUpSvgZoomAndPanProps {
	contentGroup: SVGGElement;
	originalHeight: number;
	originalWidth: number;
	svgElement: SVGSVGElement;
}

/** Configures zoom handlers for svg */
export const setUpSvgZoomAndPan = ({
	contentGroup,
	originalHeight,
	originalWidth,
	svgElement,
}: SetUpSvgZoomAndPanProps) => {
	const svg = select(svgElement);
	const container = select(contentGroup);

	const zoomBehavior: ZoomBehavior<SVGSVGElement, unknown> = zoom<
		SVGSVGElement,
		unknown
	>()
		.scaleExtent([1, MAX_ZOOM])
		.translateExtent([
			[0, 0],
			[originalWidth, originalHeight],
		])
		.extent([
			[0, 0],
			[originalWidth, originalHeight],
		])
		.on("zoom", (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
			// Apply the transform (translate + scale) to the <g> element
			container.attr("transform", event.transform.toString());
		});

	svg.call(zoomBehavior);
};
