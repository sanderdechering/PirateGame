
class Victory {

    private game:Game
    private gameOver:Sprite
    private keyObjects  = new Array(255);


    constructor(g: Game) {
        this.game = g
        this.gameOver = new Sprite(window.innerWidth/2-150,window.innerHeight/2-100,0,0,0,80,300,"../assets/cup.png",0,"h1",0,false)
        this.gameOver.div.innerHTML = "Game Over";
        this.gameOver.div.style.textAlign = "center";
        this.gameOver.draw();
        this.game.won.play();
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