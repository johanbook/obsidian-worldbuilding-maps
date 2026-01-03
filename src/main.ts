import { Plugin } from "obsidian";

import { WorldBuildingMapsBasesView, VIEW_TYPE } from "./base";

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
	}
}
