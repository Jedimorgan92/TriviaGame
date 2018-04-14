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
        timer();
    
    }); 
    
    // When the answer is clicked, this checks to see if the answer is right or wrong
    $("body").on("click", ".answer", function(event){
        answeredQuestion = true;
        // clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            console.log("CORRECT!");
            clearInterval(clock);
            win();
        }
        else {
            console.log("INCORRECT!");
            clearInterval(clock);
            loss();
        }
    });
    
    $("body").on("click", ".reset-button", function(event){
        reset();
    }); 
    
    });  
    
    // Create function that generates a loss due to running out of time
    function timeOutLoss() {
        unansweredCounter++;
        theGame = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".questionArea").html(theGame);
        setTimeout(wait, 3000);  
    }
    
    // Create function that generates a loss due to running out of time
    function win() {
        correctCounter++;
        theGame = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + images[questionCounter];
        $(".questionArea").html(theGame);
        setTimeout(wait, 3000);  
    }
    
    // Create function that generates aa loss
    function loss() {
        incorrectCounter++;
        theGame = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='./assets/images/wronganswer.webp'>";
        $(".questionArea").html(theGame);
        setTimeout(wait, 3000); 
    }
    
    // Generates the game HTML
    function generateHTML() {
        theGame = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[questionCounter] + "</p><p class='first-answer answer'>A. " + answers[questionCounter][0] + "</p><p class='answer'>B. "+answers[questionCounter][1]+"</p><p class='answer'>C. "+answers[questionCounter][2]+"</p><p class='answer'>D. "+answers[questionCounter][3]+"</p>";
        $(".questionArea").html(theGame);
    }
    
    function wait() {
        if (questionCounter < 3) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timer();
        }
        else {
            finalScreen();
        }
    }
    
    // Timer function
    function timer() {
        clock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(clock);
                timeOutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        theGame = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCounter + "</p>" + "<p>Wrong Answers: " + incorrectCounter + "</p>" + "<p>Unanswered: " + unansweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".questionArea").html(theGame);
    }
    
    // Reset the score, questions, game when the reset button is selected
    function reset() {
        questionCounter = 0;
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        counter = 30;
        generateHTML();
        timer();
    }
    
    // Variables 
    var startScreen;
    var theGame;
    var counter = 30;
    var questions = ["What was the name of the TV newsman that Blanche dated?", "How did the girls know that Sophia had been driving?", "Sopia sat on a park bench with a man. What was his name and what was wrong with him?", "Where was Rose from?"];
    var answers = [["Jerry Kennedy", "Bob Jones", "Jerry Orbach", "Richard Brown"], ["The car was missing", "The phonebook was missing", "She got arrested for speeding", "She wrecked the car"], ["Alfred, Parkinson's", "Alvin, Alzheimer's", "Adam, Dementia", "Arnold, Cancer"], ["Houston", "St. Olaf", "Denver", "New York"]];    
    var images = ["<img class='center-block img-right' src='./assets/images/jerrykennedy.jpg'>", "<img class='center-block img-right' src='./assets/images/phonebook.jpg'>", "<img class='center-block img-right' src='./assets/images/alvin.jpg'>", "<img class='center-block img-right' src='./assets/images/rose.jpeg'>"];
    var correctAnswers = ["A. Jerry Kennedy", "B. The phonebook was missing", "B. Alvin, Alzheimer's", "B. St. Olaf"];
    var questionCounter = 0;
    var selectAns;
    var clock;
    var correctCounter = 0;
    var incorrectCounter = 0;
    var unansweredCounter = 0;
