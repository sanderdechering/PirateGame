class Game {
    private currentscreen:any;
    public difficulty: string;
    public started: boolean;
    public theme = new Audio();
    public heroShot = new Audio();
    public heroDamage = new Audio();
    public bossShot = new Audio();
    public bossDamage = new Audio();
    public bossDefeat = new Audio();
    public won = new Audio();
    public defeat = new Audio();



    constructor() {
        this.theme.src = "../assets/sound/thememusic.mp3";
        this.heroShot.src = "../assets/sound/shootcanon.mp3";
        this.heroDamage.src = "../assets/sound/humanhit.mp3";
        this.bossShot.src = "../assets/sound/theme_sound.mp3";
        this.bossDamage.src = "../assets/sound/god_hit_heavy.mp3";
        this.bossDefeat.src = "../assets/sound/God-Dead-sound.mp3";
        this.won.src = "../assets/sound/levelUp.mp3";
        this.defeat.src = "../assets/sound/Level_Down.mp3";

        this.started = false;
        this.difficulty = ""
        this.currentscreen = new startMenu(this);
        this.gameLoop()
    }
    private gameLoop():void{
        this.currentscreen.update();
        requestAnimationFrame(() => this.gameLoop())
    }
    public startMenu(){
        document.body.innerHTML = "";
        this.currentscreen = new startMenu(this)
    }
    public difficultyMenu(){
        document.body.innerHTML = "";
        this.currentscreen = new difficultyMenu(this)
    }
    public instructionMenu(){
        document.body.innerHTML = "";
        this.currentscreen = new instructionMenu(this)
    }
    public level_1a(){
        document.body.innerHTML = "";
        this.currentscreen = new Level_1a(this)
    }
    public level_1aa(){
        document.body.innerHTML = "";
        this.currentscreen = new Level_1aa(this)
    }
    public level_1b() {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1b(this)
    }
    public level_1c() {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1c(this)
    }
    public level_1d() {
        document.body.innerHTML = "";
        this.currentscreen = new Level_1d(this)
    }
    public gameOver(){
        document.body.innerHTML = "";
        this.currentscreen = new GameOver(this)
    }
    public victory(){
        document.body.innerHTML = "";
        this.currentscreen = new Victory(this)
    }

}
window.addEventListener("load", () => new Game());