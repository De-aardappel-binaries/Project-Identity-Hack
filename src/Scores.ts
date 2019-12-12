// tslint:disable member-ordering

class Scores {
    
    public static player: string;
    public static score: number;
    public static highscores: Array<Highscore>;

    public constructor() {
        // TODO write a http request for public highscores list

        Scores.highscores = null;
    }

    /**
     * This function adds a new highscore to the list
     * @param highscore New Highscore
     */
    public addScore(highscore: Highscore): void {
        Scores.highscores.push(highscore);
    }

    // TODO write a push highscore list to public highscores list

}