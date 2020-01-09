// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class FakeProfileScreen extends GameScreen {
    private profiles: Array<Profiles> = [
        {
            profileImage: "./assets/images/profile-pics/boy1.png",
            fake: true,
            textLine1: "Ik ben een vrolijke, 15-jarige jongen, op zoek naar",
            textLine2: "nieuwe vrienden. Ik deel graag foto's met anderen."
        },
        {
            profileImage: "./assets/images/profile-pics/girl1.png",
            fake: true,
            textLine1: "Hoi! Mijn naam is Emily, 14 jaar, en ik wil graag",
            textLine2: "kennis maken met andere meiden van mijn leeftijd."
        },
        {
            profileImage: "./assets/images/profile-pics/boy2.png",
            fake: false,
            textLine1: "Ik ben een 42 jarige man. Mijn interesses",
            textLine2: "zijn auto's, computers en voetbal."
        },
        {
            profileImage: "./assets/images/profile-pics/FPBlankProfilePic.png",
            fake: true,
            textLine1: "Ik ben Jake, 17 jaar, en ik hou van volleybal.",
            textLine2: "Ik wil graag contact met meiden van mijn leeftijd."
        },
        {
            profileImage: "./assets/images/profile-pics/girl2.png",
            fake: true,
            textLine1: "Mijn naam is Jard, ik hou van paarden.",
            textLine2: "Ik zoek andere meiden om mee te kletsen.",
            textLine3: "Ik hou van foto's delen met anderen. ;)"
        }
    ];
    private topNavImage: HTMLImageElement;
    private logoImage: HTMLImageElement;
    private searchBarImage: HTMLImageElement;
    private profilePicLineImage: HTMLImageElement;
    private profilePicImage : HTMLImageElement;
    private realButton : UIButton;
    private fakeButton : UIButton;
    private nextLevelButton : UIButton;
    private nextScreen: boolean;
    private showNextLevelButton : boolean;
    private dialogueCharacter : DialogueCharacter;
    private currentProfile : number = -1;

    public constructor(game: Game) {
        super(game);

        GameTime.setTimerPos(true, true);

        document.getElementById('body').style.backgroundImage = "";
        document.getElementById('body').style.backgroundColor = "#404040";
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

        this.nextLevelButton = new UIButton(game.canvas.width / 2 - 298, game.canvas.height / 2, 596, 149);
        
        this.showNextLevelButton = false;

        this.dialogueCharacter = new DialogueCharacter();

        this.dialogueCharacter.createDialogue([
            "Je hebt de social media profielen van de dader\ngevonden. Zoek uit of ze hem zelf beschrijven,\nof dat ze gemaakt zijn om jongeren te misleiden.\nElk fout antwoord kost 10 seconden van je tijd.\n\nVeel succes!"
        ]);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // draw image elements
        ctx.drawImage(this.topNavImage, 0, 0, this.game.canvas.width, 74);
        ctx.drawImage(this.logoImage, 10, 10, 54, 54);
        ctx.drawImage(this.searchBarImage, this.game.canvas.width - 650, 10);
        //ctx.drawImage(this.profileTextImage, this.game.canvas.width / 2 - 275, this.game.canvas.height / 2 - 86.5, 550, 173);
        
        if(!this.showNextLevelButton) {
            ctx.drawImage(this.profilePicImage, this.game.canvas.width / 2 - 48, this.game.canvas.height / 2 - 248, 96, 96);
            ctx.drawImage(this.profilePicLineImage, this.game.canvas.width / 2 - 50, this.game.canvas.height / 2 - 250, 100, 100);

            // Profile Bio
            ctx.fillStyle = 'rgba(64,64,64,1)';
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.fillRect(this.game.canvas.width / 2 - 275, this.game.canvas.height / 2 - 86.5, 550, 173);
            ctx.strokeRect(this.game.canvas.width / 2 - 275, this.game.canvas.height / 2 - 86.5, 550, 173);

            // this.fakeButton.drawDebugButton(ctx);
            // this.realButton.drawDebugButton(ctx);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,255,0,1)';

            // real
            ctx.fillRect(this.game.canvas.width / 2 - 298, this.game.canvas.height / 2 + 200, 298, 149);
            ctx.strokeRect(this.game.canvas.width / 2 - 298, this.game.canvas.height / 2 + 200, 298, 149);
            // fake
            ctx.fillRect(this.game.canvas.width / 2, this.game.canvas.height / 2 + 200, 298, 149);
            ctx.strokeRect(this.game.canvas.width / 2, this.game.canvas.height / 2 + 200, 298, 149);

            ctx.fillStyle = 'rgba(0,255,0,1)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.fillText('Echt', this.game.canvas.width / 2 - 149, this.game.canvas.height / 2 + 275);
            ctx.fillText('Nep', this.game.canvas.width / 2 + 149,  this.game.canvas.height / 2 + 275);

            // draw text
            ctx.textAlign = "center";
            ctx.font = "20px Arial";
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.fillText(this.profiles[this.currentProfile].textLine1, this.game.canvas.width / 2, this.game.canvas.height / 2 -15);
            if (this.profiles[this.currentProfile].textLine2 !== undefined)
                ctx.fillText(this.profiles[this.currentProfile].textLine2, this.game.canvas.width / 2, this.game.canvas.height / 2 + 15);
            if (this.profiles[this.currentProfile].textLine3 !== undefined)
                ctx.fillText(this.profiles[this.currentProfile].textLine3, this.game.canvas.width / 2, this.game.canvas.height / 2 + 45);
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
                        "Dat antwoord was helaas fout. Dat kost je\n10 seconden! Probeer het opnieuw!"
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
                        "Dat antwoord was helaas fout. Dat kost je\n10 seconden! Probeer het opnieuw!"
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