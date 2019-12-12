// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class IntroScreen extends GameScreen {
    public currentProfile: any;
    public profileImageUrls: Array<string>;
    
    private startButton: UIButton;

    private nextScreen: boolean;

    public constructor(game: Game) {
        super(game);

        // set game background for this screen
        document.getElementById('body').style.backgroundImage = "url('https://live.staticflickr.com/684/32192716655_b94c77c8c3_b.jpg')";
        
        // create button
        this.startButton = new UIButton(this.game.canvas.width / 2 - 100, this.game.canvas.height - 100, 200, 50);
    }

    public draw(ctx: CanvasRenderingContext2D) {

        // Draw boxes
        ctx.fillStyle = 'white';
        ctx.fillRect(this.game.canvas.width / 2 - 100, this.game.canvas.height - 100, 200, 50);
        ctx.fillRect(this.game.canvas.width / 2 -250, 65, 500, 50);

        // Draw Text
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Start game", this.game.canvas.width / 2, this.game.canvas.height - 65); 
        ctx.fillText("Druk op start om het spel te starten", this.game.canvas.width / 2, 100); 
    }

    public listen(input: UserInput) {
        const isPressed = input.GetMousePressed();

        if(isPressed) {
            if(this.startButton.checkIfPressed(isPressed)) {
                this.nextScreen = true;
                GameTime.startTimer();
            }
        }
    }

    public adjust(game: Game) {
        if(this.nextScreen)
            game.switchScreen(new HackGroomerScreen(game));
    }
}