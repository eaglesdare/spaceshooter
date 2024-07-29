import { Text } from "pixi.js";
import { Scene } from "./Scene";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { createBackground } from "../creteBackground";
import { PlayScene } from "./PlayScene";

export class WelcomeScene extends Scene {
	constructor(app, controller) {
		super();

		this._app = app;
		this._controller = controller;

		this.addChild(createBackground());

		const welcomeText = new Text({
			text: "SPACE SHOOTER\nPress SPACE to start",
			style: {
				fontSize: 48,
				fontFamily: "Arial",
				fontStyle: "italic",
				align: "center",
				fill: 0xFAFAFA,
				padding: 5,
			},
		});
		welcomeText.anchor.set(0.5);
		welcomeText.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

		this.addChild(welcomeText);
	}

	_ticker(ticker) {
		if(this._controller.keys.space.pressed) {
			this._app.transition(PlayScene);
		}
	}

	destroy(opts) {
		super.destroy({ ...opts, children: true });
		this._controller = null;
	}
}
