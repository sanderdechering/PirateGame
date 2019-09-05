class Kraken{

    private kraken : Sprite
    private screenWidth = window.innerWidth-100

    public getY() : number {
        return this.kraken.Y
    }

    constructor(){
        this.kraken = new Sprite(Math.random() * this.screenWidth,Math.random() * -5000,0,5,0,100,100,"../assets/kraken.png",0,"kraken",0, false);
        this.kraken.draw();
    }

    public update() : void{
        this.kraken.update();
        this.kraken.div.style.transform = `translate(${this.kraken.X}px, ${this.kraken.Y}px)`
    }

    public deleteKraken(){
        this.kraken.div.remove()
    }

    public getRectangle(){
        return this.kraken.div.getBoundingClientRect()
    }
}