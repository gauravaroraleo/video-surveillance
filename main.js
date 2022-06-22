function setup() {
    c1 = createCanvas(500, 500)
    c1.center()

}
v1 = ""
status = ""
objects = []

function preload() {
    v1 = createVideo("video.mp4")
    v1.hide()

}

function draw() {
    image(v1, 0, 0, 500, 500)
    if (status != "") {
        myModel.detect(v1, gotResult)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Objects Detected"
            document.getElementById("number").innerHTML=objects.length
            percent=floor(objects[i].confidence*100)
            fill("red")
            text(objects[i].label+"  "+percent+" %",objects[i].x+15,objects[i].y+15)
noFill()
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }

    }
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error)

    } else {
        console.log(results);
        objects = results
    }

}

function start() {
    myModel = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Detecting Objects"

}

function modelLoaded() {
    console.log("model has been loaded")
    status = true
    v1.loop()
    v1.speed(1)
    v1.volume(0)
}
