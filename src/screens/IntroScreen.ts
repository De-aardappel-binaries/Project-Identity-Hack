// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class IntroScreen extends GameScreen {
    public currentProfile: any;
    public profileImageUrls: Array<string>;

    public constructor(game: Game) {
        super(game);
    }

    public draw(ctx: CanvasRenderingContext2D) {

    }
}