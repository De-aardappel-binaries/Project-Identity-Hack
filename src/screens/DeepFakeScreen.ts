// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {

    private origninal: HTMLImageElement;
    private deepfakeimage: HTMLImageElement

    // private readonly canvas: HTMLCanvasElement;
    // private readonly ctx: CanvasRenderingContext2D;
    public DeepFakeList: Array<Deepfake>
    public draw(ctx: CanvasRenderingContext2D) {
        // Draw boxes
        ctx.fillStyle = 'white';
        ctx.fillRect(this.game.canvas.width / 2 - 250, 65, 500, 50);
        // Draw Text
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("Zoek de Verschillen", this.game.canvas.width / 2, 100);
        this.game.ctx.drawImage(this.origninal, this.game.canvas.width / 4 - this.origninal.width / 2, 150)
        this.game.ctx.drawImage(this.deepfakeimage, this.game.canvas.width / 4 * 3 - this.deepfakeimage.width / 2, 150)

    }




    public listen(input: UserInput) { }

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