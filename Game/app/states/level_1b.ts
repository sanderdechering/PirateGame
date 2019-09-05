class Level_1b {

    private rocks: Array<Rock> = [];
    private krakens: Array<Kraken> = [];

    private maxKrakens: number = 15;
    private maxRocks: number = 15;

    private hero  : Hero;
    private game  : Game;
    private background : Sprite;

    private timer : number = 0;
    private hit   : boolean = false;

    private nextLevelboolean:boolean;
    constructor(g:Game){
        this.game = g
        this.background = new Sprite(0,0,0,0,0,window.innerWidth,window.innerHeight,"../assets/diving-ocean.svg",0,"background",0, false);
        this.background.draw();
        this.hero = new Hero("../assets/ship.png", 60, this.game.difficulty, this.game);

        for(let i = 0; i < this.maxRocks; i++){
            this.rocks.push(new Rock())
        }
        for(let i = 0; i < this.maxKrakens; i++){
            this.krakens.push(new Kraken())
        }
        this.hero.hero.div.style.webkitAnimationDuration = "6s";
        this.nextLevelboolean = false;
    }

    public update(){
        this.timer++;
        this.hero.update();
        for (let rock of this.rocks) {
            if(rock.getY() > window.innerHeight) {
                rock.deleteRock();
                this.removeRock(rock)
            }
            rock.update()
        }
        for (let kraken of this.krakens) {
            if(kraken.getY() > window.innerHeight) {
                kraken.deleteKraken();
                this.removeKraken(kraken)
            }
            kraken.update()
        }
        if (this.timer > 150){
            for(let rock of this.rocks ){
                this.hit = this.checkCollision(rock.getRectangle(), this.hero.getRectangle());
                if(this.hit == true) {
                    this.hero.health.damage()
                    this.timer = 0;
                }
            }
            for(let kraken of this.krakens ){
                this.hit = this.checkCollision(kraken.getRectangle(), this.hero.getRectangle());
                if(this.hit == true) {
                    this.hero.health.damage()
                    this.timer = 0;
                }
            }
        }else {
            if (this.hero.health.hearts.length == 0) {
                this.game.gameOver();
            }
        }

        if (this.rocks.length < 1 && this.krakens.length < 1 && this.nextLevelboolean == false){
            this.hero.hero.div.classList.add("animated","fadeOutUpBig");
            this.nextLevelboolean = true;
            this.timer = 0;
        }
        if (this.nextLevelboolean == true && this.timer > 320){
            this.game.level_1c();
        }
    }

    public removeRock(rock:Rock) : void {
        let i: number = this.rocks.indexOf(rock);
        this.rocks.splice(i, 1)
    }
    public removeKraken(kraken:Kraken) : void {
        let i: number = this.krakens.indexOf(kraken);
        this.krakens.splice(i, 1)
    }

    public checkCollision(a: ClientRect, b: ClientRect){
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

}
