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
            <button class="button" type="submit">Continue</button>
        </div>
    `);
    $('.button').click(function() {nextQuestion()});
};

function nextQuestion() {
    setIndex();
    $('.hero').empty();
    $('.questionOn').text(`Question: ${questionOn}/10`);
    $('.hero').append(`
        <h1 class="questionText">${STORE[questionId].question}</h1>
    `);
    STORE[questionId].answers.forEach(function (el) {
        $('.hero').append(`
            <div class="answer">
                <input id="${el}" type="radio" name="answer" value="${el}">
                <label for="${el}">${el}</label>
            </div>
        `);
    });
    $('.hero').append(`
        <button class="button" type="submit">Submit</button>
    `);
    $('.button').click(function() {checkAnswer()});
};

function setIndex() {
    questionId = questionOn;
    questionOn++
};

$(function () {
    start();
});