class instructionMenu{

    private game: Game;
    private timer : number;
    private background : Sprite;

    private knoppen : any;
    private y: number;

    //Instructie menu
    private scrollBackButton : Sprite;
    private backButton: Sprite;
    private instructionImage : Sprite;
    private keyObjects = new Array(255);
    private bigTimer: number;
    private backButtonAnimation: boolean;

    constructor(g:Game) {
        this.timer = 0;
        this.knoppen = 0;
        this.y = 0;
        this.game = g;
        this.background = new Sprite(0,0,0,0,0,innerWidth,innerHeight,"../assets/background.png",0,"background",0, true);
        this.instructionImage = new Sprite(window.innerWidth/2-325,window.innerHeight/2-350,0,0,0,650,520,"../assets/instructies.png",0,"instructions",0, true)
        this.game.started = true;
        this.bigTimer = 0;
        this.backButtonAnimation = false
        //Instruction menu
        this.backButton = new Sprite(innerWidth/2-40,innerHeight/2+215,0,0,0,100,100,"",0,"h2",0, true);
        this.scrollBackButton = new Sprite(innerWidth/2-150,innerHeight/2+200,0,0,0,300,100,"../assets/Parchment-Roll.png",0,"scroll",0, true);


        this.backButton.div.innerHTML = "Terug";

        for (var i = 0; i < this.keyObjects.length; i++)
        {
            this.keyObjects[i] = false;
        }


        this.background.draw();
        this.scrollBackButton.draw();
        this.instructionImage.draw();
        this.backButton.draw();

        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));

        this.knoppen = document.getElementsByTagName("H2");
        this.knoppen[0].classList.add("selected")

        this.scrollBackButton.div.classList.add("animated","fadeInUpBig");
        this.backButton.div.classList.add("animated","fadeInUpBig");

        this.instructionImage.div.classList.add("animated","fadeInUpBig");

        this.scrollBackButton.div.style.webkitAnimationDuration = "2s";
        this.scrollBackButton.div.style.webkitAnimationDelay = "2s";
        this.backButton.div.style.webkitAnimationDuration = "2s";
        this.backButton.div.style.webkitAnimationDelay = "2s";

        this.instructionImage.div.style.webkitAnimationDuration = "1s";
        this.instructionImage.div.style.webkitAnimationDelay = "1s";

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
                this.y = this.knoppen.length-1
            }
            this.knoppen[this.y].classList.add("selected");
            this.timer = 0
        }
        if (this.keyObjects[40] == true) {
            this.knoppen[this.y].className = "";
            this.y++;
            if (this.y == this.knoppen.length) {
                this.y = 0
            }
            this.knoppen[this.y].classList.add("selected");
            this.timer = 0
        }
    }
    public update(){
        this.timer++;
        this.bigTimer++;
        if (this.bigTimer > 300) {
            if (this.timer > 10) {
                this.highlightButtons()
                if (this.keyObjects[32] == true) {
                    if (document.getElementsByClassName("selected")[0].innerHTML == "Terug"){
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.backButtonAnimation = true;
                        this.timer = 0;
                        this.bigTimer = 0
                    }
                }
            }
        }
        if (this.timer > 150){
            if (this.backButtonAnimation == true){
                this.game.startMenu()
            }
        }
    }
    private removeClasses(){
        this.scrollBackButton.div.classList.remove("animated","fadeInUpBig");
        this.backButton.div.classList.remove("animated","fadeInUpBig");

        this.instructionImage.div.classList.remove("animated","fadeInUpBig");
    }
    private addFadeDownClasses(){
        this.scrollBackButton.div.classList.add("animated","fadeOutDownBig");
        this.backButton.div.classList.add("animated","fadeOutDownBig");

        this.instructionImage.div.classList.add("animated","fadeOutDownBig");

        this.scrollBackButton.div.style.webkitAnimationDuration = "2s";
        this.scrollBackButton.div.style.webkitAnimationDelay = "1s";
        this.backButton.div.style.webkitAnimationDuration = "2s";
        this.backButton.div.style.webkitAnimationDelay = "1s";

        this.instructionImage.div.style.webkitAnimationDuration = "2s";
        this.instructionImage.div.style.webkitAnimationDelay = "2s";
    }
}
