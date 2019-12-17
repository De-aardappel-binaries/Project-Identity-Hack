// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class FakeProfileScreen extends GameScreen {
    public currentProfile: any;
    public profileImageUrls: Array<string>;
    private topNavImage: HTMLImageElement;
    private logoImage: HTMLImageElement;
    private searchBarImage: HTMLImageElement;
    private profilePicLineImage: HTMLImageElement;
    private profilePicImage : HTMLImageElement;
    private profileTextImage : HTMLImageElement;
    private realButtonImage : HTMLImageElement;
    private fakeButtonImage : HTMLImageElement;
    private realButton : UIButton;
    private fakeButton : UIButton;

    public constructor(game: Game) {
        super(game);

        document.getElementById('body').style.backgroundImage = "";
        document.getElementById('body').style.backgroundColor = "#e4e4e4";

        let topNavImg = new Image();
        topNavImg.src = "./assets/images/FPTopNav.png";
        this.topNavImage = topNavImg;

        let logoImg = new Image();
        logoImg.src = "./assets/images/FPlogo.png";
        this.logoImage = logoImg;
        
        let searchBarImg = new Image();
        searchBarImg.src = "./assets/images/FPSearchBar.png";
        this.searchBarImage = searchBarImg;

        let profilePicImg = new Image();
        profilePicImg.src = "./assets/images/FPBlankProfilePic.png";
        this.profilePicImage = profilePicImg;

        let profilePicLineImg = new Image();
        profilePicLineImg.src = "./assets/images/FPProfilePicLine.png";
        this.profilePicLineImage = profilePicLineImg;

        let profileTextImg = new Image();
        profileTextImg.src = "./assets/images/FPProfileText.png";
        this.profileTextImage = profileTextImg;

        let realButtonImg = new Image();
        realButtonImg.src = "./assets/images/EchtButton.png";22
        this.realButtonImage = realButtonImg;

        this.realButton = new UIButton(this.game.canvas.width / 2 - 298, this.game.canvas.height / 2 + 200, 298, 149);

        let fakeButtonImg = new Image();
        fakeButtonImg.src = "./assets/images/NepButton.png";
        this.fakeButtonImage = fakeButtonImg;

        this.fakeButton = new UIButton(this.game.canvas.width / 2, this.game.canvas.height / 2 + 200, 298, 149);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // draw image elements
        ctx.drawImage(this.topNavImage, 0, 0, this.game.canvas.width, 74);
        ctx.drawImage(this.logoImage, 10, 10, 54, 54);
        ctx.drawImage(this.searchBarImage, this.game.canvas.width - 650, 10);
        ctx.drawImage(this.profilePicImage, this.game.canvas.width / 2 - 48, this.game.canvas.height / 2 - 248, 96, 96);
        ctx.drawImage(this.profilePicLineImage, this.game.canvas.width / 2 - 50, this.game.canvas.height / 2 - 250, 100, 100);
        ctx.drawImage(this.profileTextImage, this.game.canvas.width / 2 - 275, this.game.canvas.height / 2 - 86.5, 550, 173);
        ctx.drawImage(this.realButtonImage, this.game.canvas.width / 2 - 298, this.game.canvas.height / 2 + 200);
        ctx.drawImage(this.fakeButtonImage, this.game.canvas.width / 2, this.game.canvas.height / 2 + 200);

        // draw text
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Ik ben een vrolijke, 15-jarige jongen", this.game.canvas.width / 2, this.game.canvas.height / 2);
        ctx.fillText("op zoek naar nieuwe vrienden.", this.game.canvas.width / 2, this.game.canvas.height / 2 + 30);
    }
    
    public listen(input: UserInput){
        const isPressed = input.GetMousePressed();

        if(isPressed) {
            if(this.realButton.checkIfPressed(isPressed)) {
                // console.log("ECHT!"); // werkt
            }
            if(this.fakeButton.checkIfPressed(isPressed)) {
                // console.log("NEP!"); // werkt
            }
        }
    }
}