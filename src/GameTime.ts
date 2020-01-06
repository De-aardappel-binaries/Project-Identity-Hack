// tslint:disable member-ordering

class GameTime {
    private static time: number;

    private static timer: number;

    private static drawTop: boolean = true;
    private static drawRight: boolean = true;

    /**
     * This funtion sets the timer
     * @param time Amount of seconds
     */
    public static setTime(time: number){
        GameTime.time = time;
    }

    /**
     * Starts timer
     */
    public static startTimer(){
        GameTime.timer = setInterval(() => GameTime.time--, 1000);
    }

    /**
     * Stops timer
     */
    public static stopTimer(){
        clearInterval(GameTime.timer);
    }
    
    /**
     * Returns time in seconds
     */
    public static returnTime(): number {
        return GameTime.time;
    }

    /**
     * Returns time in formated string
     */
    public static returnTimeFormatted(): string {
        let min: number = Math.floor(GameTime.time / 60);
        let sec: number | string = GameTime.time % 60

        // convert 3:5 to 3:05 
        if(sec < 10) 
            sec = "0" + sec;

        return `${min}:${sec}`;
    }

    /**
     * Removes time of timer
     * @param time Amount of seconds
     */
    public static removeTime(time: number) {
        GameTime.time = GameTime.time - time;
    }

    public static setTimerPos(top: boolean, right: boolean) {
        this.drawTop = top;
        this.drawRight = right;
    }

    public static drawTimer(game: Game) {
        const xPosRect: number = this.drawRight ? game.canvas.width -100  : 0;
        const yPosRect: number = this.drawTop   ? 0                       : game.canvas.height - 75;
        const xPosText: number = this.drawRight ? game.canvas.width - 25  : 80;
        const yPosText: number = this.drawTop   ? 50                      : game.canvas.height - 25;

        game.ctx.textAlign = "right";
        game.ctx.textBaseline = "bottom";
        game.ctx.strokeStyle = "black";
        game.ctx.font = "30px Arial";
        game.ctx.fillStyle = 'white';
        game.ctx.fillRect(xPosRect, yPosRect, 100, 75);
        game.ctx.fillStyle = 'black';
        game.ctx.fillText(GameTime.returnTimeFormatted(), xPosText, yPosText);
        game.ctx.rect(xPosRect, yPosRect, 100, 75);
        game.ctx.stroke(); 
    }
}