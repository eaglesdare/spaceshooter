import { Assets } from "pixi.js";

import shipAsset from "./assets/ship.png";
import spaceAsset from "./assets/space.png";
import asteroidAsset from "./assets/asteroid.png";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";
import { SpaceshooterApp } from "./SpaceshooterApp";
import { WelcomeScene } from "./scene/WelcomeScene";


(async () => {
	const app = new SpaceshooterApp();

	await app.init({
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		antialias: false,
		resolution: 1,
	});
	document.body.appendChild(app.canvas);

	const assets = [
		{ alias: "ship", src: shipAsset, },
		{ alias: "space", src: spaceAsset, },
		{ alias: "asteroid", src: asteroidAsset, },
	];
	await Assets.load(assets);

	app.transition(WelcomeScene);
})();

