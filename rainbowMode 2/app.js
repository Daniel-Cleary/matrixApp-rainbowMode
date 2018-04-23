// app code goes here
// matrix.init()....
//
// have fun


//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  ///////////////////////////////
 // Defualt Functions/Variables
//////////////////////////////

var timer = 0; // Used later to keep track of runtime

//Every "reRenderTime" ms, the Everloop lights will displace themselves by "angleDisplace" degrees.
var angleDisplace = 10; //Diplacement of lights in degrees per "reRenderTime"
var reRenderTime = 10; //In ms



// Input: Spectral Number (SN)
// Function: Converts number from Spectral system to RGB system
// Output: RGB Number
// Purpose: To convert an (int) spectral number to 3 RGB values for use in functions that use RGB.
function spectralConversion(spectralNumber){
    var redVal; //Red channel
    var greenVal; //Green channel
    var blueVal; //Blue channel
    
    //Based off of input, a specific case is chosen for conversion
    switch(true) {
    case spectralNumber >= 0 && spectralNumber < 255://Red to Purple
        redVal = 255;
        greenVal = 0;
        blueVal = spectralNumber;
        break;
    case spectralNumber >= 255 && spectralNumber < 510://Purple to Blue
        redVal = 510 - spectralNumber;
        greenVal = 0;
        blueVal = 255;
        break;
    case spectralNumber >= 510 && spectralNumber < 765://Blue to Cyan
        redVal = 0;
        greenVal = spectralNumber - 510;
        blueVal = 255;
        break;
    case spectralNumber >= 765 && spectralNumber < 1020://Cyan to Green
        redVal = 0;
        greenVal = 255;
        blueVal = 1020 - spectralNumber;
        break;
    case spectralNumber >= 1020 && spectralNumber < 1275://Green to Yellow
        redVal = spectralNumber - 1020;
        greenVal = 255;
        blueVal =  0;
        break;
    case spectralNumber >= 1275 && spectralNumber < 1530://Yellow to Red
        redVal = 255;
        greenVal = 1530 - spectralNumber;
        blueVal = 0;
        break;
    default:
        console.log("Oops, we got an error in the spectral converter!");
    }
    //Converts the RGB channels to a string the Matrix can use
    var finalValue = 'rgb(' + redVal + ', ' + greenVal + ', ' + blueVal + ')';
    return finalValue;
}


// Input: None 
// Function: Generates an array 
// Output: Array of objects that will define the color and angle of the lights on the everloop 
// Purpose: To type out and apply massive amounts of repetive/similar object data
function spectralType(){
    var finalArray = [];
    
    for(var i = 0; i < 35; i++){
        //Each object is designed here.
        //This is the format for each color point. There are more points than there are lights
        //on the matrix to allow for a smoother transition between colors when the lights are rotating.
        finalArray.push({angle: (i*(360/35)), color: spectralConversion(1529*i/35), blend: true});
        //changed all 1530 to 35
    }
    
    return finalArray;
}

var lightsData = [];

lightsData = spectralType(); 
//spectralType() offloads data to lightsData (a global variable)
//to make the program run smoother.

function angleChange(){
    for(var i=0; i<35; i++){
        // i<1530 ---> i<35
        lightsData[i].angle += angleDisplace; //Iterates over every object to increment angle value
        console.log("object: " + i);
    }
}

///////////////////
// SLIDERS
///////////////////

	matrix.on('angleDisplace', function(p) {
		angleDisplace = p.value;
	});
		
	matrix.on('reRenderTime', function(p) {
		reRenderTime = p.value;
	});

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/



//Causes the lights to re-render with an increase in angle every reRenderTime milliseconds
setInterval(function(){
    
    timer += reRenderTime;
    console.log("Timer: " + timer);
    console.log("rendering...");
    matrix.led(lightsData).render(); 
    angleChange();

}, reRenderTime);
