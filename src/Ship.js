import { Sprite, Texture } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";

export class Ship extends Sprite {
	constructor() {
		super();
		this.texture = Texture.from("ship");
		this.anchor.set(0.5);
		this.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT * 3 / 4)
	}
}
