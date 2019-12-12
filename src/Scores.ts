// tslint:disable member-ordering

class Scores {
    
    public static player: string;
    public static score: number;
    public static highscores: Array<Highscore>;

    public constructor() {
        Scores.highscores = null;
    }

    public addScore(highscore: Highscore): void {
        Scores.highscores.push();
    }

}