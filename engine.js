const c = document.createElement("canvas");

const ctx = c.getContext('2d');
c.width = document.body.offsetWidth;
c.height = document.body.offsetHeight;

class Player{
    constructor(){
        this.x = c.width / 2;
        this.y = 0;
        this.rot = 0;
        this.ySpeed = 0;
        this.rSpeed = 0;

        this.img = new Image();
        this.img.src = "moto.png";
        this.draw = function(){
            let p1 = c.height - noise(t + this.x) * 0.25;
            let p2 = c.height - noise(t+5 + this.x) * 0.25;
            
            let ground = false;

            if(p1 - 22 > this.y){
                this.ySpeed += 0.2;
            }else{
                this.ySpeed -= this.y - (p1 - 22);
                this.y = p1 - 22;
                ground = true;
            }
            
            let angle = Math.atan2((p2 - 22) - this.y, (this.x + 5) - this.x);
            this.y += this.ySpeed;
            
            if(ground){
                this.rot -= (this.rot - angle);
                this.rSpeed = this.rSpeed - (angle - this.rot);
            }

            this.rot -= this.rSpeed * 0.1;

            ctx.save();
            ctx.translate(this.x, this.y)
            ctx.rotate(this.rot);
            ctx.drawImage(this.img, -15, -15, 50,40)
            ctx.restore();
        }; 
    }
}
let player = new Player();

document.body.appendChild(c);

let perm = [];

while(perm.length < 255){
    while(perm.includes(val = Math.floor(Math.random() * 255)));
    perm.push(val);
}
  
let lerp = (a,b,t) => a + (b -a ) * (1 - Math.cos(t * Math.PI)) / 2;

let noise = x =>{
    x = x * 0.01 % 255;
    let a = lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
    return a;   
}

let t = 0;

let loop = ()=>{

    t += 5;
    ctx.fillStyle = '#fead00';
    ctx.fillRect(0,0,c.width, c.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    for(let i = 0; i < c.width; i++){
        ctx.lineTo(i, c.height - noise(t + i) * 0.25);    
    }

    ctx.lineTo(c.width, c.height); 
    
    ctx.fill();

    player.draw();
    requestAnimationFrame(loop)
}

loop();