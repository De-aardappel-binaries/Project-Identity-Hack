// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class HackGroomerScreen extends GameScreen{
    
    private readonly grid: number = 10;
    private readonly buttonSize: number = 50;
    private gridButton: Array<Array<UIButton>> = [];


    private abc: Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    private password = ['groomer', 'deepfake', 'hacking', 'wifi'];
    private charactersFound: Array<string> = [];
    private currentPassword: string;
    private startPoint: Pos;

    constructor(game: Game) {
        super(game);
        
        this.currentPassword = this.password[Math.floor(Math.random()*(this.password.length-1))];

        this.startPoint = { 
            xPos: (game.canvas.width - (this.buttonSize * this.grid)) / 2, 
            yPos: 200
        }
        this.randomizeString();
        // randomize hier de abc string

        for(let y = 0; y < this.grid; y++) {
            this.gridButton[y] = [];
            for(let x = 0; x < this.grid; x++) {
                this.gridButton[y][x] = new UIButton(
                    this.startPoint.xPos + (x * this.buttonSize), 
                    this.startPoint.yPos + (y * this.buttonSize),
                    this.buttonSize,
                    this.buttonSize
                );
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // Draw Password crack bar
        const barHeight = 50;

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.fillRect(
            this.startPoint.xPos,
            this.startPoint.yPos - 70,
            (this.grid * this.buttonSize),
            barHeight
        );
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.fillText(this.getPassword(), this.startPoint.xPos + 10, this.startPoint.yPos - 70 + (barHeight/2));
        
        // Draw grid
        let count = 0;
        for(let y = 0; y < this.grid; y++) {
            for(let x = 0; x < this.grid; x++) {
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.fillRect(
                    this.startPoint.xPos + (x * this.buttonSize), 
                    this.startPoint.yPos + (y * this.buttonSize),
                    this.buttonSize,
                    this.buttonSize
                );
                ctx.strokeRect(
                    this.startPoint.xPos + (x * this.buttonSize), 
                    this.startPoint.yPos + (y * this.buttonSize),
                    this.buttonSize,
                    this.buttonSize
                );
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    this.abc[count],
                    this.startPoint.xPos + (x * this.buttonSize) + (this.buttonSize/2), 
                    this.startPoint.yPos + (y * this.buttonSize) + (this.buttonSize/2)
                );

                if(this.abc.length-1 == count)
                    count = 0;
                else
                    count++;
            }
        }
    }

    private getPassword(): string {
        let dissectPassword =  this.currentPassword.split("");
        
        dissectPassword = dissectPassword.map((passChar) => {
            for(let i = 0; i < this.charactersFound.length; i++) {
                if(passChar === this.charactersFound[i]) {
                    return passChar;
                }
            }
            return '*'
        });

        return dissectPassword.join('');
    }

    private randomizeString(){
        for (let i = 0; i < 50; i++) {
            let firstRandomizer = Math.round((this.abc.length -1) * Math.random());
            let secondRandomizer = Math.round((this.abc.length -1) * Math.random());
            let temp = this.abc[firstRandomizer];
            this.abc[firstRandomizer] = this.abc[secondRandomizer];
            this.abc[secondRandomizer] = temp;  
        }
    }

    public listen(input: UserInput){
        const isPressed: Pos = input.GetMousePressed();
        let count: number = 0;
        if(isPressed) {
            for(let y: number = 0; y < this.grid; y++) {
                for(let x: number = 0; x < this.grid; x++) {
                    if(this.gridButton[y][x].checkIfPressed(isPressed)) {
                        // Check if already pressed
                        let isDuplicate = false;
                        let isCharacterFound = false;
                        if(this.charactersFound.length > 0)
                            this.charactersFound.forEach((Char) => {
                                if(this.abc[count] === Char) {
                                    isDuplicate = true;
                                    return;
                                }
                            });

                        for(let i = 0; i < this.currentPassword.length; i++) {
                            console.log(this.currentPassword[i], this.abc[count]);
                            if(this.currentPassword[i] === this.abc[count]) {
                                isCharacterFound = true;
                            }
                        }
                        
                        if(!isDuplicate)
                            this.charactersFound.push(this.abc[count]);

                        if(!isCharacterFound)
                            GameTime.removeTime(5);

                        return;
                    }
 
                    if(this.abc.length-1 == count)
                        count = 0;
                    else
                        count++;
                }
            }
        }
    }

    public adjust(game: Game) {
        if(this.getPassword() == this.currentPassword) {
            game.switchScreen(new FakeProfileScreen(game));
        }
    }
}