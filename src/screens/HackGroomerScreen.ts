// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class HackGroomerScreen extends GameScreen{
    
    private readonly grid: number = 10;
    private readonly buttonSize: number = 50;
    private gridButton: Array<Array<UIButton>> = [];
    private answerForm: UIButton;


    private abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    private possibleAnswers = ['IntelSucks', 'NvidiaGay', 'VIAforTheWin', 'fuckAMD'];
    private startPoint: Pos;

    constructor(game: Game) {
        super(game);

        this.startPoint = {
            xPos: (game.canvas.width - (this.buttonSize * this.grid)) / 2, 
            yPos: 200
        }
        this.randomizeString();
        // randomize hier de abc string

        for(let y = 0; y < this.grid; y++) {
            this.gridButton[y] = [];
            for(let x = 0; x < this.grid; x++) {
                this.gridButton[y][x] = new UIButton(
                    this.startPoint.xPos + (x * this.buttonSize),
                    this.startPoint.yPos + (y * this.buttonSize),
                    this.buttonSize,
                    this.buttonSize
                );
            }
        }
    }

    private drawForm(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.game.canvas.width / 2 - 250, 65, 500, 50);
        ctx.strokeRect(this.game.canvas.width / 2 - 250, 65, 500, 50);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.drawForm(ctx);
        const answerForm = document.createElement("form");
        const element1 = document.createElement("input");
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

    private randomizeString(){
        for (let i = 0; i < 50; i++) {
            let firstRandomizer = Math.round((this.abc.length -1) * Math.random());
            let secondRandomizer = Math.round((this.abc.length -1) * Math.random());
            let temp = this.abc[firstRandomizer];
            this.abc[firstRandomizer] = this.abc[secondRandomizer];
            this.abc[secondRandomizer] = temp;  
        }
    }

    public listen(input: UserInput){
        const isPressed = input.GetMousePressed();
        let count = 0;
        if(isPressed) {
            for(let y = 0; y < this.grid; y++) {
                for(let x = 0; x < this.grid; x++) {
                    if(this.gridButton[y][x].checkIfPressed(isPressed)) {
                        console.log(this.abc[count]);
                        return;
                    }
 
                    if(this.abc.length-1 == count)
                        count = 0;
                    else
                        count++;
                }
            }
        }
    }
}