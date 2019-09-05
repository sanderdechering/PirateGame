class Level_1d{
    private hero:Hero
    private boss:Boss
    private game:Game
    private background: Sprite
    private bossTimer:number
    private heroTimer:number
    private bigtimer:number

    constructor(g:Game) {
        this.background = new Sprite(0,0,0,0,0,innerWidth,innerHeight,"../assets/at2.png",0,"background",0, false)
        this.background.draw()
        this.game = g
        this.hero = new Hero("../assets/piraat.gif", 80, this.game.difficulty, this.game)
        this.boss = new Boss("../assets/poseidon.png", this.game.difficulty)
        this.bossTimer = 0;
        this.heroTimer = 0;
        this.boss.boss.div.style.webkitAnimationDuration = "3s";
        this.bigtimer = 0
        this.game.theme.pause();
    }

    public update(){
        this.bigtimer++;
        this.bossTimer++
        this.heroTimer++
        if (this.boss.defeated == false) {
            this.hero.update()
            this.boss.update()

        }else{
            var element = document.getElementsByTagName("bullet"), index;

            for (index = element.length - 1; index >= 0; index--) {
                element[index].parentNode.removeChild(element[index]);
            }
        }

        if (this.bossTimer > 180){
            this.boss.boss.div.classList.remove("animated","flash");
            for (let i = 0; i < this.hero.bullet.kogels.length; i++){
                if (this.hero.bullet.kogels[i].alive == true){
                    if (this.checkCollision(this.hero.bullet.getRectangle(i), this.boss.getRectangle())){
                        this.bossTimer = 0
                        this.boss.health.damage();
                        this.boss.boss.div.classList.add("animated","flash");
                        this.game.bossDamage.play();
                    }
                }
            }
        }
        if (this.heroTimer > 180){
            this.hero.hero.div.classList.remove("animated","flash");
            for (let i = 0; i < this.boss.bullet.kogels.length; i++){
                if (this.boss.bullet.kogels[i].alive == true){
                    if (this.checkCollision(this.boss.bullet.getRectangle(i), this.hero.getRectangle())){
                        this.heroTimer = 0
                        this.hero.health.damage();
                        this.hero.hero.div.classList.add("animated","flash");
                        this.game.heroDamage.play();
                    }
                }
            }
        }
        if (this.hero.health.hearts.length == 0){
            this.game.gameOver();
        }

        if (this.boss.health.hearts.length == 0 && this.boss.defeated == false){
            this.hero.hero.div.classList.remove("animated","flash");
            this.bigtimer = 0
            this.boss.defeated = true;
            this.game.bossDefeat.play();
        }
        if (this.bigtimer > 720 && this.boss.defeated == true){
            this.game.victory();
        }

        if(!this.game){


        }
    }
    public checkCollision(a: ClientRect, b: ClientRect){
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
    public removeClass() : void{
        this.boss.boss.div.classList.remove("animated","flash");
    }
}