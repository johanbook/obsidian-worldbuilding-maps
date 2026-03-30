import { Plugin, ViewOption } from "obsidian";

import { WorldBuildingMapsBasesView } from "./base";
import { VIEW_TYPE } from "./constants";

const VIEW_OPTIONS: ViewOption[] = [
	{
		type: "file",
		displayName: "Background Image",
		key: "imageUrl",
		default: "",
	},
];

export default class WorldBuildingMapsPlugin extends Plugin {
	async onload() {
		this.registerBasesView(VIEW_TYPE, {
			name: "Worldbuilding Map",
			icon: "lucide-map",
			factory: (controller, containerEl) =>
				new WorldBuildingMapsBasesView(controller, containerEl),
			options: () => VIEW_OPTIONS,
		});

		this.registerHoverLinkSource(VIEW_TYPE, {
			display: "World Building Maps",
			defaultMod: true,
		});
	}
}
