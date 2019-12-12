// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class IntroScreen extends GameScreen {
    public currentProfile: any;
    public profileImageUrls: Array<string>;

    public constructor(game: Game) {
        super(game);

        // set game background for this screen
        document.getElementById('body').style.backgroundImage = "url('https://ak6.picdn.net/shutterstock/videos/5631416/thumb/1.jpg')";
        document.getElementById('body').style.backgroundSize = "cover";
        
        // create button
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.game.canvas.width / 2 - 100, this.game.canvas.height - 100, 200, 50);
        ctx.fillRect(this.game.canvas.width / 2 -250, 65, 500, 50);

        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Start game", this.game.canvas.width / 2, this.game.canvas.height - 65); 
        ctx.fillText("Druk op start om het spel te starten", this.game.canvas.width / 2, 100); 
    }

    public listen(input: UserInput) {
        const isPressed = input.GetMousePressed();

        if(isPressed) {
            console.log(isPressed);
        }
    }
}