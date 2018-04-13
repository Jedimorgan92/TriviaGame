$(document).ready(function() {
    
    function homeScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button'>Start</a></p>";
        $(".questionArea").html(startScreen);
    }
    // Call the function
    homeScreen();
    
    // Function that starts the trivia game when the start button is clicked and starts the timer
    $("body").on("click", ".start-button", function(event){
        generateHTML();
        timerWrapper();
    
    }); 
    
    // When the answer is clicked, this checks to see if the answer is right or wrong
    $("body").on("click", ".answer", function(event){
        answeredQuestion = true;
        // clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            console.log("CORRECT!");
            clearInterval(theClock);
            generateWin();
        }
        else {
            console.log("INCORRECT!");
            clearInterval(theClock);
            generateLoss();
        }
    });
    
    $("body").on("click", ".reset-button", function(event){
        // clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".questionArea").html(gameHTML);
        setTimeout(wait, 3000);  
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".questionArea").html(gameHTML);
        setTimeout(wait, 3000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='./assets/images/wronganswer.webp'>";
        $(".questionArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".questionArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 2) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".questionArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["What was the name of the TV newsman that Blanche dated?", "How did the girls know that Sophia had been driving?", "Sopia sat on a park bench with a man. What was his name and what was wrong with him?"];
    var answerArray = [["Jerry Kennedy", "Bob Jones", "Jerry Orbach", "Richard Brown"], ["The car was missing", "The phonebook was missing", "She got arrested for speeding", "She wrecked the car"], ["Alfred, Parkinson's", "Alvin, Alzheimer's", "Adam, Dementia", "Arnold, Cancer"]];    
    var imageArray = ["<img class='center-block img-right' src='./assets/images/jerrykennedy.jpg'>", "<img class='center-block img-right' src='./assets/images/phonebook.jpg'>", "<img class='center-block img-right' src='./assets/images/alvin.jpg'>"];
    var correctAnswers = ["A. Jerry Kennedy", "B. The phonebook was missing", "B. Alvin, Alzheimer's"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    // var clickSound = new Audio("sound/button-click.mp3");