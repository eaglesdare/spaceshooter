const keyMap = {
    Space: "space",
    ArrowLeft: "left",
    ArrowRight: "right",
};

export class Controller
{
    constructor()
    {
        // The controller's state.
        this.keys = {
            left: { pressed: false, timestamp: 0 },
            right: { pressed: false, timestamp: 0 },
            space: { pressed: false, timestamp: 0 },
        };

        // Register event listeners for keydown and keyup events.
        window.addEventListener("keydown", (event) => this.keydownHandler(event));
        window.addEventListener("keyup", (event) => this.keyupHandler(event));
    }

    keydownHandler(event)
    {
        const key = keyMap[event.code];
        if (!key) return;

        this.keys[key].pressed = true;
    }

    keyupHandler(event)
    {
        const key = keyMap[event.code];
        if (!key) return;

        const now = Date.now();
        this.keys[key].pressed = false;
        this.keys[key].timestamp = now;
    }
}
