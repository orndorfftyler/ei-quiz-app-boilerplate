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
  //potential values: start, question, check, final 
  //(changed when submit button clicked)
  view: 'question'
};



function scoreKeeper() {
  let num = store.questionNumber;
  let score = store.score;
  return '\
    <h1>Florida Quiz</h1>\
    <p>Score '+ score +'/5</p>\
    <p>Question '+ num +'/5</p>\
';
}

function qGrabber() {
  let num = store.questionNumber;
  return store.questions[num].question;
}

function aGrabber() {
  let num = store.questionNumber;
  return store.questions[num].answers;
}


function qBuilder() {
  let question = qGrabber();
  let answers = aGrabber();
  return '\
    <h2>' + question + '</h2>\
    <form>\
        <div>\
            <input id="a1" name="q" type="radio" value="Answer1">\
            <label for="a1">' + answers[0] + '</label>\
        </div>\
        <div>\
            <input id="b1" name="q" type="radio" value="Answer2">\
            <label for="b1">' + answers[1] + '</label>\
        </div>\
        <div>\
            <input id="c1" name="q" type="radio" value="Answer3">\
            <label for="c1">' + answers[2] + '</label>\
        </div>\
        <div>\
            <input id="d1" name="q" type="radio" value="Answer4">\
            <label for="d1">' + answers[3] + '</label>\
        </div>\
        <button type="submit">Submit</button>\
    </form>\
';
}

function startRender() {

}

function questionRender() {
  let score = scoreKeeper();
  $('header').html(score);

  let question = qBuilder();
  $('main').html(question);
}

function checkRender() {

}

function finalRender() {

}

function renderApp() {
  if (store.view == 'start') {
    startRender();
  }
  if (store.view == 'question') {
    questionRender();
  }
  if (store.view == 'check') {
    checkRender();
  }
  if (store.view == 'final') {
    finalRender();
  }

}

function handleQuizApp() {
  renderApp();
  //handleStartClicked();
  //handleSubmitClicked();
  //handleNextClicked();
  //handleAgainClicked();
}

$(handleQuizApp);

