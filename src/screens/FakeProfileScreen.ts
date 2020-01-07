// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class FakeProfileScreen extends GameScreen {
    private profiles: Array<Profiles> = [
        {
            profileImage: "./assets/images/profile-pics/boy1.png",
            fake: true,
            textLine1: "Ik ben een vrolijke, 15-jarige jongen",
            textLine2: "op zoek naar nieuwe vrienden. Ik hou van foto's."
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
            textLine1: "Ik ben een 42 jarige man. Mijn interesses zijn",
            textLine2: "auto's, computers en voetbal."
        },
        {
            profileImage: "./assets/images/profile-pics/boy2.png",
            fake: true,
            textLine1: "Ik ben Jake, 17 jaar, en ik hou van volleybal.",
            textLine2: "Ik wil graag contact met meiden van mijn leeftijd."
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

        GameTime.setTimerPos(false, true);

        // document.getElementById('body').style.backgroundImage = "";
        // document.getElementById('body').style.backgroundColor = "#0f0f0f";
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

        this.realButton = new UIButton(this.game.canvas.width / 2 - 298, this.game.canvas.height / 2 + 200, 298, 149);
        this.fakeButton = new UIButton(this.game.canvas.width / 2, this.game.canvas.height / 2 + 200, 298, 149);

        let nextLevelButtonImg = new Image();
        nextLevelButtonImg.src = "./assets/images/VolgendLevelButton.png";
        this.nextLevelButtonImage = nextLevelButtonImg;

        this.nextLevelButton = new UIButton(game.canvas.width / 2 - 298, game.canvas.height / 2, 596, 149);
        
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
        
        if(!this.showNextLevelButton) {
            ctx.drawImage(this.profilePicImage, this.game.canvas.width / 2 - 48, this.game.canvas.height / 2 - 248, 96, 96);
            ctx.drawImage(this.profilePicLineImage, this.game.canvas.width / 2 - 50, this.game.canvas.height / 2 - 250, 100, 100);
            // this.fakeButton.drawDebugButton(ctx);
            // this.realButton.drawDebugButton(ctx);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.strokeStyle = 'rgba(0,255,0,1)';

            // real
            ctx.fillRect(this.game.canvas.width / 2 - 298, this.game.canvas.height / 2 + 200, 298, 149)
            ctx.strokeRect(this.game.canvas.width / 2 - 298, this.game.canvas.height / 2 + 200, 298, 149)
            // fake
            ctx.fillRect(this.game.canvas.width / 2, this.game.canvas.height / 2 + 200, 298, 149)
            ctx.strokeRect(this.game.canvas.width / 2, this.game.canvas.height / 2 + 200, 298, 149)

            ctx.fillStyle = 'rgba(0,255,0,1)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.fillText('Echt', this.game.canvas.width / 2 - 149, this.game.canvas.height / 2 + 275);
            ctx.fillText('Nep', this.game.canvas.width / 2 + 149,  this.game.canvas.height / 2 + 275);

            // draw text
            ctx.textAlign = "center";
            ctx.font = "20px Arial";
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(this.game.canvas.width / 2 - 275, this.game.canvas.height / 2 - 86.5, 550, 173);
            ctx.strokeRect(this.game.canvas.width / 2 - 275, this.game.canvas.height / 2 - 86.5, 550, 173);
            ctx.fillStyle = 'rgba(0,255,0,1)';
            ctx.fillText(this.profiles[this.currentProfile].textLine1, this.game.canvas.width / 2, this.game.canvas.height / 2);
            if (this.profiles[this.currentProfile].textLine2 !== undefined)
                ctx.fillText(this.profiles[this.currentProfile].textLine2, this.game.canvas.width / 2, this.game.canvas.height / 2 + 30);
            if (this.profiles[this.currentProfile].textLine3 !== undefined)
                ctx.fillText(this.profiles[this.currentProfile].textLine3, this.game.canvas.width / 2, this.game.canvas.height / 2 + 30);
        }
        if(this.showNextLevelButton) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(this.game.canvas.width / 2 - 298, this.game.canvas.height / 2, 596, 149);
            ctx.strokeRect(this.game.canvas.width / 2 - 298, this.game.canvas.height / 2, 596, 149);
            ctx.fillStyle = 'rgba(0,255,0,1)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Volgend level', this.game.canvas.width / 2, this.game.canvas.height / 2 + 75);
        }
        
        // draw dialogue character
        this.dialogueCharacter.drawCharacter(ctx, this.game.canvas);
    }
    
    public listen(input: UserInput){
        let isPressed = input.GetMousePressed();
        isPressed = this.dialogueCharacter.nextDialogueHandler(isPressed);

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

    /**
     * loads the next profile of the fake profile list
     */
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