// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class EndScoreScreen extends GameScreen {
    public player: string;
    public score: number;
    public highscores: Array<any>;
    private scores: Scores;

    constructor(game: Game) {
        super(game);

        this.scores = new Scores();
    }

    public addScore(player: string, score: number,){
        
    }
}