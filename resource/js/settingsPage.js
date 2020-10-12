
const keyCodes = {
   
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    32: 'spacebar',
    33: 'page up',
    34: 'page down',
    35: 'end',
    36: 'home',
    37: 'left arrow',
    38: 'up arrow',
    39: 'right arrow',
    40: 'down arrow',
    41: 'select',
    42: 'print',
    43: 'execute',
    44: 'Print Screen',
    45: 'insert',
    46: 'delete',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    58: ':',
    60: '<',
    63: 'ß',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    96: 'numpad 0',
    97: 'numpad 1',
    98: 'numpad 2',
    99: 'numpad 3',
    100: 'numpad 4',
    101: 'numpad 5',
    102: 'numpad 6',
    103: 'numpad 7',
    104: 'numpad 8',
    105: 'numpad 9',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12',
    124: 'f13',
    125: 'f14',
    126: 'f15',
    127: 'f16',
    128: 'f17',
    129: 'f18',
    130: 'f19',
    131: 'f20',
    132: 'f21',
    133: 'f22',
    134: 'f23',
    135: 'f24',
    136: 'f25',
    137: 'f26',
    138: 'f27',
    139: 'f28',
    140: 'f29',
    141: 'f30',
    142: 'f31',
    143: 'f32',
   
  };

var up_code;
var down_code;
var right_code;
var left_code;




function gameControlers(event, id) {

    //var eventKey = event.key;
	if (id === "up") {
        document.getElementById("up").innerHTML = event.keyCode;
        //document.getElementById("up").innerText = event.keyCode;
        document.getElementById("up").value = event.key;
        //document.getElementById("up").keyCode = event.keyCode;
        up_code= event.keyCode;
	}
	else if (id === "down") {
		document.getElementById("down").innerHTML = event.keyCode;
        document.getElementById("down").value = event.key;
        down_code= event.keyCode;
	}
	else if (id === "right") {
		document.getElementById("right").innerHTML = event.keyCode;
        document.getElementById("right").value = event.key;
        right_code=event.keyCode;

	}
	else if (id === "left") {
        document.getElementById("left").innerHTML = event.keyCode;
        document.getElementById("left").value = event.key;
        left_code=event.keyCode;

	}
}

//$(function(){

    
    jQuery.validator.addMethod("goUp", function(value, element) {

        return  value.toString() !== $("#down").val() && 
                value.toString() !== $("#right").val() &&
                value.toString() !== $("#left").val();
    });
    
    jQuery.validator.addMethod("goDown", function(value, element) {
    
        return  value.toString() !== $("#up").val() && 
                value.toString() !== $("#right").val() &&
                value.toString() !== $("#left").val();
    });
    
    jQuery.validator.addMethod("goRight", function(value, element) {
    
        return  value.toString() !== $("#down").val() && 
                value.toString() !== $("#up").val() &&
                value.toString() !== $("#left").val();
    });
    
    jQuery.validator.addMethod("goLeft", function(value, element) {
    
        return  value.toString() !== $("#down").val() && 
                value.toString() !== $("#right").val() &&
                value.toString() !== $("#up").val();
    });

     jQuery.validator.addMethod("validUpMove", function(value, element) {
       // let found =false;
        for (var key in keyCodes) {
            //var keyValue = obj[key];
        
            if(up_code == key){
                return true;
               // found = true;
                //console.log(found);
               // break;
            }
          }
          return false;
         //return found;
     });

     jQuery.validator.addMethod("validDoenMove", function(value, element) {
        for (var key in keyCodes) {
            if(down_code == key){
                return true;
            }
          }
         return false;
     });

     jQuery.validator.addMethod("validRightMove", function(value, element) {
        for (var key in keyCodes) {
            if(right_code == key){
                return true;
            }
          }
         return false;
     });

     jQuery.validator.addMethod("validLeftMove", function(value, element) {
        for (var key in keyCodes) {
            if(left_code == key){
                return true;
            }
          }
         return false;
     });

   
    
