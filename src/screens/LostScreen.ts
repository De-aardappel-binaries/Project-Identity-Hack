// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class LostScreen extends GameScreen {

    private dialogeCharacter: DialogeCharacter;

    constructor(game: Game) {
        super(game);

        this.dialogeCharacter = new DialogeCharacter();
        this.dialogeCharacter.createDialoge([
            'He! jammer joh.', 
            'je bent ontslagen.', 
            'dan moet je maar doorwerken.'
        ]);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.dialogeCharacter.drawCharacter(ctx, this.game.canvas);
    }

    public listen(input: UserInput) {
        this.dialogeCharacter.nextDialogeHandler(input);
    }

}