/**
 * Class that holds the state of all the user inputs like keyboard and mouse.
 */
class UserInput {
    
    // Fields that hold the state of the mouse
    private position : Pos;
    private holdButton: boolean = false;
    private buttonDown : boolean = false;

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
        if(!this.holdButton) {
            this.holdButton = true;
            return this.mouseUp ? this.position : null;
        } else {
            return null;
        }
    }

    /**
     * Event handler for mouse down
     */
    private mouseDown = (ev: MouseEvent) => {
        this.buttonDown = true;
    }

    /**
     * Event handler for mouse up
     */
    private mouseUp = (ev: MouseEvent) => {
        this.buttonDown = false;
        this.holdButton = false;
    }

    /**
     * Event handler for mouse movement
     */
    private mouseMove = (ev: MouseEvent) => {
       	this.position = { xPos: ev.clientX, yPos: ev.clientY };
    }

}