$().ready(function(){

    $('#settingsForm').validate({
        errorElement: 'div',
        rules: {
            up:{
                required: true,
                goUp: true,
                validUpMove: true
            },
            down:{
                required: true,
                goDown: true,
                validDoenMove: true
            },
            right: {
                required: true,
                goRight: true,
                validRightMove: true
            },
            left: {
                required: true,
                goLeft: true,
                validLeftMove: true
            },
            Ball_5Point: {
                // checkColor: true
             },
             Ball_15Point: {
               // checkColor: true
            },
            Ball_25Point: {
                 //checkColor: true
                },
        },
        messages: {
           up: {
               required: "Click and Press key for move up",
               goUp: "This button is already selected for a different direction",
               validUpMove: "You can't choose this button"
            },
            down: {
                required: "Click and Press key for move down",
                goDown: "This button is already selected for a different direction",
                validDoenMove: "You can't choose this button"
             },
            right: {
                required: "Click and Press key for move right",
                goRight: "This button is already selected for a different direction",
                validRightMove: "You can't choose this button"
            },
            left: {
                required: "Click and Press key for move left",
                goLeft: "This button is already selected for a different direction",
                validLeftMove: "You can't choose this button"
            },
            Ball_5Point: {
                // checkColor: "For every type of ball choose a diffrent color"
             },
             Ball_15Point: {
               // checkColor: "For every type of ball choose a diffrent color"
            },
            Ball_25Point: {
               // checkColor: "For every type of ball choose a diffrent color"
            }
        },

        submitHandler: function (form, event) {
          
            gameMoveKeys[0] = up_code;
            gameMoveKeys[1] = down_code;
            gameMoveKeys[2] = right_code;
            gameMoveKeys[3] = left_code;
            
            ballsNumber = $("#ballsNumber").val();

            ballsColor[0] = $("#Ball_5Point").val();
            ballsColor[1] = $("#Ball_15Point").val();
            ballsColor[2] = $("#Ball_25Point").val();

            gameTimer = $("#gameTimer").val();

            monstersNumber = $("#monstersNumber").val();
            
            startGame();
            
        }
        
        

    });

});


/*random settings by buttom*/
function randomSettings(){

    $("#up")[0].value="ArrowUp";
    $("#down")[0].value="ArrowDown";
    $("#right")[0].value= "ArrowRight";
    $("#left")[0].value= "ArrowLeft";


    up_code =38;
    down_code =40;
    right_code =39;
    left_code =37;


    $("#Ball_5Point")[0].value=getRandomColor();
    $("#Ball_15Point")[0].value=getRandomColor();
    $("#Ball_25Point")[0].value=getRandomColor();

    ballsColor[0] = $("#Ball_5Point")[0].value;
    ballsColor[1] = $("#Ball_15Point")[0].value;
    ballsColor[2] = $("#Ball_25Point")[0].value;

    $("#ballsNumber")[0].value = getRandomNumber(50,90);
    ballsNumber = $("#ballsNumber")[0].value;

    $("#gameTimer")[0].value = getRandomNumber(60,159);
    gameTimer = $("#gameTimer")[0].value;

    $("#monstersNumber")[0].value = getRandomNumber(1,4);
    monstersNumber = $("#monstersNumber")[0].value ;

    //return false;
    
}


function getRandomNumber(min ,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    let characters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += characters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function startGame(){

    // $("#up")[0].value="ArrowUp";
    // $("#down")[0].value="ArrowDown";
    // $("#right")[0].value= "ArrowRight";
    // $("#left")[0].value= "ArrowLeft";

    $("#Ball_5Point")[0].value="#55aecc";
    $("#Ball_15Point")[0].value="#d275d5";
    $("#Ball_25Point")[0].value="#43e45b";

    $("#ballsNumber")[0].value = "50";
    
    $("#gameTimer")[0].value = "60";
    

    $("#monstersNumber")[0].value = "1";
    

    ////////////////

    startNewGame();
    // $('#mainWindow').children().hide()
    // $('#logo').show()
    // $('#nav').show()
    // $('#gamePage').show()
    // $('#gameUser').text("Welcome "  + username + " !");
    // //$('#settingsBoard').show()
    // $('#footer').show() 

  }

  