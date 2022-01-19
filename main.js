song="";

function preload() {
    song=loadSound("music.mp3");
}

leftwristX=0;
leftwristY=0;

rightwristX=0;
rightwristY=0;

scorerightwrist=0;
scoreleftwrist=0;

function setup() {
    canvas=createCanvas(500,450);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    model_posenet=ml5.poseNet(video,model_loaded);
  model_posenet.on("pose",gotresults);
}

function model_loaded() {
    console.log("the model is loaded");
}

function draw() {
    image(video,0,0,500,450);

    fill("red");
    stroke("red");

    if (scorerightwrist>0.2) {
        circle(rightwristX,rightwristY,20);

        if (rightwristY>0 && rightwristY<=100) {
            document.getElementById("speedh3").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }

        else if (rightwristY>100 && rightwrist<=200) {
            document.getElementById("speedh3").innerHTML="Speed = 1x";
            song.rate(1);
        }

        else if (rightwristY>200 && rightwristY<=300) {
            document.getElementById("speedh3").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }

        else if (rightwristY>300 && rightwristY<=400) {
            document.getElementById("speedh3").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if (rightwristY>400 ) {
            document.getElementById("speedh3").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }

    }

    if (scoreleftwrist>0.2) {
        circle(leftwristX,leftwristY,20);
        numberLW=Number(leftwristY);
        removedecimal=floor(numberLW);
        Vdivide=removedecimal/500;
        document.getElementById("volumeh3").innerHTML="Volume = "+Vdivide;
        song.setVolume(Vdivide);
}
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotresults(results) {
    if (results.length>0) {
        console.log(results);

        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
    }
} 