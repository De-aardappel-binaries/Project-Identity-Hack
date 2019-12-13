// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {

    private origninal:HTMLImageElement;
    private deepfakeimage:HTMLImageElement

    // private readonly canvas: HTMLCanvasElement;
    // private readonly ctx: CanvasRenderingContext2D;
    public DeepFakeList: Array<Deepfake>
    public draw(ctx: CanvasRenderingContext2D){
        this.game.ctx.font = `60px Ariel`;
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText("Zoek de Verschillen", 750, 100);


        this.game.ctx.drawImage(this.origninal, 200,150 )
        this.game.ctx.drawImage(this.deepfakeimage, 800,150 )

    }

    

    
    public listen(input: UserInput){}

    constructor(game: Game) {
        super(game);

        let imageoriginal = new Image();
        imageoriginal.src = "./assets/images/iWljgsxiCGvQsEPR.jpg"; // orignele Image
        this.origninal = imageoriginal;

        let imageDeepfake = new Image();
        imageDeepfake.src = "./assets/images/iWljgsxiCGvQsEPR.jpg"; // deepfakeImage 
        this.deepfakeimage = imageDeepfake

        
    }

  


    
}