class Dialoog {
    public text      : any
    public bubble  : Sprite
    public i         :number
    public spacebar  :number

    public x      : number;
    public y      : number;
    public width  : number;
    public height : number;
    public name   : string;

    constructor(x:number, y:number, width:number, height:number, name:string) {
        this.i        = 0;
        this.x        = x;
        this.y        = y;
        this.name     = name;
        this.width    = width;
        this.height   = height;
        this.spacebar = 32;

        this.text    = new Array();
        this.bubble  = new Sprite( this.x, this.y,0,0,0,this.width,this.height,"../assets/scroll-small-2.png",0,this.name,0, true);

        this.bubble.div.style.paddingLeft = "50px";
        this.bubble.div.style.paddingRight = "20px";
        this.bubble.div.style.paddingTop = "60px";
    }

    public submitDialoog(dialoog:any){
        this.text = dialoog;
        this.firstText();
    }
    public prevText(){
        if(this.i > 0){
            this.i--
            this.bubble.div.innerHTML = this.text[this.i];
            console.log(this.i)
        }
    }
    public nextText(){
        if(this.i < this.text.length-1){
            this.i++
            this.bubble.div.innerHTML = this.text[this.i];
            console.log(this.i)
        }else{
            this.i++
            this.bubble.div.innerHTML = ""
            console.log(this.i + "else in next text")
        }

    }

    public firstText(){
        this.bubble.div.innerHTML = this.text[this.i];
    }

    public draw() {
        this.bubble.draw();
    }
    
    
}