let baelle = new Array(10);
let linked = new Array(baelle.length);
roterBall;

for (let i = 0; i < linked.length; i++) {
    linked[i] = new Array(baelle.length);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < baelle.length; i++) {
        baelle[i] = new Ball();
    }

    for (let i = 0; i < linked.length; i++) {
        for (let j = 0; j < linked[i].length; j++) {
            linked[i][j] = false;
        }
    }

    roterBall = new roterBall();
}

function drawLink(){
    for (let i = 0; i < baelle.length; i++) {
        for (let j = 0; j < baelle.length; j++) {
            if (j != i) {
                if (dist(baelle[i].x, baelle[i].y, baelle[j].x, baelle[j].y) <= baelle[i].r * 2) {
                    linked[i][j] = true;
                }
                
            }
            if (linked[i][j] == true) {
                stroke(baelle[i].farbe);
                line(baelle[i].x, baelle[i].y, baelle[j].x, baelle[j].y);
            }
        }
        if (dist(baelle[i].x, baelle[i].y, roterBall.x, roterBall.y) <= baelle[i].r * 2) {
                    linked[i][j] = false;
                }
    }
}

class roterBall extends Ball{
    constructor(){
        super();
        this.farbe = 255;
        this.randX = int(random(2));
        this.randY = int(random(2));
        if(randX = 0) this.speedx = -3;
        else this.speedx = 3;
        if(randY = 0) this.speedy = -3;
        else this.speedy = 3;
    }

    rendern() {
        noStroke();
        fill(this.farbe,0,0);
        circle(this.x, this.y, this.r * 2);
    }

}

class Ball {
    constructor() {
        this.r = windowHeight/(windowHeight/15);
        this.x = random(this.r, (width + 1) - this.r);
        this.y = random(this.r, (height + 1) - this.r);
        this.speedx = random(-3, 3);
        this.speedy = random(-3, 3);
        this.farbe = int(random(100, 256));
    }

    rendern() {
        noStroke();
        fill(this.farbe);
        circle(this.x, this.y, this.r * 2);
    }

    update() {
        this.x += this.speedx;
        this.y += this.speedy;

        if (this.x >= width - this.r || this.x <= this.r) {
            this.speedx = -this.speedx;
        }

        if (this.y >= height - this.r || this.y <= this.r) {
            this.speedy = -this.speedy;
        }
    }
}



function draw() {
    background(0);
    drawLink();
    for (let i = 0; i < baelle.length; i++) {
        baelle[i].rendern();
        baelle[i].update();

    }
    roterBall.rendern();
    roterBall.update();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}