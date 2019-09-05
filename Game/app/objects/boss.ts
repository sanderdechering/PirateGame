class Boss {

    public boss:Sprite;
    public bullet:Bullet;
    public health:Health;
    public defeated:boolean;

    constructor(url:string, difficulty:string) {
        this.defeated = false;
        this.health = new Health(0, "boss");

        if (difficulty == "Makkelijk"){
            this.health = new Health(12,"boss")
        }
        if (difficulty == "Normaal"){
            this.health = new Health(9,"boss")
        }
        if (difficulty == "Moeilijk"){
            this.health = new Health(6,"boss")
        }
        this.boss = new Sprite(window.innerWidth/2,0,3,0,0,200,200,url,false,"boss", 0, false);
        this.boss.draw();
        this.bullet = new Bullet(0,5, "../assets/dolphin.gif", 40, 60)
    }

    public update() : void {
        this.boss.update();
        this.boss.div.style.transform = `translate(${this.boss.X}px, ${this.boss.Y}px)`;
        this.bullet.update();
        this.health.update()
        if (this.defeated == false){
            this.bullet.shoot(this.boss.X,this.boss.Y)
        }
        if (this.boss.X >= window.innerWidth-this.boss.width || this.boss.X <= 0){
            this.boss.speedX *=-1;
        }
    }
    public getRectangle(){
        return this.boss.div.getBoundingClientRect()
    }
}