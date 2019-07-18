// // game button logic
// easy game has 4 boxes, medium has 9 hard has 16. Create rray of 16 colors. 
// create empty array, and each timethe game restarts, give it random numbers up to the length of the amount of game boxes. After boxes are created an given a color, as well as a number, give that array to itself several times, then shuffle. this will be the games logic for deciding what order the boxes will flash in. 

let boxNumber = []
let boxColor = ["red", "green", "blue", "yellow", "orange","purple","teal", "cyan", "gray", "brown", "black","tan", "violet", "magenta", "turquoise", "pink"]
let boxPosition =['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve','thirteen', 'fourteen', 'fifteen']

let main = document.querySelector('main')

// boxes will eventually be connected to difficulty level
let boxes 

//turn counter to control logic
let turn = 1	
let counter = 0 
let interval = null;
let pressNum = 0
let speed 
let score = 0
let increment 
//function creates the boxes for the game based on the difficulty, which is decides how many boxes to create. the random order for the game is also created
function initializeGame(){
	for (let i = 0; i<boxes; i++){
		let box = document.createElement('div')
		box.style.backgroundColor = boxColor[i]
		box.className = boxPosition[i] 
		// let boxNum = Math.random()
		box.id = boxColor[i]
		box.blinks = 0
		box.addEventListener('click', press)
		// boxNumber.push(boxNum)
		main.appendChild(box)

	}

//pushed a bunch of iterations of the boxnumbers to the box number array to create the game click logic

	for(let i = 0; i <20; i++){
		for(let k = 0; k<boxes; k++){
			boxNumber.push(Math.floor(Math.random()*boxes))
		}
	}
}





//create a box creator fiucntion to be called on button press

//need to create functionality for easy(4), medium (8) hard(12), to change the number of boxes created

//start button. in this iteration it will just test to see if the functionilty of cycling through different boxes works

// let startButton = document.querySelector(".start")
// startButton.addEventListener("click", startGame)



//added all of the buttons that control the iniatilizing of the game and the game difficulty
let difficulty = document.querySelectorAll(".difficult")


let easyButton = difficulty[1]
easyButton.addEventListener('click',easy)

let mediumButton = difficulty[2]
mediumButton.addEventListener('click',medium)

let impossibleButton = difficulty[3]
impossibleButton.addEventListener('click',impossible)

function easy(){
	boxes = 4
	initializeGame()
	hideDifficultyButtons()
	increment = 100
	speed = 500
	interval = setInterval(changeColor, speed)
}


function medium(){
	boxes = 8
	initializeGame()
	hideDifficultyButtons()
	increment = 250
	speed = 300
	interval = setInterval(changeColor, speed)
	
}

function impossible(){
	boxes = 16
	initializeGame()
	hideDifficultyButtons()	
	speed = 100
	increment = 500
	interval = setInterval(changeColor, speed)
}



// logic for quit button. deletes all the boxes and sets the turns back to zero

let inGameButtons = document.querySelectorAll(".inGame")



let quitButton = inGameButtons[1]


let scoreUpdate = document.querySelector("#points")


quitButton.addEventListener('click', reset)

function reset(){
	
	if(main.childElementCount > 0){
		while (main.hasChildNodes()) {
		    main.removeChild(main.lastChild)   

		}
	}
	restoreButtons()
	turn = 1	
	counter = 0 
	clearInterval(interval)
	pressNum = 0
	boxNumber = []
	score = 0
	scoreUpdate.innerText = '0000'

}

//function hids all the items of class difficult so that only in game buttons show up.

let chooseDiff = document.querySelector('.chooseDiff')


function hideDifficultyButtons(){
	chooseDiff.style.display = "none"
	for(let j = 1; j < difficulty.length	; j++){
		difficulty[j].style.visibility = "hidden"
		
	}
	for(let k = 0; k <inGameButtons.length; k ++){
		inGameButtons[k].style.visibility = "visible"
	}
}
//Brings buttons bacxk after a reset
function restoreButtons(){
	chooseDiff.style.display = ""
	for(let j = 1; j < difficulty.length	; j++){
		difficulty[j].style.visibility = "visible"
		
	}
	for(let k = 0; k <inGameButtons.length; k ++){
		inGameButtons[k].style.visibility = "hidden"
	}
}



//Start game function begins game. start game looks in the box number array, which has the randomized order, grabs the number at the index that corresponds with the turn, and uses that to select which box, based on that index in the box position array


function changeColor(){

	//gets uses the turn or counter number to find the "boxnumber", which is the randomized index number. it then finds what box is at that position
	if(counter === turn){
		 return clearInterval(interval)
	}

	let selectBox = boxPosition[boxNumber[Math.floor(counter)]]
	let glowBox = document.querySelector(`.${selectBox}`)
	if (glowBox.style.backgroundColor != "white"){
			glowBox.style.backgroundColor = "white"
			// glowBox.blinks ++	
		}else{
			glowBox.style.backgroundColor = `${glowBox.id}`
// 			glowBox.blinks ++
// 			console.log(glowBox.style.backgroundColor)
// 			console.log(glowBox.blinks)	
	}
	counter += .5
	
}
	
// when player presses button, it needs to check that the position of that button is equal to the thing at the same index in the boxNumber array. then it updates the press until it equals to turn. if it does that successfully, it turns press back to  0, counter back to 0, and turn goes up by 1

let scoreBoard = document.querySelector('.high') 

function press(){
	let click = boxPosition.indexOf(this.className)

	if (click === boxNumber[pressNum]){
		pressNum++
		if (pressNum === turn){
			turn ++
			pressNum = 0
			counter = 0
			score += increment
			scoreUpdate.innerText = score
			interval = setInterval(changeColor, speed)
			
		}

	}else{
		if (score > 1000) {
			
			addHighScore()			
			alert(`Congratulations, you scored ${score} points!`)
			reset()
			



		}else{
		
		addHighScore()
		reset()
		alert("Sorry, you have lost the game, try again!!")
		
		}
		
	}



}
let scoreArray = []

//to adds the score to the scoreboard and re-sorts each time
function addHighScore(){
		
	if(scoreBoard.childElementCount > 0){
			while (scoreBoard.childElementCount > 0) {
			    scoreBoard.removeChild(scoreBoard.lastChild)   

			}
		}

	
	if(scoreArray.length === 0){
		scoreArray.push(score)
	}else{
		
		let spot 
		for(let j = 0; j < turn; j++){
			if (score === scoreArray[j]) {
				break
			}else if(score > scoreArray[j]){
				scoreArray.splice(j,0,score)
				break
			}
		}
		

	}

		// scoreArray = scoreArray.sort()

		
		
		
		for(let i = 0; i < scoreArray.length;i++){
			let li = document.createElement('li')
			li.innerText = scoreArray[i]
			scoreBoard.appendChild(li)
		}
	}
// 	}
// }