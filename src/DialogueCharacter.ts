class dialogueCharacter {

    private xPos: number = -20;
    private dialogue: Array<string> = [];
    private dialogueCharacterImage: HTMLImageElement;

    constructor() {
        let character = new Image();
        character.src = "./assets/images/popupCharacter.png"; // orignele Image
        this.dialogueCharacterImage = character;
    }

    /**
     * this functions draws the dialoge character
     * @param ctx canvas rendering object
     */
    public drawCharacter(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.textAlign = "left";
        ctx.font = "18px Arial";
        ctx.fillStyle = 'black';

        ctx.drawImage(
            this.dialogueCharacterImage, 
            canvas.width - 400 - this.xPos, 
            canvas.height - 300,
            400,
            300
        );
        ctx.fillText(
            this.dialogue[0], 
            canvas.width -380 - this.xPos, 
            canvas.height -260
        ); 

    }

    /**
     * Shows character when dialoge is available
     */
    private showCharacter() {
        this.xPos = -400;

        const animation: number = setInterval(() => {
            console.log(this.dialogue);

            if(this.xPos >= 0)
                clearInterval(animation);
            
            this.xPos += 16;

        }, 10);
    }

    /**
     * Hides character when there is no dialoge left
     */
    private hideCharacter() {
        this.xPos = 0;

        const animation: number = setInterval(() => {
            console.log(this.dialogue);

            if(this.xPos <= -400)
                clearInterval(animation);
            
            this.xPos += -16;

        }, 10);
    }

    /**
     * this functions adds dialoge to the character
     * @param dialoge array of separete messages
     */
    public createDialogue(dialoge: Array<string>) {
        if(this.dialogue.length == 0) {
            this.dialogue = dialoge;
            this.showCharacter();
        }

        this.dialogue.concat(dialoge);
    }

    /**
     * Go's to next dialoge
     */
    public nextDialogueHandler(input: UserInput) {
        const isPressed = input.GetMousePressed();

        if(isPressed) {
            if(this.dialogue.length == 1)
                this.hideCharacter();
            
            if(this.dialogue.length >= 1)
                this.dialogue.shift();
        }
    }

}