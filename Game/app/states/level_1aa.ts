class Level_1aa{

    private game:Game;
    private zeus:Sprite;
    private boat : Sprite;
    private pirate:Sprite;
    private dialoog:Dialoog;
    private background:Sprite;
    private backgroundOverlay:Sprite;

    private text:any;
    private timer : number = 0;
    private smalltimer : number = 0;
    private endAnimationsPirate : boolean = false;
    private endAnimationsZeus : boolean = false;
    private timer_nextlevel : number = 0;
    private timer_nextlevelBoolean : boolean = false;

    private keyObjects  = new Array(255);


    constructor(g:Game) {

        this.game = g;
        this.boat = new Sprite(200, 335, 0, 0, 0, 225, 225, "../assets/1s.png", false, "boat", 0, true);
        this.zeus = new Sprite(600, 0, 0, 0, 0, 400, 400, "../assets/zeusthunder.png", 0, "zeus", 0, true);
        this.pirate = new Sprite(300, 455, 0, 0, 0, 50, 50, "../assets/piraat.gif", 0, "pirate", 0, true);
        this.dialoog = new Dialoog(window.innerWidth/2-window.innerWidth/4*1.5, window.innerHeight/2*1.35, window.innerWidth/4*2.75, 200, "dialoog");
        this.background = new Sprite(0, 0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/1.png", 0, "background", 0, true);
        this.backgroundOverlay = new Sprite(0, 0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/overlayBackground.png", 0, "background", 0, true);
        this.text =
            ['<p>ZEUS: <br> Wat ben jij aan het doen naar rum ruikende man!</p>',
                '<p> ZEUS: <br> WEET JE WEL NIET WIE IK BEN?',
                '<p> PIRAAT PIET: <br> uhhhh.. *hik*</p>',
                '<p> ZEUS: <br> STERF JIJ AARDLING, IK BEN ZEUS DE GOD VAN ALLE GODEN. </p>',
                '<p> WAT IK KAN DOEN MET MIJN BLIKSEM EN DONDER ZAL JE NOOIT KUNNEN BEGRIJPEN </p>',
                '<p> PIRAAT PIET: <br> Als je de schatten onbewaakt achter laat, kan ik er ook niets aan doen dat<br> ik ze wil stelen. IK WIL JOUW ADELAAR EN DONDERKEIL!!! </p>',
                '<p>ZEUS: <br> Hoe durf jij mijn goddelijke schatten te STELEN SCHAVUIT?! <br>JE WEET NIET EENS HOE KRACHTIG MIJN SCHATTEN ZIJN! DE ADELAAR<br> IS MIJN HEILIGE VOGEL EN DE DONDERKEIL ZAL JOU<br> DE MACHT GEVEN OVER DONDER EN BLIKSEM </p>',
                '<p>PIRAAT PIET: <br> *hik* Wacht maar !! ik ben de aller gevaarlijkste piraat <br>in het universum! ZEUS de oppergod WHAHAHA laat me niet  lachen..</p>',
                '<p>ZEUS: <br> IK ZAL JE EEN LES LEREN RUM DRINKENDE STINK PIRAAT! AAAAAAAAAAAHHHHHH</p>'
            ];

        this.dialoog.submitDialoog(this.text);
        this.background.draw();
        this.zeus.draw();
        this.backgroundOverlay.draw();
        this.boat.draw();
        this.dialoog.draw();
        this.pirate.draw();

        this.background.div.style.webkitAnimationDuration = "2s";
        this.backgroundOverlay.div.style.webkitAnimationDuration = "2s";

        this.boat.div.style.webkitAnimationDuration = "20s";
        this.pirate.div.style.webkitAnimationDuration = "5s";

        this.dialoog.bubble.div.style.webkitAnimationDelay = "6s";
        this.dialoog.bubble.div.style.webkitAnimationDuration = "4s";

        this.zeus.div.style.webkitAnimationDelay = "1s";
        this.zeus.div.style.webkitAnimationDuration = "7s";

        this.boat.div.style.webkitAnimationDuration = "5s";
        this.pirate.div.style.webkitAnimationDuration = "5s";

        this.zeus.div.classList.add("animated","fadeInUpBig");
        this.background.div.classList.add("animated","fadeIn");
        this.boat.div.classList.add("animated","fadeInLeftBig");
        this.pirate.div.classList.add("animated","fadeInLeftBig");
        this.dialoog.bubble.div.classList.add("animated","fadeIn");
        this.backgroundOverlay.div.classList.add("animated","fadeIn");

        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));
        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));

    }
    public update(){
        this.timer++;
        this.smalltimer++;
        this.timer_nextlevel++;
        if(this.timer > 500){
            if (this.smalltimer > 10){
                if (this.keyObjects[37] == true){
                    this.smalltimer = 0;
                    this.dialoog.prevText();
                }
                if (this.keyObjects[39] == true){
                    this.smalltimer = 0;
                    this.dialoog.nextText();
                }
            }
        }
        if(this.dialoog.i > this.text.length-1 && this.endAnimationsZeus == false){
            this.endAnimationsPirate = true;
            this.boat.div.classList.add("animated","fadeOutRightBig");
            this.pirate.div.classList.add("animated","fadeOutRightBig");
            this.endAnimationsZeus = true;
            this.zeus.div.classList.add("animated","fadeOutDownBig");
            this.zeus.div.classList.add("animated","fadeOutDownBig");
            this.timer = 0
            this.timer_nextlevel = 0;
            this.timer_nextlevelBoolean = true;
        }

        if (this.timer_nextlevel > 300 && this.timer_nextlevelBoolean == true){
            this.game.level_1b();

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
