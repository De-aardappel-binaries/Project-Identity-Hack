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
        
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = 'rgba(0,255,0,1)';
        ctx.fillRect(this.game.canvas.width / 2 - 100, this.game.canvas.height - 100, 200, 50);
        ctx.strokeRect(this.game.canvas.width / 2 - 100, this.game.canvas.height - 100, 200, 50);
        ctx.fillRect(this.game.canvas.width / 2 -250, 65, 500, 50);
        ctx.strokeRect(this.game.canvas.width / 2 -250, 65, 500, 50);

        // Draw Text
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgba(0,255,0,1)';
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
        if(this.nextScreen) {
            const input: HTMLInputElement = document.getElementById('username') as HTMLInputElement;
            if(input.value !== "") {
                input.style.display = "none";
                Game.username = input.value;
                game.switchScreen(new HackGroomerScreen(game));
            } else this.nextScreen = false;
            
        }
    }
}