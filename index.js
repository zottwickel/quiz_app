let score = 0;
let questionOn = 0;
let questionId = 0;

function start() {
    $('body').empty();
    $('body').append(`
        <header class="scoreboard">
            <span class="score">Score: ${score}/10</span>
            <span class="questionOn">Question: ${questionOn}/10</span>
        </header>
        <div class="hero">
            <h1 class="questionText">Welcome to the bike commuter quiz!</h1>
            <img class="icon" src="https://etc.usf.edu/clipart/68100/68146/68146_134_w11-1_b_md.gif" alt="A bicycle icon">
            <p class="answer">Get ready to test your knowledge about what it takes to commute via bicycle with this awesome app! When you're ready, push the button below to get started.</p>
            <form id="start">
                <input class="button" type="submit" value="Continue">
            </form>
        </div>
    `);
    $('#start').on("submit", function(e) {
        e.preventDefault();
        nextQuestion();
    });
};

function nextQuestion() {
    setIndex();
    setHero();
    $('.hero').append(`
        <h1 class="questionText">${STORE[questionId].question}</h1>
        <form id="answer">
        </form>
    `);
    STORE[questionId].answers.forEach(function(el) {
        $('#answer').append(`
            <div class="answer">
                <input id="${el}" type="radio" name="answer" value="${el}" required>
                <label for="${el}">${el}</label>
            </div>
        `);
    });
    $('#answer').append(`
        <input class="button" type="submit" value="Submit">
    `);
    $('#answer').on("submit", function(e) {
        e.preventDefault();
        if ($('input:checked').attr('id') == STORE[questionId].correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
};

function correctAnswer() {
    increaseScore();
    setHero();
    $('.hero').append(`
        <h1 class="questionText">Correct!</h1>
        <img class="icon" src="https://cdn.pixabay.com/photo/2012/04/24/11/19/bike-39393_960_720.png">
        <p class="answer">You answered correctly! Your score is now ${score}/10!</p>
        <form id="continue">
            <input class="button" type="submit" value="Continue">
        </form>
    `);
    $('#continue').on("click", function(e) {
        e.preventDefault();
        if (questionOn < 10) {
            nextQuestion();
        } else {
            end();
        }
    });
};

function wrongAnswer() {
    setHero();
    $('.hero').append(`
        <h1 class="questionText">Sorry! Wrong answer.</h1>
        <img class="icon" src="https://cdn.pixabay.com/photo/2013/04/01/11/00/no-biking-98885_960_720.png">
        <p class="answer">You answered incorrectly. The correct answer was \"${STORE[questionId].correct}\"</p>
        <form id="continue">
            <input class="button" type="submit" value="Continue">
        </form>
    `);
    $('#continue').on("click", function(e) {
        e.preventDefault();
        if (questionOn < 10) {
            nextQuestion();
        } else {
            end();
        }
    });
};

function end() {
    setHero();
    $('.hero').append(`
        <h1 class="questionText">Congratulations!</h1>
        <p class="answer">You have completed the Bike Commute Quiz! Your score was <em>${score}/10!</em> You can restart the quiz to try for a better score below.</p>
        <form id="restart">
            <input class="button" type="submit" value="Restart">
        </form>
    `);
    $('#restart').on("click", function(e) {
        e.preventDefault();
        resetStats();
        start();
    });
};

function resetStats() {
    score = 0;
    questionOn = 0;
    questionId = 0;
};

function increaseScore() {
    score++;
};

function setIndex() {
    questionId = questionOn;
    questionOn++;
};

function setHero() {
    $('.hero').empty();
    $('.questionOn').text(`Question: ${questionOn}/10`);
    $('.score').text(`Score: ${score}/10`);
    };

$(function () {
    start();
});