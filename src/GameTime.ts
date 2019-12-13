// tslint:disable member-ordering

class GameTime {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private static time: number;

    private static timer: any;

    public constructor(time: number){
        GameTime.time = time;
    }

    public static startTimer(){
        GameTime.timer = setInterval(() => GameTime.time--, 1000);
    }
    public static stopTimer(){
        clearInterval(GameTime.timer);
    }

    public static returnTime() {
        return Math.floor(GameTime.time / 60) + ':' + GameTime.time % 60;
    }
}