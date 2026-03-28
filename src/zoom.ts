interface ViewBox {
	x: number;
	y: number;
	h: number;
	w: number;
}

interface SetUpSvgZoomProps {
	svg: SVGSVGElement;
	originalHeight: number;
	originalWidth: number;
}

const ZOOM_FACTOR = 0.05;

// Inspired by https://stackoverflow.com/questions/52576376/how-to-zoom-in-on-a-complex-svg-structure
export const setUpSvgZoom = ({
	svg,
	originalHeight,
	originalWidth,
}: SetUpSvgZoomProps) => {
	let viewBox = {
		x: 0,
		y: 0,
		h: originalHeight,
		w: originalWidth,
	};

	const updateViewBox = (newViewBox: ViewBox) => {
		svg.setAttribute(
			"viewBox",
			`${newViewBox.x} ${newViewBox.y} ${newViewBox.w} ${newViewBox.h}`,
		);
		viewBox = newViewBox;
	};

	svg.addEventListener("wheel", (event) => {
		event.preventDefault();

		// 1. Determine zoom direction and magnitude
		// scroll up (negative deltaY) usually means zoom IN
		const direction = Math.sign(event.deltaY);

		// 2. Calculate proposed new dimensions
		let newW = viewBox.w + viewBox.w * direction * ZOOM_FACTOR;
		let newH = viewBox.h + viewBox.h * direction * ZOOM_FACTOR;

		// 3. ENFORCE LIMIT: Don't zoom out further than original
		if (newW > originalWidth) {
			newW = originalWidth;
		}
		if (newH > originalHeight) {
			newH = originalHeight;
		}

		// Optional: Set a max zoom-in limit so you don't disappear into a pixel
		const minW = originalWidth * 0.05;
		if (newW < minW) {
			newW = viewBox.w; // Stop zooming in if too close
		}
		// 4. Calculate how much the width/height actually changed
		const dw = viewBox.w - newW;
		const dh = viewBox.h - newH;

		// 5. Offset X and Y relative to mouse position
		// We use the ratio of mouse position to current SVG size
		const dx = (dw * event.offsetX) / svg.clientWidth;
		const dy = (dh * event.offsetY) / svg.clientHeight;

		const newViewBox = {
			x: viewBox.x + dx,
			y: viewBox.y + dy,
			w: newW,
			h: newH,
		};

		// 6. Final boundary check for X and Y (Prevents drifting)
		if (newW === originalWidth) {
			newViewBox.x = 0;
			newViewBox.y = 0;
		}

		updateViewBox(newViewBox);
	});
};
