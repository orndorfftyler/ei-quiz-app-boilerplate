/*
 * Example store structure
 */
/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)


const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'In what year did Florida become a state?',
      answers: [
        '1845',
        '1869',
        '1902',
        '1801'
      ],
      correctAnswer: '1845'
    },
    {
      question: 'What is the most populous city in Florida?',
      answers: [
        'Jacksonville',
        'Miami',
        'Tallahassee',
        'Orlando'
      ],
      correctAnswer: 'Jacksonville'
    },
    {
      question: 'Excluding barrier islands, how many miles of coastline does Florida have?',
      answers: [
        '1350',
        'Miami',
        'Tallahassee',
        'Orlando'
      ],
      correctAnswer: '1350'
    },
    {
      question: 'What is the largest National Park in Florida?',
      answers: [
        'Everglades National Park',
        'Alafia River State Park',
        'Big Lagoon State Park',
        'Grayton Beach State Park'
      ],
      correctAnswer: 'Everglades National Park'
    },
    {
      question: 'What is the largest freshwater lake in Florida?',
      answers: [
        'Lake Okeechobee',
        'Lake Istokpoga',
        'Lake Eustis',
        'Crescent Lake'
      ],
      correctAnswer: 'Lake Okeechobee'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  //potential values of view: start, question, check, final 
  //(changed when submit button clicked)
  view: 'start'
};

function scoreKeeper() {    //used by multiple render functions
  let num = store.questionNumber;
  let score = store.score;
  return '\
    <h1>Florida Quiz</h1>\
    <p>Score '+ score +'/5</p>\
    <p>Question '+ num +'/5</p>\
';
}

//---------------------------startRender and helper functions

function startBuilder() {
  return '\
    <h2>Want to test your knowledge of Florida?</h2>\
    <form>\
        <button id="start" type="submit">Begin</button>\
    </form>\
  '
}


function startRender() {
  let startHeader = '<h1>Florida Quiz</h1>';
  $('header').html(startHeader);

  let startMain = startBuilder();
  $('main').html(startMain);
}
//---------------------------end of startRender and helper functions

//---------------------------questionRender and helper functions

function qGrabber() {
  let num = store.questionNumber;
  let q = store.questions[num].question;
  let a = store.questions[num].answers;
  return [q,a];
}

function qBuilder() {
  let qa = qGrabber();
  return '\
    <h2>' + qa[0] + '</h2>\
    <form>\
        <div>\
            <input id="a1" name="q" type="radio" value="Answer1">\
            <label for="a1">' + qa[1][0] + '</label>\
        </div>\
        <div>\
            <input id="b1" name="q" type="radio" value="Answer2">\
            <label for="b1">' + qa[1][1] + '</label>\
        </div>\
        <div>\
            <input id="c1" name="q" type="radio" value="Answer3">\
            <label for="c1">' + qa[1][2] + '</label>\
        </div>\
        <div>\
            <input id="d1" name="q" type="radio" value="Answer4">\
            <label for="d1">' + qa[1][3] + '</label>\
        </div>\
        <button id="question" type="submit">Submit</button>\
    </form>\
';
}

function questionRender() {
  let score = scoreKeeper();
  $('header').html(score);

  let question = qBuilder();
  $('main').html(question);
}

//---------------------------end of questionRender and helper functions

//---------------------------checkRender and helper functions

function correct() {
  return '\
    <h2>Correct!</h2>\
    <p>Good job!</p>\
    <form>\
        <button id="check" type="submit">Next</button>\
    </form>\
  ';
}

function incorrect(rightAnswer) {
  return '\
  <h2>Incorrect</h2>\
  <p>Correct answer was '+ rightAnswer +'</p>\
  <form>\
      <button id="check" type="submit">Next</button>\
  </form>\
';
}

function checkRender(state,rightAnswer) {
  let score = scoreKeeper();
  $('header').html(score);
  
  if (state) {
    let congrats = correct();
    $('main').html(congrats);
  
  } else {
    let niceTry = incorrect(rightAnswer);
    $('main').html(niceTry);
  }
}

//---------------------------end of checkRender and helper functions

//---------------------------finalRender and helper functions

function finalScore() {
  let score = store.score;
  return '\
    <h2>Final Score: '+ score +'/5</h2>\
  ';
}

function pass() {
  let fScore = finalScore();
  return fScore +'\
    <p>Congrats! Your knowledge of Florida is vast.</p>\
    <form>\
        <button id="final" type="submit">Again</button>\
    </form>\
    ';
}

function fail() {
  let fScore = finalScore();
  return fScore +'\
    <p>Good attempt!</p>\
    <form>\
        <button id="final" type="submit">Again</button>\
    </form>\
    ';
    
}

function finalRender(state) {
  let finalHeader = '<h1>Florida Quiz</h1>';
  $('header').html(finalHeader);

  if (state) {
    let passVal = pass();
    $('main').html(passVal);
  
  } else {
    let failVal = fail();
    $('main').html(failVal);
  }
}

//---------------------------end of finalRender and helper functions

function renderApp(state, rightAnswer) {
  if (store.view == 'start') {
    startRender();
  }
  if (store.view == 'question') {
    questionRender();
  }
  if (store.view == 'check') {
    checkRender(state, rightAnswer);
  }
  if (store.view == 'final') {
    finalRender(state);
  }

}

function handleStartClicked() {
  $('main').on('click', '#start', function(event) {
    event.preventDefault(); 
    store.view = 'question';
    renderApp();
  });
};

function qGrader(answer, qNum) {
  let correct = store.questions[qNum].correctAnswer;
  if (answer == correct) {
    store.score ++;
    return [true, correct];
  } else {
    return [false, correct];
  }
}

function handleSubmitClicked() {
  $('main').on('click', '#question', function(event) {
    event.preventDefault(); 

    let answer = $("input[name='q']:checked").siblings('label').text();
    let state = qGrader(answer,store.questionNumber); // no -1

    store.view = 'check';

    renderApp(state[0], state[1]);
  });
};

function questionOrFinalView() {
  if (store.questionNumber >= 5) {
    store.view = 'final';
  } else {
    store.view = 'question';
  }
}

function handleNextClicked() {

  event.preventDefault(); 
  store.questionNumber ++;
  questionOrFinalView();
  renderApp();
}

function handleQuizApp() {
  renderApp();
  handleStartClicked();
  handleSubmitClicked();
  handleNextClicked();
  //handleAgainClicked();
}

$(handleQuizApp);

