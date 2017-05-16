var path = "assets/images/";
var startpic = "assets/images/start.png";
var nickCage = "assets/images/end.png";
var png = ".png";


var guesses = 11;
var guesscounter = 11;
var pic = 0;
var piccounter = 0;

var play = true;
var done = false;
var first = true;

var ammend = '';
var used = [];
var nonalpha = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight", "Alt", "CapsLock", "Shift", "Control", "Tab", "Backspace", "Enter", "Delete", "Insert", "PrintScreen", "Escape", "Meta"];
var checkme = [];
var copy = [];
var answer = "ayywhatup";
var showme = '';
var absent = -1;

//make answer into array of chars to check using indexof
checkme = answer.split('');
//Create the blank spaces to show on page
for (var i = 0; i < checkme.length; i++) {
    showme += "_ ";
}
showme = showme.toString();
document.getElementById("answer").innerHTML = showme;
showme = showme.split('');

//initialize count
document.getElementById("count").innerHTML = guesscounter;

document.onkeyup = function(event) {
        // Determine which key was pressed
        var userGuess = event.key;
        // check if alphabet
        //alert("you pressed " + userGuess);

        if (userGuess.search(/^[a-zA-Z]+$/) === absent || nonalpha.indexOf(userGuess) != absent) {
            alert("Use the alphabet dick");
        } else {
            if (play) {
                //check if has been used before (true if has been)
                if (used.indexOf(userGuess) != absent) {
                    alert("You already guessed that bro");
                }
                // HASNT BEEN USED
                else {
                    //in the answer? (true if is)
                    if (checkme.indexOf(userGuess) != absent) {
                        alert("Correct Guess!");
                        used.push(userGuess);
                        //push correct guess to screen
                        for (var i = 0; i < checkme.length; i++) {
                            if (checkme[i] == userGuess)
                                showme[i * 2] = userGuess;
                        } //end for
                        showme = showme.join('');
                        showme = showme.toString();
                        document.getElementById("answer").innerHTML = showme;
                        showme = showme.split('');

                        //check if done
                        //this shallow copy is giving me trouble, havent used 'new' in javascript dont know how to make it not a reference
                        // copy = showme;

                        // tried work around with this line below, but it becomes and object, not an array
                        //copy = Object.assign({},showme);

                        //will make a function to copy elements individually
                        copy = copyarray(showme);

                        // remove spaces from array to check if showme == answer
                        for (var i = 1; i < copy.length; i++) {
                            copy.splice(i, 1);
                            // would have been easier to find the spaces with indexof(' ') because when you remove an item the index is changed
                            // array[0] = a array[1] = ' ' when spliced array[0] = a array[1] = y 
                        }
                        // done
                        // console.log(copy);
                        // console.log(answer);

                        if (copy.join('') == answer) {
                            alert("You Win!");
                            if (confirm("Play Again?")) {
                                reset();
                            } else {
                                window.close();
                            }
                        }
                    }
                    // wrong guess
                    else {
                        piccounter++;
                        guesscounter--;
                        // last guess
                        if (piccounter > guesses) {
                            document.getElementById("pic").src = nickCage;
                            alert("You Lose!");
                            if (confirm("Play Again?")) {
                                reset();
                            } else {
                                window.close();
                            }
                        } else {
                            //change guess count
                            document.getElementById("count").innerHTML = guesscounter;
                            //add guess to used array
                            used.push(userGuess);
                            //print guess to screen
                            ammend = document.getElementById("guesses").innerHTML;
                            if (first) {
                                ammend += userGuess;
                                document.getElementById("guesses").innerHTML = ammend
                                first = false;

                            } else {
                                ammend += ", " + userGuess;
                                document.getElementById("guesses").innerHTML = ammend;

                            }
                            // change picture
                            path = "assets/images/";
                            pic = piccounter;
                            pic.toString();
                            pic += png;
                            path += pic;
                            document.getElementById("pic").src = path;
                        } // end change picture
                    } // end wrong guess else
                } // end else if used
            } // end if play


        } // end is alphabet else


    } // end keystroke function

function reset() {
    document.getElementById("pic").src = "assets/images/start.png"
    piccounter = 0;
    used = [];
    showme = [];
    guesscounter = 0;
    for (var i = 0; i < checkme.length; i++) {
        showme += "_ ";
    }
    showme = showme.toString();
    document.getElementById("answer").innerHTML = showme;
    showme = showme.split('');

    document.getElementById("guesses").innerHTML = "Incorrect Guesses : ";

}

//make a deep copy of array 'x' and return it
function copyarray(x) {
    var newcopy = [];
    var index = null;
    for (var i = 0; i < x.length; i++) {
        index = x[i];
        newcopy[i] = index;
    }
    return newcopy;
} //end copyarray
