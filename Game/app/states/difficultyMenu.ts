class difficultyMenu{

    private game: Game;
    private timer : number;
    private bigTimer : number;
    private animationTimer:number;
    private background : Sprite;

    private knoppen : any;
    private y: number;

    private scrollEasyButton : Sprite;
    private scrollMediumButton : Sprite;
    private scrollHardButton : Sprite;
    private easyButton: Sprite;
    private hardButton: Sprite;
    private mediumButton: Sprite;

    private scrollBackButton : Sprite;
    private backButton: Sprite;

    private keyObjects = new Array(255);
    private nextLevel : boolean;
    private terug : boolean;

    constructor(g:Game) {
        this.timer = 0;
        this.animationTimer = 0;
        this.knoppen = 0;
        this.y = 0;
        this.game = g;
        this.background = new Sprite(0,0,0,0,0,innerWidth,innerHeight,"../assets/background.png",0,"background",0, true);
        this.game.started = true;
        this.nextLevel = false;
        this.terug = false
        this.bigTimer = 0;

        //Difficulty menu
        this.scrollEasyButton = new Sprite(innerWidth/2-150,innerHeight/2-125,0,0,0,300,100,"../assets/Parchment-Roll.png",0,"scroll",0, true);
        this.scrollMediumButton = new Sprite(innerWidth/2-150,innerHeight/2-25,0,0,0,300,100,"../assets/Parchment-Roll.png",0,"scroll",0, true);
        this.scrollHardButton = new Sprite(innerWidth/2-150,innerHeight/2+75,0,0,0,300,100,"../assets/Parchment-Roll.png",0,"scroll",0, true);

        this.easyButton = new Sprite(innerWidth/2-40,innerHeight/2-110,0,0,0,100,100,"",0,"h2",0, true);
        this.mediumButton = new Sprite(innerWidth/2-45,innerHeight/2-10,0,0,0,100,100,"",0,"h2",0, true);
        this.hardButton = new Sprite(innerWidth/2-40,innerHeight/2+90,0,0,0,100,100,"",0,"h2",0, true);

        this.backButton = new Sprite(innerWidth/2-40,innerHeight/2+215,0,0,0,100,100,"",0,"h2",0, true);
        this.scrollBackButton = new Sprite(innerWidth/2-150,innerHeight/2+200,0,0,0,300,100,"../assets/Parchment-Roll.png",0,"scroll",0, true);

        this.easyButton.div.innerHTML = "Makkelijk";
        this.mediumButton.div.innerHTML = "Normaal";
        this.hardButton.div.innerHTML = "Moeilijk";
        this.backButton.div.innerHTML = "Terug";

        for (var i = 0; i < this.keyObjects.length; i++)
        {
            this.keyObjects[i] = false;
        }
        this.scrollEasyButton.div.style.webkitAnimationDuration = "2s";
        this.scrollEasyButton.div.style.webkitAnimationDelay = "1s";
        this.easyButton.div.style.webkitAnimationDuration = "2s";
        this.easyButton.div.style.webkitAnimationDelay = "1s";

        this.scrollMediumButton.div.style.webkitAnimationDuration = "2s";
        this.scrollMediumButton.div.style.webkitAnimationDelay = "2s";
        this.mediumButton.div.style.webkitAnimationDuration = "2s";
        this.mediumButton.div.style.webkitAnimationDelay = "2s";

        this.scrollHardButton.div.style.webkitAnimationDuration = "2s";
        this.scrollHardButton.div.style.webkitAnimationDelay = "3s";
        this.hardButton.div.style.webkitAnimationDuration = "2s";
        this.hardButton.div.style.webkitAnimationDelay = "3s";

        this.scrollBackButton.div.style.webkitAnimationDuration = "2s";
        this.scrollBackButton.div.style.webkitAnimationDelay = "4s";
        this.backButton.div.style.webkitAnimationDuration = "2s";
        this.backButton.div.style.webkitAnimationDelay = "4s";

        this.scrollEasyButton.div.classList.add("animated","fadeInUpBig");
        this.scrollMediumButton.div.classList.add("animated","fadeInUpBig");
        this.scrollHardButton.div.classList.add("animated","fadeInUpBig");
        this.scrollBackButton.div.classList.add("animated","fadeInUpBig");

        this.easyButton.div.classList.add("animated","fadeInUpBig");
        this.mediumButton.div.classList.add("animated","fadeInUpBig");
        this.hardButton.div.classList.add("animated","fadeInUpBig");
        this.backButton.div.classList.add("animated","fadeInUpBig");

        this.background.draw();
        this.scrollEasyButton.draw();
        this.scrollMediumButton.draw();
        this.scrollHardButton.draw();
        this.scrollBackButton.draw();

        this.easyButton.draw();
        this.mediumButton.draw();
        this.hardButton.draw();
        this.backButton.draw();

        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));

        this.knoppen = document.getElementsByTagName("H2");
        this.knoppen[0].classList.add("selected")

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
            this.knoppen[this.y].classList.remove("selected")
            this.y--;
            if (this.y < 0) {
                this.y = this.knoppen.length-1
            }
            this.knoppen[this.y].classList.add("selected");
            this.timer = 0
        }
        if (this.keyObjects[40] == true) {
            this.knoppen[this.y].classList.remove("selected")
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
        this.animationTimer++;
        this.bigTimer++;
        if (this.bigTimer > 375){
            if (this.timer > 10) {
                this.highlightButtons()
                if (this.keyObjects[32] == true) {
                    if(document.getElementsByClassName("selected")[0].innerHTML == "Terug"){
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.terug = true;
                        this.animationTimer = 0;
                        this.bigTimer = 0
                    }else{
                        this.game.difficulty = document.getElementsByClassName("selected")[0].innerHTML;
                        this.removeClasses();
                        this.addFadeDownClasses();
                        this.nextLevel = true;
                        this.animationTimer = 0;
                        this.bigTimer = 0
                    }
                }
            }
        }
        if (this.animationTimer > 250){
            if (this.terug == true){
                this.game.startMenu()
            }
            if (this.nextLevel == true){
                this.game.level_1a()
            }
        }
    }
    private removeClasses(){
        this.scrollEasyButton.div.classList.remove("animated","fadeInUpBig");
        this.scrollMediumButton.div.classList.remove("animated","fadeInUpBig");
        this.scrollHardButton.div.classList.remove("animated","fadeInUpBig");
        this.scrollBackButton.div.classList.remove("animated","fadeInUpBig");

        this.easyButton.div.classList.remove("animated","fadeInUpBig");
        this.mediumButton.div.classList.remove("animated","fadeInUpBig");
        this.hardButton.div.classList.remove("animated","fadeInUpBig");
        this.backButton.div.classList.remove("animated","fadeInUpBig");
    }
    private addFadeDownClasses(){
        this.scrollEasyButton.div.classList.add("animated","fadeOutDownBig");
        this.scrollMediumButton.div.classList.add("animated","fadeOutDownBig");
        this.scrollHardButton.div.classList.add("animated","fadeOutDownBig");
        this.scrollBackButton.div.classList.add("animated","fadeOutDownBig");

        this.easyButton.div.classList.add("animated","fadeOutDownBig");
        this.mediumButton.div.classList.add("animated","fadeOutDownBig");
        this.hardButton.div.classList.add("animated","fadeOutDownBig");
        this.backButton.div.classList.add("animated","fadeOutDownBig");

        this.scrollEasyButton.div.style.webkitAnimationDuration = "2s";
        this.scrollEasyButton.div.style.webkitAnimationDelay = "4s";
        this.easyButton.div.style.webkitAnimationDuration = "2s";
        this.easyButton.div.style.webkitAnimationDelay = "4s";

        this.scrollMediumButton.div.style.webkitAnimationDuration = "2s";
        this.scrollMediumButton.div.style.webkitAnimationDelay = "3s";
        this.mediumButton.div.style.webkitAnimationDuration = "2s";
        this.mediumButton.div.style.webkitAnimationDelay = "3s";

        this.scrollHardButton.div.style.webkitAnimationDuration = "2s";
        this.scrollHardButton.div.style.webkitAnimationDelay = "2s";
        this.hardButton.div.style.webkitAnimationDuration = "2s";
        this.hardButton.div.style.webkitAnimationDelay = "2s";

        this.scrollBackButton.div.style.webkitAnimationDuration = "2s";
        this.scrollBackButton.div.style.webkitAnimationDelay = "1s";
        this.backButton.div.style.webkitAnimationDuration = "2s";
        this.backButton.div.style.webkitAnimationDelay = "1s";
    }
}