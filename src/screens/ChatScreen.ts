// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class ChatScreen extends GameScreen {

    private Chats: Array<Chat> = [
        {
            chatName: 'Sindy',
            chatMessages: [
                { message: 'Hoi, hoe gaat het met jou?', self: true },
                { message: 'Hey, goed. Wie is dit?', self: false },
                { message: 'Ik ben Gerard, en wie ben jij?', self: true },
                { message: 'Sindy, maar wat moet je met mijn nummer?', self: false, groomerDetail: 1 }
            ]
        },
        {
            chatName: 'Abby',
            chatMessages: [
                { message: 'Hoi, hoe gaat het met jou?', self: true },
                { message: 'Ja, goed wie is dit?', self: false },
                { message: 'Mijn naam is Gerard. Wie ben jij?', self: true },
                { message: 'Abby, maar ken ik jou?', self: false },
                { message: 'Hoe heb je mijn nummer gevonden?', self: false, groomerDetail: 1 }
            ]
        },
        {
            chatName: 'Tessa',
            chatMessages: [
                { message: 'Hoi, hoe gaat het met je?', self: true },
                { message: 'Goed. Maar wie ben jij?', self: false },
                { message: 'Ik ben Gerard, aangenaam. :)', self: true },
                { message: 'Ik ken jou niet. Wat wil je van me?', self: false, groomerDetail: 1 }
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

        this.dialogueCharacter = new DialogueCharacter();

        // Create all buttons to select chat
        this.Chats.forEach((_, index) => {
            this.selectChatBtns.push(
                new UIButton(
                    this.game.canvas.width * 0.1,
                    (100 * (index)),
                    this.game.canvas.width * 0.2, 
                    100
                )
            );
        });

        // Create chat buttons
        this.createChatButtons();

        // count all hidden hints
        this.Chats.forEach((Chat: Chat) => {
            Chat.chatMessages.forEach((msg: ChatMessage) => {
                if (msg.groomerDetail)
                    this.hints++;
            });
        });

        this.dialogueCharacter.createDialogue(['Je hebt de chat app gevonden', 'je gaat nu zoeken naar info die kan helpen', 'klik op de berichten die belangrijk bewijs zijn', 'Veel geluk!']);
    }
    
    public draw(ctx: CanvasRenderingContext2D) {
        // Draw background screen
        ctx.fillStyle = '#ffffff';
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
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(
            this.game.canvas.width * 0.3,
            50, 
            this.game.canvas.width * 0.6, 
            this.game.canvas.height
        );
        ctx.fillStyle = '';

        // Draw Chat Users
        this.Chats.forEach((User: Chat, index: number) => {
            ctx.strokeStyle = "#afafaf";
            ctx.strokeRect(
                this.game.canvas.width * 0.1,
                (100 * (index)),
                this.game.canvas.width * 0.2, 
                100
            );
            if (index ===  this.currentChat) {
                ctx.fillStyle = '#f0f0f0';  
                ctx.fillRect(
                    this.game.canvas.width * 0.1,
                    (100 * (index)),
                    this.game.canvas.width * 0.2, 
                    100
                );
            }
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.font = "26px Arial";
            ctx.fillText(User.chatName, this.game.canvas.width * 0.1 + 10, (100 * (index + 1) - 60));
            ctx.fillStyle = "darkgray";
            ctx.font = "18px Arial";
            ctx.fillText(User.chatMessages[0].message, this.game.canvas.width * 0.1 + 10, (100 * (index + 1) - 30));
        })

        // Draw hints
        ctx.fillStyle = "black";
        ctx.strokeRect(
            this.game.canvas.width * 0.1,
            this.game.canvas.height - 50,
            this.game.canvas.width * 0.2, 
            50
        );
        ctx.fillText(
            `Hints over: ${this.hints}`,
            this.game.canvas.width * 0.1 + 15,
            this.game.canvas.height - 15
        )

        // Draw Current chat
        // Title
        ctx.fillStyle = "black";
        ctx.font = "26px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(this.Chats[this.currentChat].chatName, this.game.canvas.width * 0.3 + 10, 25);

        // Chat
        ctx.font = "16px Arial";
        ctx.textBaseline = "top";
        this.Chats[this.currentChat].chatMessages.forEach((ChatMessage: ChatMessage, index: number) => {
            if(ChatMessage.self) {
                // Draw message if self typed
                ctx.fillStyle = 'lightgreen';
                ctx.fillRect(this.game.canvas.width * 0.9 - 390 , (50 * index) + 60, 380, 40);
                ctx.fillStyle = 'black';
                ctx.fillText(ChatMessage.message, this.game.canvas.width * 0.9 - 385 , (50 * index) + 64);
            } else {
                // Draw message if other person typed
                ctx.fillStyle = 'lightgray';
                ctx.fillRect(this.game.canvas.width * 0.3 + 30, (50 * index) + 60, 380, 40);
                ctx.fillStyle = 'black';
                ctx.fillText(ChatMessage.message, this.game.canvas.width * 0.3 + 35, (50 * index) + 64);
            }
        });

        this.dialogueCharacter.drawCharacter(ctx, this.game.canvas);
    }

    public listen(input: UserInput) {
        const isPressed = input.GetMousePressed();
        this.dialogueCharacter.nextDialogueHandler(isPressed);
        
        if(isPressed) {
            this.selectChatBtns.forEach((selectBtn, index) => {
                if(selectBtn.checkIfPressed(isPressed)) {
                    this.currentChat = index;
                    this.createChatButtons();
                }
            });

            this.chatBtns.forEach((Btn, index) => {
                if(Btn.checkIfPressed(isPressed))
                    if(this.Chats[this.currentChat].chatMessages[index]) {

                        if(this.Chats[this.currentChat].chatMessages[index].groomerDetail === 1) {

                            this.dialogueCharacter.createDialogue(['Je hebt een goed detail gevonden']);
                            this.Chats[this.currentChat].chatMessages[index].groomerDetail = 2;
                            this.hints--;

                        } else if(this.Chats[this.currentChat].chatMessages[index].groomerDetail === 2) {

                            this.dialogueCharacter.createDialogue(['Je hebt hier al op gedrukt']);

                        } else {

                            this.dialogueCharacter.createDialogue(['Dit is geen waardevolle info', 'Dit gaat van je tijd af']);
                            this.Chats[this.currentChat].chatMessages[index].groomerDetail = 2;
                            GameTime.removeTime(30);

                        }

                        if(this.hints === 0) {
                            this.nextScreen = true;
                        }
                    }
            });
        }
    }

    private createChatButtons() {
        this.chatBtns = [];
        
        this.Chats[this.currentChat].chatMessages.forEach((ChatMessage: ChatMessage, index: number) => {
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

interface Chat {
    chatName: string,
    chatMessages: ChatMessage[]
}

interface ChatMessage {
    message: string,
    self: boolean,
    groomerDetail?: number
}