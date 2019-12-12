/**
 * Class that holds the state of all the user inputs like keyboard and mouse.
 */
class UserInput {
    
    // Fields that hold the state of the mouse
    private position : Pos;
    private buttonDown : boolean = false;

    // Array that holds the state of all keys
    private keyCodeStates : boolean[] = new Array<boolean>();

    /**
     * Constructs a new KeyListener.
     */
    constructor() {
        // Register the arrow methods as listeners to keyevents
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
    }

    /**
     * Returns `true` if and only if the last known state of the keyboard
     * reflects that the specified key is currently pressed.
     * 
     * @param {number} keyCode the keyCode to check
     * @returns {boolean} `true` when the specified key is currently down
     */
    public GetMousePressed(): Pos
    {
        return this.buttonDown ? this.position : null;
    }

    // TODO add methods that expose the mouse state to the game
    
    //----------------- Event Handler (Arrow) methods -------------------------

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseDown = (ev: MouseEvent) => {
        this.buttonDown = true;
    }

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseUp = (ev: MouseEvent) => {
        this.buttonDown = false;
    }

    /*
     * Arrow method that catches keydown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseMove = (ev: MouseEvent) => {
       	this.position = { xPos: ev.clientX, yPos: ev.clientY };
    }

}