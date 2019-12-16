// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class HackGroomerScreen extends GameScreen{
    
    private readonly grid: number = 10;
    private readonly buttonSize: number = 50;


    private abc = 'abcdefghijklmnopqrstuvwxyz';
    private startPoint: Pos;

    constructor(game: Game) {
        super(game);

        this.startPoint = {
            xPos: (game.canvas.width - (this.buttonSize * this.grid)) / 2, 
            yPos: 200
        }

        // randomize hier de abc string
    }

    public draw(ctx: CanvasRenderingContext2D) {
        let count = 0;

        for(let y = 0; y < this.grid; y++) {
            for(let x = 0; x < this.grid; x++) {
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.fillRect(
                    this.startPoint.xPos + (x * this.buttonSize), 
                    this.startPoint.yPos + (y * this.buttonSize),
                    this.buttonSize,
                    this.buttonSize
                );
                ctx.strokeRect(
                    this.startPoint.xPos + (x * this.buttonSize), 
                    this.startPoint.yPos + (y * this.buttonSize),
                    this.buttonSize,
                    this.buttonSize
                );
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    this.abc[count],
                    this.startPoint.xPos + (x * this.buttonSize) + (this.buttonSize/2), 
                    this.startPoint.yPos + (y * this.buttonSize) + (this.buttonSize/2)
                );

                if(this.abc.length-1 == count)
                    count = 0;
                else
                    count++;
            }
        }
    }

    public listen(input: UserInput) {
        
    }
}