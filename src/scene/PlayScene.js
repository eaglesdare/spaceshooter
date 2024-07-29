import { Text, Sprite, Graphics } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { createBackground } from "../creteBackground";
import { Ship } from "../Ship";
import { Scene } from "./Scene";
import { GameOverScene } from "./GameOverScene";

export class PlayScene extends Scene {
	constructor(app, controller) {
		super();

		this._app = app;
		this._controller = controller;

		const textStyle = {
			fontSize: 32,
			fontFamily: "Arial",
			fontStyle: "italic",
			align: "center",
			fill: 0xFAFAFA,
			padding: 5,
		};

		this._bg = createBackground();
		this.addChild(this._bg);

		this._bulletsText = new Text({
			text: "0",
			style: textStyle,
		});
		this._bulletsText.anchor.set(0.5);
		this._bulletsText.position.set(SCREEN_WIDTH * 1 / 10, SCREEN_HEIGHT * 1 / 10);

		this.addChild(this._bulletsText);

		this._timeText = new Text({
			text: "0.0",
			style: textStyle,
		});
		this._timeText.anchor.set(0.5);
		this._timeText.position.set(SCREEN_WIDTH * 9 / 10, SCREEN_HEIGHT * 1 / 10);

		this.addChild(this._timeText);

		this._ship = new Ship();
		this.addChild(this._ship);

		this._state = {
			asteroids: this._generateAsteroids(),
			bullets: 10,
			timeleft: 60000,
			liveBullets: [],
			lastBulletTime: Date.now(),
		};

		this._prepareBulletGraphics();
	}

	_prepareBulletGraphics() {
		const bullet = new Graphics();
		bullet.beginPath();
		bullet.arc(0, 0, 8, 0, Math.PI * 2);
		bullet.closePath();
		bullet.fill(0xFF0000);

		bullet.beginPath();
		bullet.arc(0, 0, 5, 0, Math.PI * 2);
		bullet.closePath();
		bullet.fill(0xFAFAFA);

		this._bulletGraphics = bullet;
	}

	_generateAsteroids() {
		const roids = [];
		for(let i = 0; i < 9; i++) {
			const asteroid = Sprite.from("asteroid");
			asteroid.anchor.set(0.5);
			asteroid.scale.set(0.3 + Math.random() * 0.2);
			asteroid.rotation = -Math.PI / 4 + Math.random() * Math.PI / 2;
			asteroid.position.set(SCREEN_WIDTH * (i + 1) / 10 + (-10 + Math.random() * 20), 128 + Math.random() * (SCREEN_HEIGHT * 3 / 5 - 128));
			this.addChild(asteroid);
			roids.push(asteroid);
		}
		return roids;
	}

	_createBullet() {
		if(this._state.bullets <= 0) {
			return;
		}
		const bullet = new Graphics(this._bulletGraphics.context);
		bullet.position.set(this._ship.x, this._ship.y - this._ship.height / 2);
		this.addChild(bullet);
		this._state.liveBullets.push(bullet);
		this._state.bullets -= 1;
	}

	_ticker(ticker) {
		const speed = 2;

		let transit = null;

		if(this._controller.keys.left.pressed) {
			this._ship.x = Math.max(this._ship.width / 2, this._ship.x - speed * ticker.deltaTime);
		}
		if(this._controller.keys.right.pressed) {
			this._ship.x = Math.min(SCREEN_WIDTH - this._ship.width / 2, this._ship.x + speed * ticker.deltaTime);
		}
		const spaceJustPressed = this._controller.keys.space.pressed && this._controller.keys.space.timestamp > this._state.lastBulletTime + 250;
		if(spaceJustPressed) {
			this._state.lastBulletTime = this._controller.keys.space.timestamp;
			this._createBullet();
		}
		this._bg.tilePosition.x = -this._ship.x * 0.4;
		this._bg.tilePosition.y += 0.7 * ticker.deltaTime;

		this._state.timeleft -= ticker.deltaMS;

		if(this._state.asteroids.length == 0) {
			transit = 'win';
		}

		if(this._state.timeleft <= 0) {
			if(!transit)
				transit = 'lose';
		}

		if(this._state.bullets <= 0 && this._state.liveBullets.length == 0) {
			if(!transit)
				transit = 'lose';
		}

		this._state.liveBullets.forEach((bullet, i) => {
			bullet.y -= 1.2 * ticker.deltaTime;
			if(bullet.y < -bullet.height / 2) {
				this.removeChild(bullet);
				this._state.liveBullets.splice(i, 1);
			}
			this._state.asteroids.forEach((asteroid, j) => {
				console.log(asteroid.width, asteroid.height)
				if(Math.sqrt((bullet.x - asteroid.x) ** 2 + (bullet.y - asteroid.y) ** 2) < Math.max(asteroid.width, asteroid.height) / 2) {
					this.removeChild(bullet);
					this._state.liveBullets.splice(i, 1);
					this.removeChild(asteroid);
					this._state.asteroids.splice(j, 1);
				}
			});
		});


		this._bulletsText.text = this._state.bullets.toString();
		const time = this._state.timeleft / 1000;
		this._timeText.text = `${time > 10 ? time.toFixed(0) : time.toFixed(1)} `;

		if(transit)
			this._app.transition(GameOverScene, transit);
	}

	destroy(opts) {
		super.destroy({ ...opts, children: true });
		this._bulletGraphics.destroy();
		this._bulletsText = null;
		this._timeText = null;
		this._state = null;
	}
}
