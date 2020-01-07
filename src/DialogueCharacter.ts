class DialogueCharacter {

    private xPos: number = -0;
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
            canvas.width/4.5 - this.xPos , 
            canvas.height/9,
            800,
            800
        );
        
        if(this.dialogue[0] !== undefined) {
            this.dialogue[0].split("\n").forEach((msg, index)=> {
                ctx.fillText(
                   msg, 
                   canvas.width/4.4- this.xPos, 
                   canvas.height/6 + (index * 20)
               );
            })
        }

    }

    /**
     * Shows character when dialoge is available
     */
    private showCharacter() {
        console.log('show character');
        GameTime.stopTimer();
        this.xPos = -2000;

        const animation: number = setInterval(() => {
            if(this.xPos >= 0) {
                console.log('done with showing');
                clearInterval(animation);
            }
            
            this.xPos += 64;

        }, 5);
    }

    /**
     * Hides character when there is no dialoge left
     */
    private hideCharacter() {
        console.log('hide character');
        GameTime.startTimer();
        this.xPos = 0;

        const animation: number = setInterval(() => {
            if(this.xPos <= -2000) {
                console.log('done with hiding');
                clearInterval(animation);
            }
            
            this.xPos += -64;

        }, 5);
    }

    /**
     * this functions adds dialoge to the character
     * @param dialogue array of separete messages
     */
    public createDialogue(dialogue: Array<string>) {
        if(this.dialogue.length == 0) {
            this.dialogue = dialogue;
            this.showCharacter();
        }

        this.dialogue.concat(dialogue);
    }

    /**
     * Go's to next dialoge
     */
    public nextDialogueHandler(input: UserInput | Pos): Pos {
        if (input instanceof UserInput)
            input = input.GetMousePressed();
            
        if(input) {
            if(this.dialogue.length == 1)
                this.hideCharacter();
            
            if(this.dialogue.length >= 1) {
                // this disables the click event for all buttons on screen
                input = { xPos: -1, yPos: -1 };
                this.dialogue.shift();
            }
        }

        return input;
    }

}