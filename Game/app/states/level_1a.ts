class Level_1a{

    private game:Game;
    private scrollBig:Sprite;
    private dialoog:Dialoog;
    private background:Sprite;
    private piraat:Sprite;
    private animateZeusIn:boolean
    private zeus:Sprite;
    private text:any;
    private timer : number = 0;
    private smalltimer : number = 0;
    
    private keyObjects  = new Array(255);

    constructor(g:Game) {
        this.animateZeusIn = false;
        this.game = g;
        this.dialoog = new Dialoog(window.innerWidth/2-window.innerWidth/4*1.5, window.innerHeight/2*1.35, window.innerWidth/4*2.75, 200, "dialoog");
        this.scrollBig = new Sprite(window.innerWidth/2-325,window.innerHeight/2-350,0,0,0,650,520,"../assets/big_scroll.png",0,"bigScroll",0, true)
        this.piraat = new Sprite(window.innerWidth/2-40,window.innerHeight/2-100,0,0,0,80,100,"../assets/piraat.gif",0,"piraat",0, true)
        this.zeus = new Sprite(window.innerWidth/2-100,window.innerHeight/2,0,0,0,200,200,"../assets/zeusthunder.png",0,"piraat",0, true)

        this.background = new Sprite(0, 0, 0, 0, 0, window.innerWidth, window.innerHeight, "../assets/map.png", 0, "background", 0, true);
        this.text =
            ['<p>Krijg nou wat, een landrot! Wat moet dat hier? Ik heb je helemaal niet <br>uitgenodigd!</p>',
                '<p>Wat maakt het ook uit, je bent er nu toch. Je komt precies op het goede <br>moment landrot. Ik wilde net op avontuur gaan!</p>',
                '<p>Je gaat toch wel mee schooier? Ja? Mooi! Voordat we gaan zal ik je eerst <br> vertellen wie ik ben en wat ons te wachten staat! </p>',
                '<p>Mijn naam is Piet, piraat Piet. Ik jaag al heel mijn leven op de meest<br> waardevolle schatten! Tot nu toe heeft mij nog niks<br> in de weg gestaan. Ik word ook wel de beste piraat aller tijden genoemd!</p>',
                '<p>Daarom ga ik nu de ultieme uitdagin aan. Ik, Piet piraat, beste piraat<br> allertijden, ga de schat der schatten proberen te stelen.</p>',
                '<p>Van wie vraag je? Dat zal ik je laten zien!</p>',
                '<p>Dit hier is Zeus. Zeus is de griekse god der goden, heersend vanaf <br>de berg olympus. De berg olympus is ons doel landrot. <br>Bovenop staat ons de grootste schat aller tijden te wachten!</p>',
                '<p>Laten we gaan landrot! Recht zo die gaat!</p>',
            ];

        this.background.div.style.webkitAnimationDuration = "2s";
        this.piraat.div.style.webkitAnimationDuration = "2s";
        this.piraat.div.style.webkitAnimationDelay = "4s";

        this.scrollBig.div.style.webkitAnimationDuration = "2s";
        this.scrollBig.div.style.webkitAnimationDelay = "2s";

        this.dialoog.bubble.div.style.webkitAnimationDuration = "2s";
        this.dialoog.bubble.div.style.webkitAnimationDelay = "5s";

        this.zeus.div.style.webkitAnimationDuration = "3s";

        this.background.div.classList.add("animated","fadeIn");
        this.piraat.div.classList.add("animated","fadeInUpBig");
        this.zeus.div.classList.add("animated","fadeInLeftBig");
        this.scrollBig.div.classList.add("animated","fadeInUpBig");
        this.dialoog.bubble.div.classList.add("animated","fadeInLeftBig");

        this.dialoog.submitDialoog(this.text);
        this.background.draw();
        this.scrollBig.draw();
        this.piraat.draw();
        this.dialoog.draw();

        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));
        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));

    }
    public update(){
        this.timer++;
        this.smalltimer++;
        if(this.timer > 250){
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
        if (this.dialoog.i == 5 && this.animateZeusIn == false){
            this.zeus.draw()
        }if (this.dialoog.i == 7 && this.animateZeusIn == false){
            this.game.level_1aa()
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
