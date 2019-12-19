// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class EndScoreScreen extends GameScreen {
    private dialogeCharacter: DialogueCharacter;

    constructor(game: Game) {
        super(game);

        document.getElementById('body').style.backgroundImage = "url('https://indebuurt.nl/ede/wp-content/uploads/2019/10/arrestatie-foto-anp.jpg')";

        // this.scores = new Scores();
        this.dialogeCharacter = new DialogueCharacter();
        this.dialogeCharacter.createDialogue([
            'Gefeliciteerd! je hebt gewonnen.',
            'De dader is opgepakt. Dit is je score.']);
        
        GameTime.stopTimer();
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // Draw groomer arrest screen
        document.getElementById('body').style.backgroundImage = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ce692904-27d8-4b2b-ab53-f70852161b7b/d6y0xpw-509ac242-f4de-417f-ba27-f365b5d368b4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NlNjkyOTA0LTI3ZDgtNGIyYi1hYjUzLWY3MDg1MjE2MWI3YlwvZDZ5MHhwdy01MDlhYzI0Mi1mNGRlLTQxN2YtYmEyNy1mMzY1YjVkMzY4YjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hZY1P4V9MQLTVIvkDgRG18mTiZ4PrMM-kspYnrCmvAg')";

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