class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.currentScreen.listen(this.input);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw(this.ctx);
            this.currentScreen.adjust(this);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.input = new UserInput();
        this.scores = new Scores();
        this.currentScreen = new IntroScreen(this);
        this.loop();
    }
    switchScreen(newScreen) {
        if (newScreen == null) {
            throw new Error("newScreen cannot be null");
        }
        if (newScreen != this.currentScreen) {
            this.currentScreen = newScreen;
        }
    }
}
let init = () => {
    const Asteroids = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameScreen {
    constructor(game) {
        this.game = game;
    }
    listen(input) {
    }
    adjust(game) {
    }
    draw(ctx) {
    }
}
class GameTime {
}
class Scores {
    constructor() {
        Scores.highscores = null;
    }
    addScore(highscore) {
        Scores.highscores.push(highscore);
    }
}
class UserInput {
    constructor() {
        this.buttonDown = false;
        this.keyCodeStates = new Array();
        this.mouseDown = (ev) => {
            this.buttonDown = true;
        };
        this.mouseUp = (ev) => {
            this.buttonDown = false;
        };
        this.mouseMove = (ev) => {
            this.position = { xPos: ev.clientX, yPos: ev.clientY };
        };
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
    }
    GetMousePressed() {
        return this.buttonDown ? this.position : null;
    }
}
class DeepFakeScreen extends GameScreen {
    constructor(game) {
        super(game);
    }
    Draw(ctx) { }
    listen(input) { }
}
class FakeProfileScreen extends GameScreen {
    constructor(game) {
        super(game);
    }
    draw(ctx) {
    }
}
class IntroScreen extends GameScreen {
    constructor(game) {
        super(game);
    }
    draw(ctx) {
    }
}
//# sourceMappingURL=app.js.map