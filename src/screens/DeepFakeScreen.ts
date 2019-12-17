// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {

    private origninal: HTMLImageElement;
    private deepfakeimage: HTMLImageElement;
    private differenceButtom1: UIButton;
    private differenceButtom2: UIButton;
    private dialogeCharacter: DialogueCharacter;
    // private readonly canvas: HTMLCanvasElement;
    // private readonly ctx: CanvasRenderingContext2D;
    public DeepFakeList: Array<Deepfake>
    public  difference1 = 0;
    public  difference2 = 0;
    private nextScreen: boolean;
    
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
        this.game.ctx.drawImage(this.origninal, 
        this.game.canvas.width / 10 * 1, 
        this.game.canvas.height/10 * 2, 
        this.game.canvas.width/10*3.5, 
        this.game.canvas.height * this.game.canvas.width / this.game.canvas.height/2)

        this.game.ctx.drawImage(this.deepfakeimage, 
        this.game.canvas.width / 2 + this.game.canvas.width/10 * 0.5, 
        this.game.canvas.height/10*2, 
        this.game.canvas.width/10*3.5,
        this.game.canvas.height * this.game.canvas.width / this.game.canvas.height/2 )

        // this.game.ctx.fillStyle = "white"
        // this.game.ctx.fillRect( this.game.canvas.width / 4 * 2.78 , this.deepfakeimage.width / 0.82, 50,50);
        
        
        
        
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
        this.dialogeCharacter.nextDialogueHandler(input);
        
    }

    constructor(game: Game) {
        super(game);

        let imageoriginal = new Image();
        imageoriginal.src = "./assets/images/original.jpg"; // orignele Image
        this.origninal = imageoriginal;

        let imageDeepfake = new Image();
        imageDeepfake.src = "./assets/images/deepfake.jpg"; // deepfakeImage 
        this.deepfakeimage = imageDeepfake

        document.getElementById('body').style.backgroundImage = "url('https://live.staticflickr.com/684/32192716655_b94c77c8c3_b.jpg')";        

        //Deze functie zorgt ervoor dat de klikbutton op de goede plaats komt
        let imageLoadWaiter1 = setInterval(() => {
            if (this.deepfakeimage.width !== 0){
                this.differenceButtom1 = new UIButton(this.game.canvas.width / 4 * 2.78 , this.deepfakeimage.width / 1.7, 50,50);
                
                
                clearInterval(imageLoadWaiter1)
            }
        }, 100);
        
        let imageLoadWaiter2 = setInterval(() => {
            if (this.deepfakeimage.width !== 0){
                this.differenceButtom2 = new UIButton(this.game.canvas.width / 4 * 2.78 , this.deepfakeimage.width / 0.82, 50,50);
                
                
                clearInterval(imageLoadWaiter2)
            }
        }, 100);
        
        
        this.dialogeCharacter = new DialogueCharacter();
        this.dialogeCharacter.createDialogue([
            'zoek de 2 verschillen', 
            
        ]);
        
        
        
        
    }


    public adjust(game: Game) {
        if(this.nextScreen)
            game.switchScreen(new ChatScreen(game));
    }


}