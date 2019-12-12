class UIButton {

    private readonly xStart: number;    
    private readonly yStart: number;
    private readonly xEnd: number;
    private readonly yEnd: number;    
    
    public constructor(xStart: number, yStart: number, xEnd: number, yEnd: number) {
        this.xStart = xStart;
        this.yStart = yStart;
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }

    /**
     * this funtion returns true if mouse click is colliding with button
     * @param ClickPos Position of mouse click
     */
    public checkIfPressed(ClickPos: Pos): boolean {
        return ClickPos.xPos > this.xStart && 
               ClickPos.xPos <  this.xEnd &&
               ClickPos.yPos > this.yStart &&
               ClickPos.yPos < this.yEnd;

    }

}