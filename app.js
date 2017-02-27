//>>>>>>>>>QUESTIONS<<<<<<<<<<
//how to incorporate images, for win/lose / refresh state? 
//click on image to restart the test >>> extra 


//>>>>>>>>>STATE<<<<<<<<<<
//objects store data! 
var state = {	
	questions: [
	{name: 'What does a GB stand for?',
	choices: ['gigabyte', 'gigabit','gigaflop', 'gigarop'],
	answer: 'gigabyte'},

	{name: 'what is the shorthand for the highest screen resolution on consumer monitors today? ',
	choices: ['2p', '2K','3K', '4K'],
	answer: '4K'},

	{name: 'The _______ is a streaming box that is low cost and popular for streaming content from the internet.',
	choices: ['google chrome','roku','pixel','hammer'],
	answer: 'roku'},

	{name: 'This cable is used to connect modern high definition Televisions',
	choices: ['CDRW','HDMI','DVDRW','BLURAY'],
	answer: 'HDMI'}
	],

	quesCount: 0, 
	quesCounter: ['1 of 4','2 of 4','3 of 4','4 of 4'],
	currentCounter: 0,
	currentQuestion: 0,
	score: 0, 
}; 

//>>>>>>>>>STATE MOD FUNCTIONS<<<<<<<<<<


//>>>>>>>>>RENDER FUNCTIONS<<<<<<<<<<

function checkAnswer (state) {
	var i = state.currentQuestion; //change i
	var current = state.questions[i].answer; //make var currentAnswer 
	var selected = $("input[name='questionChoice']:checked").val();
	if(current === selected) {
		$('#messageDiv').html('CORRECT!!! The Answer is: ' + current + ' !!!!!');
		state.score++; 		
	} else {
		$('#messageDiv').html('WRONG! The right answer is:' + current + '!!!!!'); 
	};
}


function renderScore () { 
	// var score = state.score;
	// console.log(score);
	$('#currentScore').html('current score is: ' + state.score); 
}

function renderQuestion (state) {
	var question = '';
	var current = state.questions[state.currentQuestion]; 
	console.log(current);
	question += '<div>' + current.name + '</div> <ul>';
	for(i = 0; i < current.choices.length; i++) {
	question += '<li> <input type= "radio" name="questionChoice" value="' + current.choices[i] + '">' + current.choices[i]  +'</li>';
	}
	question +=  '</ul>';
	$('#questionPanel').html(question);
	//tyring to get currentQuestion to step up by 1 and cylce through the questions. 
	// calcQuesCounter(current);
	// switchQues(state, current); //more elegant way to call these?? 
	renderScore();
};


//tried to copy renderQuestion to get 2nd question to appear, it worked! How to automate? 
// function renderQuestion2 (state) {
// 	var question = '';
// 	var current = state.questions[state.currentQuestion + 1];//!!!!!!!!!!
// 	question += '<div>' + current.name + '</div> <ul>';
// 	for(i = 0; i < current.choices.length; i++) {
// 	question += '<li> <input type= "radio" name="questionChoice" value="' + current.choices[i] + '">' + current.choices[i]  +'</li>';
// 	}
// 	question +=  '</ul>';
// 	$('#questionPanel').html(question);
// 	calcQuesCounter(current);
// 	switchQues(state, current); 
// }

//more elegant way to call these?? 
// maybe make a function that just feeds in the new CurrentQuestion??? 


//loop through the ques counter and show
//possibly a new button to fire off next ques 
//event on next, look at current question, compare answer increment if correct, msg if incorrect, msg if correct. 
//use timeout on msg box, so it goes away. 
//reset/ refresh button still??
//do another #mainForm dom call?? 
// >>>>>>>>>START HERE SEE IF I CAN RENDER ANOTHER QUESTION!!!!! 

//>>>>>>>>>>>>>>>>TESTING TIMEOUT<<<<<<<<<<<<<<<<<
// function quesSwitch (state, question) {
// 	$('#questionPanel').hide(100);
// }; 

//>>>>>>>>>EVENTS<<<<<<<<<<


//>>>>>>>> make reset button / start over button . 


// $('#testButton').submit(function (event) {
// 	event.preventDefault();
// 	renderQuestion2()

// }):

// $('#testButton').submit(function(event) { //start here! 
//   event.preventDefault();
//   renderQuestion2(state);
//   renderQuestion2(state);
//   $(this).addClass('hidden')
// });

//target the mainForm DOM, with the updated currentQuestion
//where 1st question appeared and pass it 
//the .html() method and then inside call the renderQuestion func?? 
//to c
function hidePanels () {
	$('#quizPanel').addClass('hidden');
  $('#startPanel').addClass('hidden');
  $('#finishPanel').addClass('hidden');
}

function showPanels (name) {
	$(name).removeClass('hidden');
}

$('#mainForm').submit(function(event) { //start here! 
  event.preventDefault();
  state.currentQuestion = 0;
  renderQuestion(state);
  hidePanels();
  showPanels('#quizPanel');
});

$('#restartForm').submit(function(event) { //start here! 
  event.preventDefault();
  hidePanels();
  showPanels('#startPanel');
});

$('#questionForm').submit(function (event){
	event.preventDefault();
	checkAnswer(state);
	if(state.currentQuestion === state.questions.length-1){
		hidePanels();
		showPanels('#finishPanel');		
	} else {
		state.currentQuestion++;
		renderQuestion(state);
	};
});


	


