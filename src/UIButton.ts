class UIButton {

    private readonly xStart: number;    
    private readonly yStart: number;
    private readonly width: number;
    private readonly height: number;    
    
    public constructor(xStart: number, yStart: number, width: number, height: number) {
        this.xStart = xStart;
        this.yStart = yStart;
        this.width = width;
        this.height = height;
    }

    /**
     * this funtion returns true if mouse click is colliding with button
     * @param ClickPos Position of mouse click
     */
    public checkIfPressed(ClickPos: Pos): boolean {
        return ClickPos.xPos > this.xStart && 
               ClickPos.xPos <  this.xStart + this.width &&
               ClickPos.yPos > this.yStart &&
               ClickPos.yPos < this.yStart + this.height;

    }

}