class Hero {

    public  game : Game
    public  hero   : Sprite;
    public  bullet : Bullet;
    public  health : Health;
    public difficulty : string
    private keyObjects  = new Array(255);

    constructor(url:string, width:number, difficulty:string, g:Game) {
        this.game = g;
        this.difficulty = difficulty;
        this.hero = new Sprite(window.innerWidth / 2,window.innerHeight-100,0,0, 0, width,100, url,false, "hero", 5,  false);
        this.health = new Health(0,"hero")

        if (this.difficulty == "Makkelijk"){
            this.health = new Health(9,"hero")
        }
        if (this.difficulty == "Normaal"){
            this.health = new Health(6,"hero")
        }
        if (this.difficulty == "Moeilijk"){
            this.health = new Health(3,"hero")
        }
        this.hero.draw();
        this.bullet = new Bullet(0,-5,"../assets/cannonball.png", 20,20);
        for (var i = 0; i < this.keyObjects.length; i++) {
            this.keyObjects[i] = false;
        }
        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));
    }

    private keyDownHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = true;
    }

    private keyUpHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = false;
    }
    public getRectangle(){
        return this.hero.div.getBoundingClientRect()
    }
    public update() : void {
        this.hero.div.style.transform = `translate(${this.hero.X}px, ${this.hero.Y}px)`;
        this.bullet.update();
        if (this.keyObjects[32] == true){
            this.game.heroShot.play();
            this.bullet.shoot(this.hero.X, this.hero.Y);
        }
        if (this.keyObjects[37] == true){
            if (this.hero.X > 0){
                this.hero.update();
                this.hero.speedX = -5;
            }
        }
        if (this.keyObjects[39] == true){
            if (this.hero.X < window.innerWidth-this.hero.width){
                this.hero.update();
                this.hero.speedX = 5;
            }
        }
    }
}