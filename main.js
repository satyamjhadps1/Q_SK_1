timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
x = 30;
y = "Game Over";
z = 0;
g = "No";
w = "Yes"
speak = "";
vowels = [];
utterThis = "";
k = 0;
Timer = setInterval(myTimer, 1000)

function start(){
    document.getElementById("output").innerHTML = "<p id='sketch_to_be_drawn'>Sketch To Be Drawn : "+ localStorage.getItem("arr") + "</p>";
document.getElementById("ooo").innerHTML = "<center><button class='btn btn-success' onclick='eraseCanvas()'>Erase</button></center><center><input type='color' id='inp_color' class='form-control' placeholder='Choose Your Color, Default is Black'></center>";
    background("white");
    g = "Yes";
     quick_draw_data_set = ["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace","firetruck","fish","flamingo","flashlight","floor lamp","flower","flying saucer","foot","fork","frog","frying pan","garden","garden hose","giraffe","goatee","golf club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon","hot dog","hot tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light bulb"];
    random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
Element_of_array = quick_draw_data_set[random_no];
localStorage.setItem("arr", Element_of_array);

document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn:<br><h1 class='header'>"+Element_of_array+"</h1>";
if (allow == true){
document.getElementById("Ll").innerHTML = "<center><button onclick='quit()' class= 'bt' id='quit-btn'>Skip The Question</button></center>"
}
var synth = window.speechSynthesis;
vowels = ["a", "e", "i", "o", "u"]
for(j=0; j<vowels.length+1; j++) {
    if(Element_of_array.charAt(0) == vowels[j]) {
        speak = "an";
    }else{
        speak = "a";
    }
}
var speak_data = "Sketch To Be Drawn is "+speak+ Element_of_array;
var  utter_this = new SpeechSynthesisUtterance(speak_data);
synth.speak(utter_this);
}
function time(){
    x = 30;
y = "Time Up";
starttimer();
}


function starttimer(){
Timer = setInterval(myTimer, 1000);

function myTimer() {

if(x == 1){
    z = z+1;
clearInterval(Timer);
x = 30;
document.getElementById("timer").innerHTML= y;
w = "No";
g = "No";
j = "Time Up! Click Next"
utterThis = new SpeechSynthesisUtterance(j);
synth.speak(utterThis);
if(z >=6){
    finish();
}else{

document.getElementById("ooo").innerHTML = "<button id='c_sk' class='bt' data-toggle='modal' data-target= '#myModal1' onclick='start()'>Next</button>";
document.getElementById("draw_no").innerHTML = "Drawing : " + z + "/6";
document.getElementById("output").innerHTML = "<p id='sketch_to_be_drawn'>Sketch To Be Drawn : "+ localStorage.getItem("arr") + "</p>";
document.getElementById("ooo").innerHTML = "<button id='c_sk' class='bt' data-toggle='modal' data-target= '#myModal1' onclick='start()'>Next</button><center><button class='btn btn-success' onclick='eraseCanvas()'>Erase</button></center><center><input type='color' id='inp_color' class='form-control' placeholder='Choose Your Color, Default is Black'></center>";
}
}else{
x = x-1;
document.getElementById("timer").innerHTML = "Timer : " + x;
w = "Yes";
g = "Yes"
}
}
}

function setup(){
    canvas = createCanvas(450, 275)
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    classifer = ml5.imageClassifier("DoodleNet");
    synth = window.speechSynthesis;
}

function finish(){
    window.alert("Thank You For Attempting Our Quick Draw Challenge");
    window.location = 'index.html';
}

function clear(){
    background("white");
}

function classifyCanvas(){
    if(g == "Yes"){
       classifer.classify(canvas, gotResult);
    }else{
        if(w == "No"){
        window.alert("Warning: Please Click Next!");
        }else{
            window.alert("Warning: Please Click Start!");
        }
    }
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else{
        if(g == "Yes"){
        console.log(results);
        document.getElementById("your_sketch").innerHTML = "Your Sketch : "+results[0].label;
        document.getElementById("confidence").innerHTML = "Confidence : "+Math.round(results[0].confidence*100) + "%";
        f_l = results[0].label;
        f_ll = f_l.replaceAll("_", " ");
        console.log(f_ll);
        utterThis = new SpeechSynthesisUtterance(f_ll);
        synth.speak(utterThis);
        if(document.getElementById("sketch_to_be_drawn").innerHTML == f_ll){
            k = k + 1;
          document.getElementById("score").innerHTML == "Score : " + k;
           if(z = 6){spe = "Thank You For Playing Our Quiz, Have A Nice Day!"; window.location ="bye.in"} else {spe = "Nice Correct Answer! Click Next For Next question";}
          utterThis = new SpeechSynthesisUtterance(spe);
          synth.speak(utterThis);  
        }
        }else{
            window.alert("Warning: Please Click Start!");
        }
    }
}
function getColorToRgb(){
    color = document.getElementById("inp_color").value;
    console.log(color);
    color.replace("#", " ");
    console.log(color);
}
function draw(){
    getColorToRgb();
    strokeWeight(13);
    stroke(color);
    if (w == "Yes"){
        if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
        }
    }
}

function eraseCanvas(){
    background("white")
}

function quit(){
    if(z < 6){
        window.alert("We need to confirm that are you ready to skip because you can skip only once in a game. Are You Sure? if yes click skip again")
        starttimer();
        document.getElementById("ooo").innerHTML = "<button id='c_sk' class='bt' data-toggle='modal' data-target= '#myModal1' onclick='start()'>Skip</button>";
        document.getElementById("Ll").innerHTML = " "
    }
}