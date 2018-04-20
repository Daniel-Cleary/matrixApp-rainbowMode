// app code goes here
// matrix.init()....
//
// have fun


//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  ///////////////////////////////
 // Defualt Functions/Variables
//////////////////////////////
var angleMeasure = 0;

//Input: Spectral Number (SN)
//Function: Converts number from Spectral system to RGB system
//Output: RGB Number
//Purpose: To convert an (int) spectral number to 3 RGB values for use in functions that use RGB.
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
    for(var i = 0; i < 1530; i++){
        //Each object is designed 
        finalArray.push({angle: (0 + i*(360/1530)), color: spectralConversion(i), blend: false});
    }
    console.log(finalArray);
    return finalArray;
}
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
///\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

// Renders the lights on the matrix by outputting every possible light color
// See function "spectralType()"

matrix.led(
    //change spectralType to output array of objects.
    spectralType()
).render();
