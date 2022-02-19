Webcam.set({
    width:350,
    height:300,
    image_format: "png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/j55OxbDmq/model.json",modalLoaded);
function modalLoaded()
{
    console.log("modal is loaded");
}
function speak()
{
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is"+prediction_1;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis); 
}

function check()
{
    img=document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML=results[0].label;
        prediction_1=results[0].label;
       
        speak();
        if(results[0].label=="yes")
        {
            document.getElementById("update_emoji_1").innerHTML="👍";
        }
        else if(result[0].label=="no")
        {
            document.getElementById("update_emoji_1").innerHTML="👎";
        }
    }
}