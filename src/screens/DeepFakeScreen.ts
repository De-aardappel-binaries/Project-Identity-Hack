// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {
    // private readonly canvas: HTMLCanvasElement;
    // private readonly ctx: CanvasRenderingContext2D;
    public DeepFakeList: Array<Deepfake>
    public Draw(ctx: CanvasRenderingContext2D){
        this.DrawTextToCanvas(
        `Zoek de Verschillen`,
        20,
        this.game.canvas.width - 100,
        30,
        "center"
        )
        
    }

    

    public DrawTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ){
        this.game.ctx.font = `${fontSize}px Minecraft`;
        this.game.ctx.fillStyle = color;
        this.game.ctx.textAlign = alignment;
        this.game.ctx.fillText(text, xCoordinate, yCoordinate);

    }
    public listen(input: UserInput){}

    constructor(game: Game) {
        super(game);
    }

  


    
}