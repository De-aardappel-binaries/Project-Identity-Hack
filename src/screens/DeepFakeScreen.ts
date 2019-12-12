// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class DeepFakeScreen extends GameScreen {
    public DeepFakeList: Array<Deepfake>
    public Draw(ctx:CanvasRenderingContext2D){}
    public listen(input: UserInput){}

    constructor(game: Game) {
        super(game);
    }

    
}