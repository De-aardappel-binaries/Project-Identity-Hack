// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class LostScreen extends GameScreen {

    private dialogueCharacter: DialogueCharacter;

    constructor(game: Game) {
        super(game);

        document.getElementById('body').style.backgroundImage = "";
        document.getElementById('body').style.backgroundImage = "url('./assets/images/GameOver.png')";

        this.dialogueCharacter = new DialogueCharacter();
        this.dialogueCharacter.createDialogue([
            'He! jammer joh.', 
            'Je hebt de dader niet te pakken.',
            'Nu ben je ontslagen.',
            'Dan moet je maar doorwerken.'
        ]);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.dialogueCharacter.drawCharacter(ctx, this.game.canvas);
    }

    public listen(input: UserInput) {
        this.dialogueCharacter.nextDialogueHandler(input);
    }

}