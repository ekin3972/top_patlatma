const canvas = document.getElementById("eylencesiz")
const ctx = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight
let particles = []
let friction = 0.99
let yenir = 3
let yenis = 10
let mouse = {
    x: canvas.width / 5, y: canvas.height / 2

}
addEventListener("mousemove", function (e) {

    mouse.x = e.clientX
    mouse.y = e.clientY
})
const canEl = document.getElementById("can")









//  ctx.fillRect(0,0,canvas.width,canvas.height)
class Oyuncu {
    constructor(x, y, r, color) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color

    }
    update() {
        ctx.strokeStyle = "white"
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();

    }

}
class Base {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;

    }
}

class Particle extends Base {
    constructor(x, y, radius, color, velocity) {
        super(x, y, radius, color, velocity);
        this.alpha = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01

    }



}

class benimdussmanlarim {

    constructor(x, y, r, color) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color
        this.speed = 8

    }
    update() {
        //     if (condition) {
        //     this.x-=this.speed
        // }else{this.x-=this.speed}
        this.x -= this.speed
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

    }

}
// addEventListener("keypress", function (e) {
// if(e.which==32){
//     lazerattimyokolin.push(new Lazer(oyuncu.x,oyuncu.y))
// }

// })
addEventListener("click", function () { lazerattimyokolin.push(new Lazer(oyuncu.x, oyuncu.y, yenir, yenis)) }

)

class Lazer {
    constructor(x, y, yenir, yenis) {
        this.x = x
        this.y = y
        this.r = yenir
        this.color = "white"
        this.speed = yenis

    }
    update() {

        this.y += this.speed
        this.draw()
    }
    draw() {
        ctx.strokeStyle = "white"
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();



    }
    update() {

        this.x += this.speed
        this.draw()
    }
}

let setTimeoutbitti
let vurulandusman = 0
let oyuncu = new Oyuncu(canvas.width / 4, canvas.height / 2, 35, "")
let dusmanlar = []
let lazerattimyokolin = []
function dusmanlariolusturupgeiistir() {
    setInterval(() => {
        let randomy = Math.random() * (canvas.height - 30 / 1) + 30

        let collor = `hsl(${Math.random() * 360},50%,50%)`

        dusmanlar.push(new benimdussmanlarim(canvas.width, randomy, 30, collor))

    }, 400);
}
dusmanlariolusturupgeiistir()


let vurulandusman2 = 0
let ekran = true
let can = 3
let puan = 0

function animate() {
    let frameId = requestAnimationFrame(animate)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    particles.forEach((particle, particleIndex) => {
        //if particle's opacity is zero then remove it
        if (particle.alpha <= 0) {
            setTimeout(() => {
                particles.splice(particleIndex, 1);
            }, 0);

        } else {
            particle.update();
        }
    })



    oyuncu.x = mouse.x
    oyuncu.y = mouse.y
    oyuncu.update()

    dusmanlar.forEach((dusman, index,) => {

        dusman.update()
        let a = oyuncu.x - dusman.x
        let b = oyuncu.y - dusman.y
        let mesafe = Math.sqrt(a * a + b * b) - oyuncu.r - dusman.r
        if (mesafe < 1) {
            dusmanlar.splice(0, dusmanlar.length)

            can--



        }
        if (dusman.x < 0 - dusman.r) {
            dusmanlar.splice(0, dusmanlar.length)
            can--
        }

        let sure = 0
        lazerattimyokolin.forEach((lazer, index1) => {
            let mesafe3 = Math.hypot(lazer.y - dusman.y, lazer.x - dusman.x) - lazer.r - dusman.r

            if (mesafe3 < 1) {
                for (let i = 0; i < dusman.r * 1.7; i++) {
                    //generating random radius and velocity for each particle
                    particles.push(new Particle(
                        lazer.x,
                        lazer.y,
                        Math.random() * 2,
                        dusman.color,
                        {
                            x: (Math.random()) * (Math.random() * 9),
                            y: (Math.random() - 0.5) * (Math.random() * 6)
                        }
                    ));

                }




                if (vurulandusman > 2) {
                    //make particle effect


                    dusmanlar.splice(index, 1)
                    vurulandusman = 0
                    süre = 0
                    puan++
                    vurulandusman2++

                } else {
                    süre = 0
                    dusmanlar.splice(index, 1)
                    vurulandusman++
                    lazerattimyokolin.splice(index1, 1)
                    console.log(vurulandusman)
                    puan++
                    vurulandusman2++
                }
            }
        });

        if (vurulandusman2 == 15) {
            const sayac = setInterval(() => {
                if (sure < 1000) {
                    dusman.speed = -5
                    yenir = 8
                    yenis = 45
                }


                vurulandusman2 = 0
                sure++
                if (sure > 3999) {
                    setTimeoutbitti = 1
                    yenir = 3
                    yenis = 10

                    clearInterval(sayac)
                }

            }, 1);
            if (setTimeoutbitti == 1) {
                dusman.speed = 8
                setTimeoutbitti = 0
                sure = 0

            }

        }
    });
    lazerattimyokolin.forEach(lazer => {
        lazer.update()

    });
    canEl.innerText = "can =" + (can)
    if (can < 1) {
        if (ekran) {
            cancelAnimationFrame(frameId)
            alert(puan + "puan aldın")
            ekran = false
        }


    }

}

animate()














