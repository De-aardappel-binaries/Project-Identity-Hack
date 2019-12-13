// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class FakeProfileScreen extends GameScreen {
    public currentProfile: any;
    public profileImageUrls: Array<string>;
    private fakeProfileImg: HTMLImageElement;

    public constructor(game: Game) {
        super(game);
        let fakeImg = new Image();
        fakeImg.src = "./assets/Fake-profile-template.png";
        this.fakeProfileImg = fakeImg;
    }

    public listen(input: UserInput){}

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.fakeProfileImg, 0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}