// tslint:disable member-ordering

class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public readonly input: UserInput;
    public readonly gameTime: GameTime;
    
    public static username: string;

    // Holds the screen that must be displayed each loop
    private currentScreen: GameScreen;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvasWS
        this.ctx = this.canvas.getContext("2d");

        // Instantiate all other attributes
        this.input = new UserInput();
        GameTime.setTime(420);

        // Set the initial screen
        this.currentScreen = new IntroScreen(this);

        GameTime.setTimerPos(true, true);

        this.loop();
    }

    /**
     * Method game loop. This arrow method is called each animation frame
     * that is available after the end of the previous loop.
     */
    private loop = () => {        
        // Let the current screen listen to the user input
        this.currentScreen.listen(this.input);

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Let the current screen draw itself on the rendering context
        this.currentScreen.draw(this.ctx);
 
        // Let the current screen adjust itself
        this.currentScreen.adjust(this);

        // Draw Game Time
        if(!(
            this.currentScreen instanceof EndScoreScreen || 
            this.currentScreen instanceof IntroScreen || 
            this.currentScreen instanceof LostScreen
        )) {
            
            if(GameTime.returnTime() <= 0) {
                this.switchScreen(new LostScreen(this));
            }
            GameTime.drawTimer(this);
        }

        // Request the next animation frame
        requestAnimationFrame(this.loop);
    }

    /**
     * Let the game switch to a new screen.
     * 
     * @param newScreen the screen to switch to
     */
    public switchScreen(newScreen: GameScreen) {
        if (newScreen === null) {
            throw new Error("newScreen cannot be null");
        }
        if (newScreen !== this.currentScreen) {
            this.currentScreen = newScreen;
        }
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const Asteroids = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
