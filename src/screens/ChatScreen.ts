// tslint:disable member-ordering
/// <reference path="../GameScreen.ts"/>

class ChatScreen extends GameScreen {

    private Chats: Array<Array<ChatMessage>>;
    
    constructor(game: Game) {
        super(game);
    }
    
    public draw(ctx: CanvasRenderingContext2D) {
        // Draw background screen
        ctx.fillStyle = 'white';
        ctx.fillRect(
            this.game.canvas.width * 0.1,
            0, 
            this.game.canvas.width * 0.8, 
            this.game.canvas.height
        );
        ctx.fillStyle = '';
    }

}

interface ChatMessage {
    message: string,
    self: boolean
}