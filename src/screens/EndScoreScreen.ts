// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class EndScoreScreen extends GameScreen {
    private dialogeCharacter: DialogueCharacter;
    private highScoreList: Array<HighScoreList> = [];

    constructor(game: Game) {
        super(game);

        document.getElementById('body').style.backgroundImage = "url('./assets/images/Groomer_arrest.png')";

        // this.scores = new Scores();
        this.dialogeCharacter = new DialogueCharacter();
        this.dialogeCharacter.createDialogue([
            'Gefeliciteerd! je hebt gewonnen. De dader is opgepakt.\nDit is je score.']);
        
        GameTime.stopTimer();

        this.setHighScore(Game.username, GameTime.returnTime()).then(() => {
            this.getHighScores().then((res) => {
                this.highScoreList = res;
            }).catch((res) => {
                this.highScoreList = res;
            });
        }).catch(() => {
            console.error('failed to store highscore, server may be down...');
        })

    }

    public draw(ctx: CanvasRenderingContext2D) {
        // Draw boxes
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = 'rgba(0,255,0,1)';
        ctx.fillRect(this.game.canvas.width / 2 -250, 65, 500, 50);
        ctx.strokeRect(this.game.canvas.width / 2 -250, 65, 500, 50);

        // Draw Text
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.textBaseline = "middle";
        ctx.fillStyle = 'rgba(0,255,0,1)';
        ctx.fillText('Je score is: ' + GameTime.returnTime(), this.game.canvas.width / 2, 90); 

        if(this.highScoreList.length > 0)
            this.highScoreList.forEach((highscore, index) => {
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.strokeStyle = 'rgba(0,255,0,1)';
                ctx.fillRect(this.game.canvas.width / 2 -250, 150 + (54*index), 500, 50);
                ctx.strokeRect(this.game.canvas.width / 2 -250, 150 + (54*index), 500, 50);
                
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = 'rgba(0,255,0,1)';
                ctx.fillText(highscore.Name + ' : ' + highscore.Score, this.game.canvas.width / 2, 180 + (54*index)); 
            });

        // Draw dialogue character
        this.dialogeCharacter.drawCharacter(ctx, this.game.canvas);
        GameTime.stopTimer();
    }

    public listen(input: UserInput) {
        this.dialogeCharacter.nextDialogueHandler(input);
    }

    /**
     * this function gets the highscore list
     */
    private getHighScores():Promise<Array<HighScoreList>> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    try {
                        resolve(JSON.parse(this.responseText));
                    } catch (err) {
                        reject([{ HighScoreID: null, Name: 'error', Score: 0 }]);
                    }
                }
            });

            xhr.open("GET", "https://alexspelt.nl:81/api/groomerGame/HighScoresList");

            xhr.send();
        });
    }

    /**
     * This function adds the score to the scoreboard
     * @param name Name of plauer
     * @param score Score of player
     */
    private setHighScore(name: string, score: number):Promise<Object | undefined> {
        return new Promise((resolve, reject) => {
            let data = `name=${name}&score=${score}`;

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    const returnMsg = JSON.parse(this.responseText);
                    if(returnMsg.err) {
                        reject();
                    } else {
                        resolve();
                    }
                }
            });

            xhr.open("POST", "https://alexspelt.nl:81/api/groomerGame/NewHighscore");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.send(data);
        });
    }
}