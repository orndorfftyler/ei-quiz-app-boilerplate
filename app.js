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
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING
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
        'Tallahassee',
        'Miami',
        'Jacksonville',
        'Orlando'
      ],
      correctAnswer: 'Jacksonville'
    },
    {
      question: 'Excluding barrier islands, how many miles of coastline does Florida have?',
      answers: [
        '1350',
        '958',
        '576',
        '215'
      ],
      correctAnswer: '1350'
    },
    {
      question: 'What is the largest National Park in Florida?',
      answers: [
        'Alafia River State Park',
        'Everglades National Park',
        'Big Lagoon State Park',
        'Grayton Beach State Park'
      ],
      correctAnswer: 'Everglades National Park'
    },
    {
      question: 'What is the largest freshwater lake in Florida?',
      answers: [
        'Lake Eustis',
        'Lake Istokpoga',
        'Lake Okeechobee',
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
  let num = store.questionNumber + 1;

  if (store.view == 'start') {
    num = store.questionNumber;
  }

  let score = store.score;
  return '\
    <h1>Florida Quiz</h1>\
    <div class="mobile">\
    <p>Score '+ score +'/5</p>\
    <p>Question '+ num +'/5</p>\
    </div>\
';
}

//---------------------------startRender() and helper functions

function startBuilder() {
  return '\
    <form>\
      <h2>Want to test your knowledge of Florida?</h2>\
      <button id="start" type="submit">Begin</button>\
    </form>\
  '
}

function startRender() {
  let score = scoreKeeper();
  $('header').html(score);

  let startMain = startBuilder();
  $('main').html(startMain);
}
//---------------------------end of startRender() and helper functions

//---------------------------questionRender() and helper functions

function qGrabber() {
  let num = store.questionNumber;
  let q = store.questions[num].question;
  let a = store.questions[num].answers; // a will be an array of 4 strings
  return [q,a];
}

function qBuilder() {
  let qa = qGrabber();
  return '\
    <form>\
    <h2>' + qa[0] + '</h2>\
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

//---------------------------end of questionRender() and helper functions

//---------------------------checkRender() and helper functions

function correct() {
  return '\
    <form>\
      <h2>Correct!</h2>\
      <p>Good job!</p>\
      <button id="check" type="submit">Next</button>\
    </form>\
  ';
}

function incorrect(rightAnswer) {
  return '\
  <form>\
    <h2>Incorrect</h2>\
    <p>Correct answer was '+ rightAnswer +'</p>\
    <button id="check" type="submit">Next</button>\
  </form>\
';
}

function checkRender(state, rightAnswer) {
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

//---------------------------end of checkRender() and helper functions

//---------------------------finalRender() and helper functions

function finalScore() {
  let score = store.score;
  let final = '\
    <h2>Final Score: '+ score +'/5</h2>\
  ';
  if (score >= 5) {
    return pass(final);
  } else {
    return fail(final);
  }
}

function pass(final) {
  return '\
    <form>\
      '+ final +'\
      <p>Congrats! Your knowledge of Florida is vast.</p>\
      <button id="final" type="submit">Again</button>\
    </form>\
    ';
}

function fail(final) {
  return '\
    <form>\
      '+ final +'\
      <p>Not perfect, but good attempt!</p>\
      <button id="final" type="submit">Again</button>\
    </form>\
    ';
}

function finalRender() {
  let score = scoreKeeper();
  $('header').html(score);

  let finalMain = finalScore();
  $('main').html(finalMain);
}

//---------------------------end of finalRender() and helper functions

//---------------------------render() function

function render(state, rightAnswer) {
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
    finalRender();
  }
}

//---------------------------event handler functions and helper functions

function startButtonClicked() {
  $('main').on('click', '#start', function(event) {
    event.preventDefault(); 
    store.view = 'question';
    render();
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

function questionButtonClicked() {
  $('main').on('click', '#question', function(event) {
    event.preventDefault(); 

    let answer = $("input[name='q']:checked").siblings('label').text();
    
    if (answer != "") {
      let state = qGrader(answer, store.questionNumber); 
      store.view = 'check';
      render(state[0], state[1]);
      }
  });
};

function questionOrFinalView() {
  if (store.questionNumber >= 4) {
    store.view = 'final';
  } else {
    store.questionNumber ++;
    store.view = 'question';
    console.log('q to:'+ store.questionNumber);
  }
}

function checkButtonClicked() {
  $('main').on('click', '#check', function(event) {
    event.preventDefault(); 
    questionOrFinalView();
    render();
  });
}

function finalButtonClicked() {
  $('main').on('click', '#final', function(event) {
    event.preventDefault(); 
    store.questionNumber = 0;
    store.score = 0;
    store.view = 'start';
    render();
  });
}

function handleQuizApp() {
  render();
  startButtonClicked();
  questionButtonClicked();
  checkButtonClicked();
  finalButtonClicked();
}

$(handleQuizApp);

