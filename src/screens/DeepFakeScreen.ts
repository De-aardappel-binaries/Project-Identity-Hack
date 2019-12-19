// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {

    private origninal: HTMLImageElement;
    private deepfakeimage: HTMLImageElement;

    private differenceButtom1: UIButton;
    private differenceButtom2: UIButton;
    private dialogueCharacter: DialogueCharacter;
    
    public DeepFakeList: Array<Deepfake>
    public  difference1 = 0;
    public  difference2 = 0;
    private nextScreen: boolean;


    private DxOriginal: number;
    private DxDeepfake: number;
    private Dy: number;
    private Dw: number;
    private Dh: number;
    private paddingTop: number = this.game.canvas.height*0.10;
    private paddingBottom: number = this.game.canvas.height*0.05;

    constructor(game: Game) {
        super(game);

        // Import Images
        let imageoriginal = new Image();
        imageoriginal.src = "./assets/images/original.jpg"; // orignele Image
        this.origninal = imageoriginal;

        let imageDeepfake = new Image();
        imageDeepfake.src = "./assets/images/deepfake.jpg"; // deepfakeImage 
        this.deepfakeimage = imageDeepfake

        // Set background
        document.getElementById('body').style.backgroundImage = "url('https://live.staticflickr.com/684/32192716655_b94c77c8c3_b.jpg')";
        
        // Set buttons
        this.Dy =  this.paddingTop;
        this.Dw =  this.game.canvas.width/10*3.5;
        this.Dh =  this.game.canvas.height * this.game.canvas.width / this.game.canvas.height/2;
        this.DxOriginal =  this.game.canvas.width / 10 * 1;
        this.DxDeepfake =  this.game.canvas.width / 2 + this.game.canvas.width/10 * 0.5; 

        if (this.game.canvas.height - this.Dh -this.paddingTop-this.paddingBottom < 1)
            this.Dh = this.game.canvas.height - this.paddingBottom - this.paddingTop;

        //Deze functie zorgt ervoor dat de klikbutton op de goede plaats komt
        this.differenceButtom1 = new UIButton(
            this.DxDeepfake + (this.Dw * 0.434), 
            this.Dy + (this.Dh * 0.27),
            this.Dw * 0.1,
            this.Dh * 0.07
        );

        this.differenceButtom2 = new UIButton(
            this.DxDeepfake + (this.Dw * 0.44), 
            this.Dy + (this.Dh * 0.88),
            this.Dw * 0.1,
            this.Dh * 0.07
        );
        
        
        // Creates Dialogue
        this.dialogueCharacter = new DialogueCharacter();
        this.dialogueCharacter.createDialogue([
            'zoek de 2 verschillen'
        ]);
    }
    
    public draw(ctx: CanvasRenderingContext2D) {
        
        // Draw boxes
        ctx.fillStyle = 'white';
        ctx.fillRect(
        this.game.canvas.width / 2 - 250,
        65, 
        500, 
        50);
        
        
        // Draw Text
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Zoek de 2 Verschillen", this.game.canvas.width / 2, 100);
        
        //originele foto
        this.game.ctx.drawImage(
        this.origninal, 
        this.DxOriginal,
        this.Dy, 
        this.Dw,
        this.Dh)

        //deepfake foto
        this.game.ctx.drawImage(
        this.deepfakeimage, 
        this.DxDeepfake, 
        this.Dy, 
        this.Dw,
        this.Dh)

        // this.game.ctx.fillStyle = "white"
        // this.game.ctx.fillRect(
        //     this.DxDeepfake + (this.Dw * 0.44), 
        //     this.Dy + (this.Dh * 0.88),
        //     this.Dw * 0.1,
        //     this.Dh * 0.07
        // );
    }

    public checkdiffenence(){
        if (this.difference1 === 1 && this.difference2 === 1)
        {
            this.nextScreen = true;
            console.log ("goed")
        }
    }


    public listen(input: UserInput) { 
        
        const isPressed = input.GetMousePressed();
        if(isPressed){
            if(this.differenceButtom1.checkIfPressed(isPressed)) {
                console.log("inderdaad1")
                this.difference1 = 1;
                
                this.checkdiffenence()

                
            }
           else if(this.differenceButtom2.checkIfPressed(isPressed)) {
                console.log("inderdaad2")
                this.difference2 = 1;
               
                this.checkdiffenence()

            }
            else GameTime.removeTime(5)
        }
        this.dialogueCharacter.nextDialogueHandler(input);
        
    }



    public adjust(game: Game) {
        if(this.nextScreen)
            game.switchScreen(new FakeProfileScreen(game));
    }


}