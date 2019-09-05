class Rock{

    private rock : Sprite
    private screenWidth = window.innerWidth-100

    public getY() : number {
        return this.rock.Y
    }

    constructor(){
        this.rock = new Sprite(Math.random() * this.screenWidth,Math.random() * -5000,0,5,0,100,100,"../assets/rock.png",0,"rock",0, false);
        this.rock.draw();
    }

    public update() : void{
        this.rock.update();
        this.rock.div.style.transform = `translate(${this.rock.X}px, ${this.rock.Y}px)`
    }

    public deleteRock(){
        this.rock.div.remove()
    }

    public getRectangle(){
        return this.rock.div.getBoundingClientRect()
    }
}