class Sprite{

    public X : number;
    public Y : number;
    public speedX : number;
    public speedY : number;
    public rotation : number;
    public width : number;
    public height : number;
    public url : string;
    public alive : boolean;
    public name : string;
    public health : number
    public div : HTMLElement;
    public animation : boolean;

    constructor(X:any, Y:any, speedX:any, speedY:any, rotation:any, width:any, height:any, url:any, alive:any, name:any, health:number, animation:boolean){
        this.X = X;
        this.Y = Y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.rotation = rotation;
        this.width = width;
        this.height = height;
        this.url = url;
        this.alive = alive;
        this.name = name;
        this.health = health;
        this.div = document.createElement(""+this.name+"");
        this.animation = animation
    }

    update(){
        this.X += this.speedX;
        this.Y += this.speedY;
    }

    draw(){
        if(this.animation == true){
            this.div.style.left = this.X + "px";
            this.div.style.top = this.Y + "px";
        }else{
            this.div.style.transform = `translate(${this.X}px, ${this.Y}px)`;
        }
        this.div.style.width = this.width+"px";
        this.div.style.height = this.height+"px";
        this.div.style.rotate = this.rotation+"px";
        this.div.style.fontFamily = "font"
        if (this.url.charAt(0) == '.'){
            this.div.style.backgroundImage = "url(../assets/"+this.url+")"
        }
        if (this.url.charAt(0) == '#'){
            this.div.style.backgroundColor = ""+this.url+"";
        }
        if (this.url == ''){
        }

        document.body.appendChild(this.div);
    }
}