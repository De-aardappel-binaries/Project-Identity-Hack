// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {

    private origninal: HTMLImageElement;
    private deepfakeimage: HTMLImageElement
    private startButton: UIButton;

    // private readonly canvas: HTMLCanvasElement;
    // private readonly ctx: CanvasRenderingContext2D;
    public DeepFakeList: Array<Deepfake>
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
        ctx.fillText("Zoek de Verschillen", this.game.canvas.width / 2, 100);
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


        ctx.fillStyle = "white"
        //ctx.fillRect( this.game.canvas.width / 4 * 3 , this.deepfakeimage.width / 2, 100,100)
    }




    public listen(input: UserInput) { 
        const isPressed = input.GetMousePressed();
        if(isPressed){
            if(this.startButton.checkIfPressed(isPressed)) {
                console.log("klik")
            }
            
        }
    }

    constructor(game: Game) {
        super(game);

        let imageoriginal = new Image();
        imageoriginal.src = "./assets/images/original.jpg"; // orignele Image
        this.origninal = imageoriginal;

        let imageDeepfake = new Image();
        imageDeepfake.src = "./assets/images/deepfake.jpg"; // deepfakeImage 
        this.deepfakeimage = imageDeepfake

        this.startButton = new UIButton(this.game.canvas.width / 4 * 3 , this.deepfakeimage.width / 2, 100,100);
        
        
    }





}