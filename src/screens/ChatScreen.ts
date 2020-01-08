// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class ChatScreen extends GameScreen {

    private chats: Array<Chat> = [
        {
            chatName: 'Cindy',
            chatMessages: [
                { message: 'Hoi, hoe gaat het met jou?', self: true },
                { message: 'Hey, goed. Wie is dit?', self: false },
                { message: 'Ik ben Gerard, en wie ben jij?', self: true, groomerDetail: 1 },
                { message: 'Cindy, maar wat moet je met mijn nummer?', self: false }
            ]
        },
        {
            chatName: 'Abby',
            chatMessages: [
                { message: 'Ga je nu nog die foto\'s doorsturen?', self: true },
                { message: 'Nee, ik heb dat al vaker gestuurd?', self: false },
                { message: 'Alsjeblieft?', self: true },
                { message: '< U bent geblokkeerd >', self: false }
            ]
        },
        {
            chatName: 'Tessa',
            chatMessages: [
                { message: 'He! doe is ff normaal met mijn vriendin!', self: false },
                { message: 'Wat bedoel je, ben je de vriendin van Cindy ofzo?', self: true, groomerDetail: 1 },
                { message: 'Ja, laat haar met rust ofzo!', self: false },
                { message: 'Gek!', self: false }
            ]
        },
        {
            chatName: 'Piet',
            chatMessages: [
                { message: 'He, gozer', self: true },
                { message: 'Vanavond bij mij chillen?', self: true },
                { message: 'Ja is goed, kan je je adres nog eens door sturen?', self: false },
                { message: 'Steenstraat 69', self: true, groomerDetail: 1 },
                { message: 'Oké tot vanavond', self: false }
            ]
        }
    ];
    private currentChat: number = 0;
    private hints: number = 0;

    private dialogueCharacter: DialogueCharacter;

    private selectChatBtns: UIButton[] = [];
    private chatBtns: UIButton[] = [];

    private nextScreen: boolean;
    
    constructor(game: Game) {
        super(game);

        GameTime.setTimerPos(true, true);

        this.dialogueCharacter = new DialogueCharacter();

        // Create all buttons to select chat
        this.chats.forEach((_, index) => {
            this.selectChatBtns.push(
                new UIButton(
                    this.game.canvas.width * 0.1,
                    (100 * (index)),
                    this.game.canvas.width * 0.2, 
                    100
                )
            );
        });

        //document.getElementById('body').style.backgroundImage = 'url("https://c.pxhere.com/images/94/4c/e8df4e75da76e5d18ec73ce3f1aa-1575607.jpg!d")';
        document.getElementById('body').style.backgroundImage = 'url("./assets/images/bg.png")';

        // Create chat buttons
        this.createChatButtons();

        // count all hidden hints
        this.chats.forEach((Chat: Chat) => {
            Chat.chatMessages.forEach((msg: ChatMessage) => {
                if (msg.groomerDetail)
                    this.hints++;
            });
        });

        this.dialogueCharacter.createDialogue([
            'Je hebt de chat app gevonden. Je gaat nu zoeken\nnaar info die kan helpen met het vinden van\nde dader en het slachtoffer. Klik op de berichten\ndie belangrijk bewijs zijn. Linksonder staat het\naantal bewijsstukken die je nog moet verzamelen.\nBij een fout antwoord gaat er 30 seconden van je\ntijd af.\n\nVeel succes!'
        ]);
    }
    
    public draw(ctx: CanvasRenderingContext2D) {
        // Draw background screen
        ctx.fillStyle = 'rgba(64,64,64,1)';
        ctx.fillRect(
            this.game.canvas.width * 0.1,
            0, 
            this.game.canvas.width * 0.2, 
            this.game.canvas.height
        );
        ctx.fillRect(
            this.game.canvas.width * 0.3,
            0, 
            this.game.canvas.width * 0.6, 
            50
        );
        ctx.fillStyle = 'rgba(15,15,15,0.8)';
        ctx.fillRect(
            this.game.canvas.width * 0.3,
            50, 
            this.game.canvas.width * 0.6, 
            this.game.canvas.height
        );
        ctx.fillStyle = '';

        // Draw Chat Users
        this.chats.forEach((User: Chat, index: number) => {
            ctx.strokeStyle = 'rgba(175,175,175,1)';
            ctx.strokeRect(
                this.game.canvas.width * 0.1,
                (100 * (index)),
                this.game.canvas.width * 0.2, 
                100
            );
            if (index ===  this.currentChat) {
                ctx.fillStyle = 'rgba(127,127,127,1)';
                ctx.fillRect(
                    this.game.canvas.width * 0.1,
                    (100 * (index)),
                    this.game.canvas.width * 0.2, 
                    100
                );
            }
            ctx.fillStyle = 'rgba(0,200,0,1)';
            ctx.textAlign = "left";
            ctx.font = "26px Arial";
            ctx.fillText(User.chatName, this.game.canvas.width * 0.1 + 10, (100 * (index + 1) - 60));
            ctx.fillStyle = 'rgba(0,0,0,1)';
            ctx.font = "18px Arial";
            ctx.fillText(User.chatMessages[0].message.substr(0,30) + (User.chatMessages[0].message.length > 30 ? '...' : ''), this.game.canvas.width * 0.1 + 10, (100 * (index + 1) - 30));
        })

        // Draw hints
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.strokeRect(
            this.game.canvas.width * 0.1,
            this.game.canvas.height - 50,
            this.game.canvas.width * 0.2, 
            50
        );
        ctx.fillText(
            `Bewijsstukken over: ${this.hints}`,
            this.game.canvas.width * 0.1 + 15,
            this.game.canvas.height - 15
        )

        // Draw Current chat
        // Title
        ctx.fillStyle = 'rgba(0,255,0,1)';
        ctx.font = "26px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(this.chats[this.currentChat].chatName, this.game.canvas.width * 0.3 + 10, 25);

        // Chat
        ctx.font = "16px Arial";
        ctx.textBaseline = "top";
        this.chats[this.currentChat].chatMessages.forEach((ChatMessage: ChatMessage, index: number) => {
            if(ChatMessage.self) {
                // Draw message if self typed
                ctx.fillStyle = 'rgba(127,127,127,1)';
                ctx.fillRect(this.game.canvas.width * 0.9 - 390 , (50 * index) + 60, 380, 40);
                ctx.fillStyle = 'rgba(255,255,255,1)';
                ctx.fillText(ChatMessage.message, this.game.canvas.width * 0.9 - 385 , (50 * index) + 64);
            } else {
                // Draw message if other person typed
                ctx.fillStyle = 'rgba(127,127,127,1)';
                ctx.fillRect(this.game.canvas.width * 0.3 + 30, (50 * index) + 60, 380, 40);
                ctx.fillStyle = 'rgba(0,0,0,1)';
                ctx.fillText(ChatMessage.message, this.game.canvas.width * 0.3 + 35, (50 * index) + 64);
            }
        });

        this.dialogueCharacter.drawCharacter(ctx, this.game.canvas);
    }

    public listen(input: UserInput) {
        let isPressed: Pos = input.GetMousePressed();
        isPressed = this.dialogueCharacter.nextDialogueHandler(isPressed);
        
        if(isPressed) {
            this.selectChatBtns.forEach((selectBtn, index) => {
                if(selectBtn.checkIfPressed(isPressed)) {
                    this.currentChat = index;
                    this.createChatButtons();
                }
            });

            this.chatBtns.forEach((Btn, index) => {
                if(Btn.checkIfPressed(isPressed))
                    if(this.chats[this.currentChat].chatMessages[index]) {

                        if(this.chats[this.currentChat].chatMessages[index].groomerDetail === 1) {

                            this.dialogueCharacter.createDialogue(['Je hebt een bewijsstuk gevonden!']);
                            this.chats[this.currentChat].chatMessages[index].groomerDetail = 2;
                            this.hints--;

                        } else if(this.chats[this.currentChat].chatMessages[index].groomerDetail === 2) {

                            this.dialogueCharacter.createDialogue(['Je hebt hier al op gedrukt!']);

                        } else {

                            this.dialogueCharacter.createDialogue(['Dit is helaas geen waardevolle info.']);
                            this.chats[this.currentChat].chatMessages[index].groomerDetail = 2;
                            GameTime.removeTime(30);

                        }

                        if(this.hints === 0) {
                            this.nextScreen = true;
                        }
                    }
            });
        }
    }

    /**
     * this function generates all buttons for the loaded chat window
     */
    private createChatButtons() {
        this.chatBtns = [];
        
        this.chats[this.currentChat].chatMessages.forEach((ChatMessage: ChatMessage, index: number) => {
            if(ChatMessage.self) {
                // Draw message if self typed
                this.chatBtns.push(new UIButton(this.game.canvas.width * 0.9 - 390 , (50 * index) + 60, 380, 40));
            } else {
                // Draw message if other person typed
                this.chatBtns.push(new UIButton(this.game.canvas.width * 0.3 + 30, (50 * index) + 60, 380, 40));
            }
        });
    }

    public adjust(game: Game) {
        if(this.nextScreen)
            game.switchScreen(new EndScoreScreen(game));
    }

}
