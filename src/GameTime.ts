// tslint:disable member-ordering

class GameTime {

    private static time: number;

    private static timer: number;

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
}