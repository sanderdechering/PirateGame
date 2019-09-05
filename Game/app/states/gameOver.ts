
class GameOver {

    private game:Game
    private background:Sprite
    private keyObjects  = new Array(255);
    private gameOver : Sprite;

    constructor(g: Game) {
        this.game = g
        this.background = new Sprite(0,0,0,0,0,window.innerWidth,window.innerHeight,"../assets/klaar3.png",0,"background",0,false)
        this.gameOver = new Sprite(window.innerWidth/2-150,window.innerHeight/2-50,0,0,0,300,30,"#fff",0,"h1",0,false)
        this.gameOver.div.innerHTML = "Game Over";
        this.gameOver.div.style.textAlign = "center";
        this.background.draw();
        this.gameOver.draw();

        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));

    }
    public update() {
        if (this.keyObjects[32]) {
            this.game.startMenu()
        }
    }
    private keyDownHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = true;
    }

    private keyUpHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = false;
    }

}