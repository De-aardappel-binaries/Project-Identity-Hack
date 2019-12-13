// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class FakeProfileScreen extends GameScreen {
    public currentProfile: any;
    public profileImageUrls: Array<string>;
    private logoImage: HTMLImageElement;
    private searchBarImage: HTMLImageElement;

    public constructor(game: Game) {
        super(game);

        document.getElementById('body').style.backgroundImage = "";
        document.getElementById('body').style.backgroundColor = "#e4e4e4";

        let logoImg = new Image();
        logoImg.src = "./assets/images/FPlogo.png";
        this.logoImage = logoImg;
        
        let searchBarImg = new Image();
        searchBarImg.src = "./assets/images/FPSearchBar.png"
        this.searchBarImage = searchBarImg;
    }

    public listen(input: UserInput){}

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.logoImage, 10, 10, 54, 54);
        ctx.drawImage(this.searchBarImage, this.game.canvas.width - 650, 10);
    }
}