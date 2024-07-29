import { Container } from "pixi.js";
export class Scene extends Container {
	get ticker() {
		return this._ticker;
	}
	constructor() {
		super();
	}
	_ticker(ticker) {
		throw new Error("ticker() method must be implemented.");
	}
}
