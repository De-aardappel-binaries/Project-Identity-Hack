// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class FakeProfileScreen extends GameScreen {
    private profiles: Array<Profiles> = [
        {
            profileImage: "./assets/images/profile-pics/boy1.png",
            fake: true,
            textLine1: "Ik ben een vrolijke, 15-jarige jongen",
            textLine2: "op zoek naar nieuwe vrienden."
        },
        {
            profileImage: "./assets/images/profile-pics/girl1.png",
            fake: true,
            textLine1: "Hoi! Mijn naam is Emily, 14 jaar, en ik wil graag",
            textLine2: "kennis maken met andere meiden van mijn leeftijd."
        },
        {
            profileImage: "./assets/images/profile-pics/FPBlankProfilePic.png",
            fake: false,
            textLine1: "Ik ben een 42 jarige man. Mijn interesses zijn auto's,",
            textLine2: "computers en voetbal."
        },
        {
            profileImage: "./assets/images/profile-pics/boy2.png",
            fake: true,
            textLine1: "Ik ben Jake, 17 jaar, en ik hou van volleybal.",
        },
        {
            profileImage: "./assets/images/profile-pics/girl2.png",
            fake: true,
            textLine1: "Mijn naam is Jard, ik hou van paarden.",
            textLine2: "Ik zoek andere meiden om mee te kletsen. ;)"
        }
    ];
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
    private dialogueCharacter : DialogueCharacter;
    private currentProfile : number = -1;

    public constructor(game: Game) {
        super(game);

        document.getElementById('body').style.backgroundImage = "";
        document.getElementById('body').style.backgroundColor = "#e4e4e4";
        this.setNewProfile();

        let topNavImg = new Image();
        topNavImg.src = "./assets/images/FPTopNav.png";
        this.topNavImage = topNavImg;

        let logoImg = new Image();
        logoImg.src = "./assets/images/FPlogo.png";
        this.logoImage = logoImg;
        
        let searchBarImg = new Image();
        searchBarImg.src = "./assets/images/FPSearchBar.png";
        this.searchBarImage = searchBarImg;

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

        this.dialogueCharacter = new DialogueCharacter();

        this.dialogueCharacter.createDialogue([
            "Je hebt de social media profielen van...",
            "de dader gevonden. Zoek uit of ze echt of...",
            "nep zijn. Veel succes."
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
        if(!this.showNextLevelButton) {
            ctx.drawImage(this.realButtonImage, this.game.canvas.width / 2 - 298, this.game.canvas.height / 2 + 200);
            ctx.drawImage(this.fakeButtonImage, this.game.canvas.width / 2, this.game.canvas.height / 2 + 200);
        }
        if(this.showNextLevelButton) {
            ctx.drawImage(this.nextLevelButtonImage, 20, 100);
        }

        // draw text
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(this.profiles[this.currentProfile].textLine1, this.game.canvas.width / 2, this.game.canvas.height / 2);
        if (this.profiles[this.currentProfile].textLine2 !== undefined) {
            ctx.fillText(this.profiles[this.currentProfile].textLine2, this.game.canvas.width / 2, this.game.canvas.height / 2 + 30);
        }

        // draw dialogue character
        this.dialogueCharacter.drawCharacter(ctx, this.game.canvas);
    }
    
    public listen(input: UserInput){
        const isPressed = input.GetMousePressed();
        this.dialogueCharacter.nextDialogueHandler(isPressed);

        if(isPressed) {

            if(!this.showNextLevelButton && this.fakeButton.checkIfPressed(isPressed)) {
                if(this.profiles[this.currentProfile].fake) {
                    this.dialogueCharacter.createDialogue([
                    "Dat antwoord was correct!"
                    ]);
                    this.setNewProfile();
                } else {
                    this.dialogueCharacter.createDialogue([
                        "Dat antwoord was helaas fout. -10 seconden!",
                        "Probeer het opnieuw!"
                    ]);
                    GameTime.removeTime(10);
                }
            }
            if(!this.showNextLevelButton && this.realButton.checkIfPressed(isPressed)) {
                if(!this.profiles[this.currentProfile].fake) {
                    this.dialogueCharacter.createDialogue([
                    "Dat antwoord was correct!"
                    ]);
                    this.setNewProfile();
                } else {
                    this.dialogueCharacter.createDialogue([
                        "Dat antwoord was helaas fout. -10 seconden!",
                        "Probeer het opnieuw!"
                    ]);
                    GameTime.removeTime(10);
                }
            }
            if(this.nextLevelButton.checkIfPressed(isPressed)) {
                if(this.showNextLevelButton) {
                    this.nextScreen = true;
                }
            }
        }
    }

    private setNewProfile() {
        if (!(this.currentProfile < this.profiles.length -1)) {
            this.showNextLevelButton = true;
            return;
        } else {
            this.currentProfile++;
        }

        let profilePicImg = new Image();
        profilePicImg.src = this.profiles[this.currentProfile].profileImage;
        this.profilePicImage = profilePicImg;
    }

    public adjust(game: Game) {
        if(this.nextScreen)
            game.switchScreen(new DeepFakeScreen(game));
    }
}