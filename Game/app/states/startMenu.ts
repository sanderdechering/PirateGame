class startMenu{

    private game: Game;
    private smallTimer : number;
    private bigTimer : number;
    private background : Sprite;
    private knoppen : any;
    private y: number;

    //Start menu
    private scrollStartButton : Sprite;
    private scrollInstructionButton : Sprite;
    private startGameButton: Sprite;
    private instructionButton: Sprite;
    private keyObjects = new Array(255);

    private timer : number;
    private difficultyMenuReady : boolean;
    private instructionMenuReady : boolean;

    constructor(g:Game) {
        this.smallTimer = 0;
        this.bigTimer = 0;
        this.knoppen = 0;
        this.y = 0;
        this.game = g;
        this.game.theme.play();
        this.background = new Sprite(0,0,0,0,0,innerWidth,innerHeight,"../assets/background.png",0,"background",0, true);
        this.timer = 0;
        this.difficultyMenuReady = false;
        this.instructionMenuReady = false;
        //Start menu
        this.scrollStartButton = new Sprite(innerWidth/2-150,innerHeight/2-100,0,0,0,300,100,"../assets/Parchment-Roll.png",0,"scroll",0, true);
        this.scrollInstructionButton = new Sprite(innerWidth/2-150,innerHeight/2,0,0,0,300,100,"../assets/Parchment-Roll.png",0,"scroll",0, true);

        this.startGameButton = new Sprite(innerWidth/2-20,innerHeight/2-85,0,0,0,100,100,"",0,"h2",0, true);
        this.instructionButton = new Sprite(innerWidth/2-45,innerHeight/2+15,0,0,0,100,100,"",0,"h2",0, true);
        this.startGameButton.div.innerHTML = "Play";
        this.instructionButton.div.innerHTML = "Instructies";



        for (var i = 0; i < this.keyObjects.length; i++)
        {
            this.keyObjects[i] = false;
        }
        this.background.draw();
        this.scrollStartButton.draw();
        this.scrollInstructionButton.draw();
        this.startGameButton.draw();
        this.instructionButton.draw();

        if (this.game.started == false){
            this.background.div.classList.add("animated","fadeIn");
            this.background.div.style.webkitAnimationDuration = "2s";
        }

        this.scrollStartButton.div.classList.add("animated","fadeInUpBig");
        this.startGameButton.div.classList.add("animated","fadeInUpBig");

        this.scrollInstructionButton.div.classList.add("animated","fadeInUpBig");
        this.instructionButton.div.classList.add("animated","fadeInUpBig");

        this.scrollStartButton.div.style.webkitAnimationDuration = "2s";
        this.scrollStartButton.div.style.webkitAnimationDelay = "1s";
        this.startGameButton.div.style.webkitAnimationDuration = "2s";
        this.startGameButton.div.style.webkitAnimationDelay = "1s";

        this.scrollInstructionButton.div.style.webkitAnimationDuration = "2s";
        this.scrollInstructionButton.div.style.webkitAnimationDelay = "2s";
        this.instructionButton.div.style.webkitAnimationDuration = "2s";
        this.instructionButton.div.style.webkitAnimationDelay = "2s";

        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));

        this.knoppen = document.getElementsByTagName("H2");
        this.knoppen[0].classList.add("selected")
    }
    public update(){
        this.smallTimer++;
        this.bigTimer++;
        this.timer++;
        if (this.bigTimer > 250){
            if (this.smallTimer > 10) {
                this.highlightButtons()
                if (this.keyObjects[32] == true) {
                    if (document.getElementsByClassName("selected")[0].innerHTML == "Play"){
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.difficultyMenuReady = true;
                        this.timer = 0;
                        this.bigTimer = 0
                    }
                    if (document.getElementsByClassName("selected")[0].innerHTML == "Instructies"){
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.instructionMenuReady = true;
                        this.timer = 0;
                        this.bigTimer = 0
                    }
                }
            }
        }
        if (this.timer > 150){
            if (this.difficultyMenuReady == true){
                this.game.difficultyMenu()
            }
            if (this.instructionMenuReady == true){
                this.game.instructionMenu()
            }
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
    private highlightButtons(){
        if (this.keyObjects[38] == true) {
            this.knoppen[this.y].className = "";
            this.y--;
            if (this.y < 0) {
                this.y = this.knoppen.length-1;
            }
            this.knoppen[this.y].classList.add("selected");
            this.smallTimer = 0;
        }
        if (this.keyObjects[40] == true) {
            this.knoppen[this.y].className = "";
            this.y++;
            if (this.y == this.knoppen.length) {
                this.y = 0
            }
            this.knoppen[this.y].classList.add("selected");
            this.smallTimer = 0
        }
    }
    private removeClasses(){
        this.scrollStartButton.div.classList.remove("animated","fadeInUpBig");
        this.startGameButton.div.classList.remove("animated","fadeInUpBig");

        this.scrollInstructionButton.div.classList.remove("animated","fadeInUpBig");
        this.instructionButton.div.classList.remove("animated","fadeInUpBig");
    }
    private addFadeDownClasses(){
        this.scrollStartButton.div.classList.add("animated","fadeOutDownBig");
        this.startGameButton.div.classList.add("animated","fadeOutDownBig");

        this.scrollInstructionButton.div.classList.add("animated","fadeOutDownBig");
        this.instructionButton.div.classList.add("animated","fadeOutDownBig");

        this.scrollStartButton.div.style.webkitAnimationDuration = "2s";
        this.scrollStartButton.div.style.webkitAnimationDelay = "1s";
        this.startGameButton.div.style.webkitAnimationDuration = "2s";
        this.startGameButton.div.style.webkitAnimationDelay = "1s";

        this.scrollInstructionButton.div.style.webkitAnimationDuration = "2s";
        this.instructionButton.div.style.webkitAnimationDuration = "2s";
    }

}
