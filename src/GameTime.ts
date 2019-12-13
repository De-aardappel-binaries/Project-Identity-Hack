// tslint:disable member-ordering

class GameTime {
<<<<<<< HEAD
=======

>>>>>>> 004bb6c7690bf27f31f6f5c7837ea4ddfab89397
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

<<<<<<< HEAD
    public static returnTime(): String {
        return Math.floor(GameTime.time / 60) + ':' + GameTime.time % 60;
=======
    /**
     * Removes time of timer
     * @param time Amount of seconds
     */
    public static removeTime(time: number) {
        GameTime.time = GameTime.time - time;
>>>>>>> 004bb6c7690bf27f31f6f5c7837ea4ddfab89397
    }
}