// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {

    private original: HTMLImageElement;
    private deepFakeImage: HTMLImageElement;

    private differenceButton1: UIButton;
    private differenceButton2: UIButton;
    private dialogueCharacter: DialogueCharacter;
    
    public deepFakeList: Array<Deepfake> = [
        {
            differenceButton1:{
                    height: 0.07,
                    width: 0.1,
                    x: 0.3,
                    y: 0.45,
            },
            differenceButton2:{
                height: 0.07,
                width: 0.2,
                x: 0.44,
                y: 0.88,
            },
            imageUrlFake: "./assets/images/original.jpg" ,
            imageUrlOriginal: "./assets/images/deepfake.png"
        },
        {
            differenceButton1:{
                    height: 0.07,
                    width: 0.1,
                    x: 0.57,
                    y: 0.4,
            },
            differenceButton2:{
                height: 0.07,
                width: 0.2,
                x: 0.3,
                y: 0.35,
            },
            imageUrlFake: "./assets/images/original2.jpg" ,
            imageUrlOriginal: "./assets/images/deepfake2.png"
        }
        
            

       
        
    ]
    private currentDeepFake: number = -1;
    public  difference1 = 0;
    public  difference2 = 0;
    private nextScreen: boolean;
    

    private dxOriginal: number;
    private dxDeepFake: number;
    private dY: number;
    private dW: number;
    private dH: number;
    private paddingTop: number = this.game.canvas.height*0.10;
    private paddingBottom: number = this.game.canvas.height*0.05;

    constructor(game: Game) {
        super(game);

        this.setNewDeepFake()

        // Set background
        document.getElementById('body').style.backgroundImage = "url('https://live.staticflickr.com/684/32192716655_b94c77c8c3_b.jpg')";
        

        
        
        // Creates Dialogue
        this.dialogueCharacter = new DialogueCharacter();
        this.dialogueCharacter.createDialogue([
            'De dader heeft een aantal deepfakes op zijn pc\nstaan. Zoek hierin de verschillen.\nVeel succes!'
        ]);
    }
    


    private setNewDeepFake(){            
        this.currentDeepFake++;
        if (this.currentDeepFake < this.deepFakeList.length ){
            this.difference1 = 0;
            this.difference2 = 0;
        }
        else { 
            this.nextScreen = true;
            return;
        } 

       

        // Import Images
        let imageoriginal = new Image();
        imageoriginal.src = this.deepFakeList[this.currentDeepFake].imageUrlOriginal; // orignele Image
        this.original = imageoriginal;

        let imageDeepfake = new Image();
        imageDeepfake.src = this.deepFakeList[this.currentDeepFake].imageUrlFake; // deepfakeImage 
        this.deepFakeImage = imageDeepfake;

        // Set buttons
        this.dY =  this.paddingTop;
        this.dW =  this.game.canvas.width/10*3.5;
        this.dH =  this.game.canvas.height * this.game.canvas.width / this.game.canvas.height/2;
        this.dxOriginal =  this.game.canvas.width / 10 * 1;
        this.dxDeepFake =  this.game.canvas.width / 2 + this.game.canvas.width/10 * 0.5; 

        if (this.game.canvas.height - this.dH -this.paddingTop-this.paddingBottom < 1)
            this.dH = this.game.canvas.height - this.paddingBottom - this.paddingTop;

        //Deze functie zorgt ervoor dat de klikbutton op de goede plaats komt
        this.differenceButton1 = new UIButton(
            this.dxDeepFake + (this.dW * this.deepFakeList[this.currentDeepFake].differenceButton1.x), 
            this.dY + (this.dH * this.deepFakeList[this.currentDeepFake].differenceButton1.y),
            this.dW * this.deepFakeList[this.currentDeepFake].differenceButton1.width,
            this.dH * this.deepFakeList[this.currentDeepFake].differenceButton1.height
        );

        this.differenceButton2 = new UIButton(
            this.dxDeepFake + (this.dW * this.deepFakeList[this.currentDeepFake].differenceButton2.x), 
            this.dY + (this.dH * this.deepFakeList[this.currentDeepFake].differenceButton2.y),
            this.dW * this.deepFakeList[this.currentDeepFake].differenceButton2.width,
            this.dH * this.deepFakeList[this.currentDeepFake].differenceButton2.height
        );

        
    }

    public draw(ctx: CanvasRenderingContext2D) {
        
        

        
        
        //originele foto
        this.game.ctx.drawImage(
        this.original, 
        this.dxOriginal,
        this.dY, 
        this.dW,
        this.dH)

        //deepfake foto
        this.game.ctx.drawImage(
        this.deepFakeImage, 
        this.dxDeepFake, 
        this.dY, 
        this.dW,
        this.dH)

        // this.differenceButton1.drawDebugButton(ctx)
        // this.differenceButton2.drawDebugButton(ctx)
        if (this.difference1 === 1) {this.differenceButton1.drawDebugButton(ctx)}
        if (this.difference2 === 1) {this.differenceButton2.drawDebugButton(ctx)}
        
        this.dialogueCharacter.drawCharacter(ctx, this.game.canvas);
        }

    public checkdifference(){
        if (this.difference1 === 1 && this.difference2 === 1)
        {
            this.setNewDeepFake()

            console.log ("goed")
        }
    }


    public listen(input: UserInput) { 
        
        let isPressed: Pos = input.GetMousePressed();
        isPressed = this.dialogueCharacter.nextDialogueHandler(isPressed);
        if(isPressed){
            if(this.differenceButton1.checkIfPressed(isPressed)) {
                console.log("inderdaad1")
                
                this.difference1 = 1;
                
                this.checkdifference()

                
            }
           else if(this.differenceButton2.checkIfPressed(isPressed)) {
                console.log("inderdaad2")
                this.difference2 = 1;
               
                this.checkdifference()

            }
            else GameTime.removeTime(5)
        }
        
        
    }



    public adjust(game: Game) {
        if(this.nextScreen)
            game.switchScreen(new ChatScreen(game));
    }


}