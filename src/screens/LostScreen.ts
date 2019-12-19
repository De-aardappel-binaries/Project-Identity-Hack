// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class LostScreen extends GameScreen {

    private dialogeCharacter: DialogueCharacter;

    constructor(game: Game) {
        super(game);

        document.getElementById('body').style.backgroundImage = "";
        document.getElementById('body').style.backgroundImage = "url('./assets/images/GameOver.png')";

        this.dialogeCharacter = new DialogueCharacter();
        this.dialogeCharacter.createDialogue([
            'He! jammer joh.', 
            'Je hebt de dader niet te pakken.',
            'Nu ben je ontslagen.',
            'Dan moet je maar doorwerken.'
        ]);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.dialogeCharacter.drawCharacter(ctx, this.game.canvas);
    }

    public listen(input: UserInput) {
        this.dialogeCharacter.nextDialogueHandler(input);
    }

}