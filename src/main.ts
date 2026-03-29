import { Plugin } from "obsidian";

import { WorldBuildingMapsBasesView } from "./base";
import { VIEW_TYPE } from "./constants";

export default class WorldBuildingMapsPlugin extends Plugin {
	async onload() {
		this.registerBasesView(VIEW_TYPE, {
			name: "Map",
			icon: "lucide-map",
			factory: (controller, containerEl) =>
				new WorldBuildingMapsBasesView(controller, containerEl),
			options: () => [
				{
					type: "text",
					displayName: "Image URL",
					key: "imageUrl",
					default: "",
				},
			],
		});

		this.registerHoverLinkSource(VIEW_TYPE, {
			display: "World Building Maps",
			defaultMod: true,
		});
	}
}
