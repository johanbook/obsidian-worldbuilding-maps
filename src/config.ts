import { BasesViewConfig, ViewOption } from "obsidian";

export const VIEW_OPTIONS: ViewOption[] = [
	{
		type: "file",
		displayName: "Background Image",
		key: "imageUrl",
		default: "",
	},
	{
		type: "toggle",
		displayName: "Enable zoom and pan",
		key: "zoomAndPan",
		default: true,
	},
	{
		type: "group",
		displayName: "Regions",
		items: [
			{
				type: "toggle",
				displayName: "Show borders",
				key: "regionShowBorders",
				default: false,
			},
			{
				type: "slider",
				displayName: "Fill opacity",
				key: "regionFillOpacity",
				default: 0.1,
			},
		],
	},
];

export interface Config {
	enableZoomAndPan: boolean;

	imageUrl: string;

	regions: {
		fillOpacity: number;
		showBorders: boolean;
	};
}

export const parseConfig = (config: BasesViewConfig): Config => {
	return {
		enableZoomAndPan: Boolean(config.get("zoomAndPan")),

		imageUrl: String(config.get("imageUrl")),

		regions: {
			fillOpacity: Number(config.get("regionFillOpacity")),
			showBorders: Boolean(config.get("regionShowBorders")),
		},
	};
};
