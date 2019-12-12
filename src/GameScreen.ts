/**
 * Base class for all Game Screens.
 */
class GameScreen {

    /**
     * Rerefence to the Game object to where this screen belongs to
     */
    protected readonly game: Game;

    /**
     * Construct a new GameScreen object.
     * 
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        this.game = game;
    }

    /**
     * Let this screen listen to the user input. 
     * 
     * @param input user input to listen to
     */
    public listen(input: UserInput) {

    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new 
     * screen to show.
     * 
     * @param game the game object, conveniently added as a parameter so you 
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {

    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     * 
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {

    }
}