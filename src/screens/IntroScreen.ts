// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class IntroScreen extends GameScreen {
    public currentProfile: any;
    public profileImageUrls: Array<string>;

    public constructor(game: Game) {
        super(game);
    }

    public draw(ctx: CanvasRenderingContext2D) {

        ctx.fillText("Hello World", 100, 500); 
        
        ctx.rect(this.game.canvas.width / 2 - 100, this.game.canvas.height - 100, 200, 50);
        ctx.stroke();
    }
}