import { Application } from "pixi.js";
import { Controller } from "./Controller";

export class SpaceshooterApp extends Application {
	constructor() {
		super();
		this._controller = new Controller();
		this._scene = null;
		this._currentSceneTicker = null;
	}
	transition(clazz, ...args) {
		if(this._scene) {
			this.ticker.remove(this._currentSceneTicker);
			this.stage.removeChild(this._scene);
			this._scene.destroy();
		}
		this._scene = new clazz(this, this._controller, ...args);
		this._currentSceneTicker = this._scene.ticker.bind(this._scene);
		this.stage.addChild(this._scene);
		this.ticker.add(this._currentSceneTicker);
	}
}
