const express = require('express')
var path = require('path')
const Canvas = require("canvas")

const app = express()

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

function fontFile (name) {
    return path.join(__dirname, '/fonts/', name)
}
  
Canvas.registerFont(fontFile('Roboto-Regular.ttf'), {family: 'Roboto'})
Canvas.registerFont(fontFile('vrr.ttf'), {family: 'vrr'})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/site/index.html")
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/site/style.css")
})
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + "/site/script.js")
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + "/site/favicon.ico")
})

app.get('/@:user/:followers', (req, res) => {
    const canvas = Canvas.createCanvas(1600,900)
    const ctx = canvas.getContext("2d")
    var templateImg = new Canvas.Image()

    if (req.query.wmk) {
        templateImg.src = 'templates/PostStyle1Watermark.png'
    } else {
        templateImg.src = 'templates/PostStyle1.png'
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

    // Name
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = `${70 - req.params.user.length}pt Roboto`
    ctx.fillText(`@${req.params.user} made a milestone of`, canvas.width / 2, canvas.height /3)

    // Follower Count
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = `${200 - formatNumber(req.params.followers).length}pt vrr`
    ctx.fillText(formatNumber(req.params.followers), canvas.width / 1.95, canvas.height /1.6)

    // Bottom Text
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = `50pt Roboto`
    ctx.fillText(`followers! Congratulations!`, canvas.width / 1.95, canvas.height /1.30)

    res.writeHead(
        404,
        {
          "Content-Type": "image/jpg",
        }
    );
    res.end(canvas.toBuffer())
})

app.get('/generate/placeholder', (req, res) => {
    const canvas = Canvas.createCanvas(1600,900)
    const ctx = canvas.getContext("2d")

    var templateImg = new Canvas.Image()
    templateImg.src = 'templates/PostStyle1Watermark.png'

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = `50pt vrr`
    ctx.fillText("Add details to start Generating!", canvas.width / 2, canvas.height /1.8)

    res.writeHead(
        404,
        {
          "Content-Type": "image/jpg",
        }
    );
    res.end(canvas.toBuffer())
})

app.listen(6969)