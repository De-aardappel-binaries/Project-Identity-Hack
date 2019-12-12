class DeepFakeScreen {
    public DeepFakeList: Array<Deepfake>
    public Draw(ctx:CanvasRenderingContext2D){}
    public listen(input: UserInput){}

    
}

interface Deepfake {
      xStart: Number;
      yStart: Number;
      xEnd: Number;  
      yEnd: Number;
      imageUrlOriginal: string;
      imageUrlFake: string;
}