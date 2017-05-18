var path = "assets/images/";
var startpic = "assets/images/start.png";
var nickCage = "assets/images/end.png";
var png = ".png";

var input = '';

var guesses = 11;
var guesscounter = 11;
var piccounter = 0;

var play = false;
var win = false;
var first = true;

var ammend = '';
var used = [];
var nonalpha = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight", "Alt", "CapsLock", "Shift", "Control", "Tab", "Backspace", "Enter", "Delete", "Insert", "PrintScreen", "Escape", "Meta"];
var checkme = [];
var copy = [];
var answer = "ayywhatup";
var showme = '';
var absent = -1;

document.onkeyup = function(event) {
        // PLAYER 1 SETUP
        if (!play) {
            //validate input text
            document.getElementById("word").onkeyup = function(event) {
                // Determine which key was pressed
                var userGuess = event.key;
                // check if alphabet
                //alert("you pressed " + userGuess);
                if (userGuess.search(/^[a-zA-Z]+$/) === absent) {
                    alert("You know, I trusted you, but you had to go and input something that isn't a letter");
                    input = document.getElementById("word").value;
                    input = input.split('');

                    // remove the dirty non-alphabet character
                    // can search through input to find if multiple keys were pressed at same time
                    // to remove the faulty character but too lazy 
                    if (input.length > 0) {
                        input.length--;
                        document.getElementById("word").value = input.join('');
                    }

                }
            }
        } //end player1 if
        //HANGMAN GAME CODE
        else {
            // Determine which key was pressed
            var userGuess = event.key;
            // check if alphabet
            //alert("you pressed " + userGuess);

            if (userGuess.search(/^[a-zA-Z]+$/) === absent || nonalpha.indexOf(userGuess) != absent) {
                alert("Use the alphabet dick");
            } else {
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
                        showcorrect();

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
                        if (copy.join('') == answer) {
                            win = true;
                            end(win);
                        }
                    }
                    // wrong guess
                    else {
                        piccounter++;
                        guesscounter--;
                        // last guess
                        if (piccounter > guesses) {
                            win = false;
                            end(win);
                        } else {
                            //change guess count
                            document.getElementById("count").innerHTML = guesscounter;
                            //add guess to used array
                            used.push(userGuess);
                            //print guess to screen
                            ammend = document.getElementById("guesses").innerHTML;
                            //dont want no commas before the first letter of the list
                            if (first) {
                                ammend += userGuess;
                                document.getElementById("guesses").innerHTML = ammend
                                first = false;
                            } else {
                                ammend += ", " + userGuess;
                                document.getElementById("guesses").innerHTML = ammend;

                            }
                            // change picture
                            changepix(piccounter);
                        } // end change picture
                    } // end wrong guess else
                } // end else if used
            } // end is alphabet else
        } // end keystroke function
    } //end if play


// le functions
//display correct guess on screen
function showcorrect() {
    showme = showme.join('');
    showme = showme.toString();
    document.getElementById("answer").innerHTML = showme;
    showme = showme.split('');
}//end showcorrect()

// Called on button press Switch from player 1 to player 2
// pull word from textbox add it to "answer"
function begin() {
    input = document.getElementById("word").value;
    document.getElementById("p1").style.display = "none";
    document.getElementById("p2").style.display = "block";
    answer = input;
    play = true;
    initialize(checkme, answer, showme, guesscounter);
}//end begin()

// function puts answers blanks and guess counter to screen
// thought arguments were naturally reference not value in javascript, guess not.
function initialize(c, a, s, g) {
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
}//end initialize()

function changepix(x) {
    var pic = 0;
    path = "assets/images/";
    pic = x;
    pic.toString();
    pic += png;
    path += pic;
    document.getElementById("pic").src = path;
}//end changepix()

// self explainatory
function reset() {
    play = false;
    document.getElementById("pic").src = "assets/images/start.png"
    piccounter = 0;
    used = [];
    showme = [];
    guesscounter = 11;
    guesses = 11;
    first = true;
    // for (var i = 0; i < checkme.length; i++) {
    //     showme += "_ ";
    // }
    // showme = showme.toString();
    // document.getElementById("answer").innerHTML = showme;
    // showme = showme.split('');
    document.getElementById("guesses").innerHTML = "Incorrect Guesses : ";
    document.getElementById("p1").style.display = "block";
    document.getElementById("p2").style.display = "none";
}// end reset()

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

function end(b) {
    if (b) {
        alert("You Win!");
        if (confirm("Play Again?"))
            reset();
        else
            window.close();
    } else {
        document.getElementById("pic").src = nickCage;
        alert("You Lose!");
        if (confirm("Play Again?"))
            reset();
        else
            window.close();
    } //endelse
}//end end()