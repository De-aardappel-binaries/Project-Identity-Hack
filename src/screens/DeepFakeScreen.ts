// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {

    private image:HTMLImageElement;

    // private readonly canvas: HTMLCanvasElement;
    // private readonly ctx: CanvasRenderingContext2D;
    public DeepFakeList: Array<Deepfake>
    public draw(ctx: CanvasRenderingContext2D){
        this.game.ctx.font = `60px Ariel`;
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.textAlign = "center";
        this.game.ctx.fillText("Zoek de Verschillen", 750, 100);


        this.game.ctx.drawImage(this.image, 200,150 )
        this.game.ctx.drawImage(this.image, 800,150 )

    }

    

    
    public listen(input: UserInput){}

    constructor(game: Game) {
        super(game);

        let image = new Image();
        image.src = "C:/Users/laure/Desktop/project school/Project-Identity-Hack/assets/images/iWljgsxiCGvQsEPR.jpg";
        this.image = image;
    }

  


    
}