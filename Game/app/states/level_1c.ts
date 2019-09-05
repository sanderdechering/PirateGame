class Level_1c {

    private game: Game
    private dialoog: Dialoog
    private pirate: Sprite
    private poseidon: Sprite
    private background: Sprite
    private ship: Sprite
    private text: any

    private keyObjects  = new Array(255);
    private timer : number = 0;
    private smalltimer : number = 0;

    constructor(g: Game) {
        this.game = g
        this.background = new Sprite(0, 0, 0, 0, 0, innerWidth, innerHeight, "../assets/Ocean.png", 0, "background", 0, true)
        this.poseidon = new Sprite(400, 382, 0, 0, 0, 300, 300, "../assets/poseidon.png", 0, "poseidon", 0, true)
        this.ship = new Sprite(200, 335, 0, 0, 0, 225, 225, "../assets/1s.png", false, "boat", 0, true)
        this.dialoog = new Dialoog(window.innerWidth / 2 - window.innerWidth / 4 * 1.5, window.innerHeight / 2 * 1.35, window.innerWidth / 4 * 2.75, 200, "dialoog");
        this.pirate = new Sprite(300, 455, 0, 0, 0, 50, 50, "../assets/piraat.gif", 0, "pirate", 0, true)
        this.text =
            ['Je hebt al de rotsen ontweken in mijn oceaan!',
                'Maar langs mij kom je niet!',
                'Ik ben POSEIDON! God van de zee!',
                'Ik ben de beschermer van de visserij en scheepvaart.',
                'Maar jij klein piraatje prik ik aan mijn drietand!!! ',
            ]

        this.dialoog.submitDialoog(this.text);
        this.background.draw();
        this.pirate.draw();
        this.poseidon.draw();
        this.dialoog.draw();
        this.ship.draw();

        this.background.div.classList.add("wow");
        this.background.div.classList.add("fadeIn");
        this.background.div.setAttribute("data-wow-duration", "4s");

        this.ship.div.classList.add("wow");
        this.ship.div.classList.add("fadeInLeftBig");
        this.ship.div.setAttribute("data-wow-duration", "7s");

        this.pirate.div.classList.add("wow");
        this.pirate.div.classList.add("fadeInLeftBig");
        this.pirate.div.setAttribute("data-wow-duration", "7s");

        this.poseidon.div.classList.add("wow");
        this.poseidon.div.classList.add("fadeInUpBig");
        this.poseidon.div.classList.add("bounce");
        this.poseidon.div.setAttribute("data-wow-duration", "7s");

        this.dialoog.bubble.div.classList.add("wow");
        this.dialoog.bubble.div.classList.add("fadeIn");
        this.dialoog.bubble.div.setAttribute("data-wow-duration", "4s");
        this.dialoog.bubble.div.setAttribute("data-wow-delay", "5s");
        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));
    }

    public update() {
        this.timer++
        this.smalltimer++
        if (this.timer > 500) {
            if (this.smalltimer > 10) {
                if (this.keyObjects[37] == true) {
                    this.smalltimer = 0;
                    this.dialoog.prevText();
                }
                if (this.keyObjects[39] == true) {
                    this.smalltimer = 0;
                    this.dialoog.nextText();
                }
            }
        }
        if (this.dialoog.i > this.text.length-1) {
            this.game.level_1d();
        }
    }

    private keyDownHandeler(event: KeyboardEvent) {
        this.keyObjects[event.keyCode] = true;
    }

    private keyUpHandeler(event: KeyboardEvent) {
        this.keyObjects[event.keyCode] = false;
    }
}