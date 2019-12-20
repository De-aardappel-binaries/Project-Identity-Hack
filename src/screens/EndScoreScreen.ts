// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class EndScoreScreen extends GameScreen {
    private dialogeCharacter: DialogueCharacter;

    constructor(game: Game) {
        super(game);

        document.getElementById('body').style.backgroundImage = "url('./assets/images/Groomer_arrest.png')";

        // this.scores = new Scores();
        this.dialogeCharacter = new DialogueCharacter();
        this.dialogeCharacter.createDialogue([
            'Gefeliciteerd! je hebt gewonnen.',
            'De dader is opgepakt. Dit is je score.']);
        
        GameTime.stopTimer();
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // Draw dialogue character
        this.dialogeCharacter.drawCharacter(ctx, this.game.canvas);

        // Draw boxes
        ctx.fillStyle = 'white';
        ctx.fillRect(this.game.canvas.width / 2 -250, 65, 500, 50);

        // Draw Text
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';
        ctx.textBaseline = "middle";
        ctx.fillText('Je score is: ' + GameTime.returnTime(), this.game.canvas.width / 2, 90); 
    }

    public listen(input: UserInput) {
        this.dialogeCharacter.nextDialogueHandler(input);
    }

    // public addScore(player: string, score: number,){
        
    // }
}