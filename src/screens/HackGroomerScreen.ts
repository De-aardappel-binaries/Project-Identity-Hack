// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class HackGroomerScreen extends GameScreen{
    private symbolButton: UIButton;

    public draw(ctx: CanvasRenderingContext2D) {
        console.log(GameTime.returnTime());
        this.drawGrid(ctx);
        // Draw title box
        ctx.fillStyle = 'white';
        ctx.fillRect(this.game.canvas.width / 2 - 250, 65, 500, 50);
        // Draw Text
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Elimineer ieder symbool", this.game.canvas.width / 2, 100);
        // Draw symbols
    }

    private drawGrid(ctx: CanvasRenderingContext2D){
        let text = "B";
        // Draw grid
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {  
                ctx.fillStyle = 'white';
                ctx.fillRect((this.game.canvas.width / 2) - x*50, (this.game.canvas.height / 2) - y*50, 50, 50);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 5;
                ctx.strokeRect((this.game.canvas.width / 2) - x*50, (this.game.canvas.height / 2) - y*50, 50, 50);
                ctx.textAlign = "center";
                ctx.font = "40px Arial";
                ctx.fillStyle = 'blue';
                ctx.textBaseline = "middle";
                this.fillTextWithSpacing(ctx, text, (this.game.canvas.width / 2) - x*42, (this.game.canvas.height / 2) - y*42, 10);
                //ctx.fillText("A", (this.game.canvas.width / 2) - x*42, (this.game.canvas.height / 2) - y*42);
            }
        }
    }

    private fillTextWithSpacing(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, spacing: number){
        //Start at position (X, Y).
        //Measure wAll, the width of the entire string using measureText()
        let wAll = ctx.measureText(text).width;
            do{
            //Remove the first character from the string
            let char = text.substr(0, 1);
            let wShorter = null;
            text = text.substr(1);
            //Print the first character at position (X, Y) using fillText()
            ctx.fillText(char, x, y);
            //Measure wShorter, the width of the resulting shorter string using measureText().
                if (text === "")
                    wShorter = 0;
                else
                    wShorter = ctx.measureText(text).width;
            //Subtract the width of the shorter string from the width of the entire string, giving the kerned width of the character, wChar = wAll - wShorter
            let wChar = wAll - wShorter;
            //Increment X by wChar + spacing
            x += wChar + spacing;
            //wAll = wShorter
            wAll = wShorter;
            //Repeat from step 3
            }
        while (text != "");
    }


    public listen(input: UserInput) {
        const isPressed = input.GetMousePressed();

        if(isPressed) {
            if(this.symbolButton.checkIfPressed(isPressed)) {
                GameTime.startTimer();
            }
        }
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    private randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}