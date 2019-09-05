class Bullet {

    public kogel       : any;
    public kogels      = new Array();
    private kogeltimer  : number;

    constructor(speedX:number, speedY:number, url:string, width:number, height:number) {

        for (let i = 0; i < 5; i++) {
            this.kogel = new Sprite(0,0,speedX,speedY,0,width,height,url,false,"bullet", 0, false);
            this.kogels.push(this.kogel);
        }
        this.kogeltimer = 0;
    }

    public update() : void {
        this.kogeltimer++;
        for (let i = 0; i < 5; i++) {
            this.kogels[i].update();
            this.kogels[i].speedY = this.kogel.speedY;
            if (this.kogels[i].Y > window.innerHeight+5 || this.kogels[i].Y < -50) {
                this.kogels[i].alive = false;
            }
        }
        for (let i = 0; i < 5; i++){
            if (this.kogels[i].alive){
                this.kogels[i].draw();
            }
        }

    }
    public shoot(x:number, y:number){
        for (let i = 0; i < 5; i++) {
            if (!this.kogels[i].alive && this.kogeltimer > 50) {
                this.kogels[i].X = x;
                this.kogels[i].Y = y;
                this.kogels[i].alive = true;
                this.kogeltimer = 0;
                break;
            }
        }
    }
    public getRectangle(i:number){
        return this.kogels[i].div.getBoundingClientRect()
    }
}