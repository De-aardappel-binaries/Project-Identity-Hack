// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class LostScreen extends GameScreen {

    private dialogeCharacter: DialogueCharacter;

    constructor(game: Game) {
        super(game);

        this.dialogeCharacter = new DialogueCharacter();
        this.dialogeCharacter.createDialogue([
            'He! jammer joh.', 
            'je bent ontslagen.', 
            'dan moet je maar doorwerken.'
        ]);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.dialogeCharacter.drawCharacter(ctx, this.game.canvas);
    }

    public listen(input: UserInput) {
        this.dialogeCharacter.nextDialogueHandler(input);
    }

}