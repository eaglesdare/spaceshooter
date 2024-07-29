import { TilingSprite } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";

export function createBackground() {
	const bg = TilingSprite.from("space");
	bg.width = SCREEN_WIDTH;
	bg.height = SCREEN_HEIGHT;
	return bg;
}
