let baelle = new Array(10);
let linked = new Array(baelle.length);
let r;

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

    r = new RoterBall();
}

function drawLink(){
    for (let i = 0; i < baelle.length; i++) {
        for (let j = 0; j < baelle.length; j++) {
            if (j != i) {
                if (dist(baelle[i].x, baelle[i].y, baelle[j].x, baelle[j].y) <= baelle[i].r * 2) {
                    linked[i][j] = true;
                }
                
            }
            if (dist(baelle[i].x, baelle[i].y, r.x, r.y) <= baelle[i].r * 2) {
                    linked[i][j] = false;
                    linked[j][i] = false;
                }
            if (linked[i][j] == true) {
                stroke(baelle[i].farbe);
                line(baelle[i].x, baelle[i].y, baelle[j].x, baelle[j].y);
            }
        }
        
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

class RoterBall extends Ball{
    constructor(){
        super();
        this.farbe = 255;
    }

    rendern() {
        noStroke();
        fill(this.farbe,0,0);
        circle(this.x, this.y, this.r * 2);
    }

}

function draw() {
    background(0);
    drawLink();
    for (let i = 0; i < baelle.length; i++) {
        baelle[i].rendern();
        baelle[i].update();

    }
    r.rendern();
    r.update();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}