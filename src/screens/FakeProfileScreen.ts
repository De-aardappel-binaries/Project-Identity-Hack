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
    private nextLevelButtonImage : HTMLImageElement;
    private realButton : UIButton;
    private fakeButton : UIButton;
    private nextLevelButton : UIButton;
    private nextScreen: boolean;
    private showNextLevelButton : boolean;
    private dialogeCharacter: DialogueCharacter;

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

        let nextLevelButtonImg = new Image();
        nextLevelButtonImg.src = "./assets/images/VolgendLevelButton.png";
        this.nextLevelButtonImage = nextLevelButtonImg;

        this.nextLevelButton = new UIButton(20, 100, 200, 100);
        
        this.showNextLevelButton = false;

        this.dialogeCharacter = new DialogueCharacter();

        this.dialogeCharacter.createDialogue([
            "Zoek uit of dit profiel echt of nep is."
        ]);
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
        if(this.showNextLevelButton) {
            ctx.drawImage(this.nextLevelButtonImage, 20, 100);
        }

        // draw text
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Ik ben een vrolijke, 15-jarige jongen", this.game.canvas.width / 2, this.game.canvas.height / 2);
        ctx.fillText("op zoek naar nieuwe vrienden.", this.game.canvas.width / 2, this.game.canvas.height / 2 + 30);

        this.dialogeCharacter.drawCharacter(ctx, this.game.canvas);
    }
    
    public listen(input: UserInput){
        const isPressed = input.GetMousePressed();
        this.dialogeCharacter.nextDialogueHandler(isPressed);

        if(isPressed) {
            if(this.fakeButton.checkIfPressed(isPressed)) {
                // console.log("ECHT!"); // werkt
                this.dialogeCharacter.createDialogue([
                    "Dat antwoord was correct!",
                    "Snel door naar het volgende level!"
                ]);
                this.showNextLevelButton = true;
            }
            if(this.realButton.checkIfPressed(isPressed)) {
                // console.log("NEP!"); // werkt
                this.dialogeCharacter.createDialogue([
                    "Dat antwoord was helaas fout. -10 seconden!",
                    "Probeer het opnieuw!"
                ]);
                GameTime.removeTime(10);
            }
            if(this.nextLevelButton.checkIfPressed(isPressed)) {
                if(this.showNextLevelButton) {
                    this.nextScreen = true;
                }
            }
        }
    }

    public adjust(game: Game) {
        if(this.nextScreen)
            game.switchScreen(new ChatScreen(game));
    }
}