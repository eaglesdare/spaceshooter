import { Text } from "pixi.js";
import { Scene } from "./Scene";
import { createBackground } from "../creteBackground";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { PlayScene } from "./PlayScene";

export class GameOverScene extends Scene {
	constructor(app, controller, flavor) {
		super();

		this._app = app;
		this._controller = controller;

		this.addChild(createBackground());

		const text = flavor === "win" ? "YOU WIN!" : "YOU LOSE!";

		const gameOverText = new Text({
			text: `${text}\nPress SPACE to restart`,
			style: {
				fontSize: 48,
				fontFamily: "Arial",
				fontStyle: "italic",
				align: "center",
				fill: 0xFAFAFA,
				padding: 5,
			},
		});
		gameOverText.anchor.set(0.5);
		gameOverText.position.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

		this.addChild(gameOverText);
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
