class Health {
    private heart : any;
    public hearts : Array<Sprite> = []
    private x : number = 0;
    private maxHealth : number;
    private unit : string;

    constructor(maxHealth:number, unit:string) {
        this.unit = unit;
        this.maxHealth = maxHealth;
        if (this.unit == "boss"){
            this.x = window.innerWidth;
        }
        for (let i = 0; i < this.maxHealth; i++) {
            this.heart = new Sprite(0,0,0,0,0,40,40,"../assets/heart.png",false,"heart", 0, false);
            this.hearts.push(this.heart);
        }
        for (let heart of this.hearts){
            if (this.unit == "boss"){
                this.x = this.x - 50;
                heart.X = this.x;
                heart.Y = 50;
                heart.draw()
            }
            if (this.unit == "hero"){
                this.x = this.x + 50;
                heart.X = this.x;
                heart.Y = window.innerHeight-50;

                heart.draw()
            }

        }
    }

    public update() : void {

    }
    // health eraf haal functie
    public damage(){
        this.hearts[0].div.remove();
        this.hearts.splice(0,1)
    }

    //

}