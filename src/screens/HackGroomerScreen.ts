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
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("A", this.game.canvas.width / 2, this.game.canvas.height / 2);
    }

    private drawGrid(ctx: CanvasRenderingContext2D){
        // Draw grid
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                
            
            ctx.fillStyle = 'white';
        ctx.fillRect((this.game.canvas.width / 2) - i*50, (this.game.canvas.height / 2) - j*50, 50, 50);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.strokeRect((this.game.canvas.width / 2) - i*50, (this.game.canvas.height / 2) - j*50, 50, 50);
            }
        }
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