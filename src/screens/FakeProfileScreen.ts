// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class FakeProfileScreen extends GameScreen {
    public currentProfile: any;
    public profileImageUrls: Array<string>;
    private fakeProfileImg: HTMLImageElement;

    public constructor(game: Game) {
        super(game);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        
    }
}