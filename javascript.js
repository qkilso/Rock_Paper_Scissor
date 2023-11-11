document.addEventListener('DOMContentLoaded', main)

function main() {
 const body = document.body;
 const rock = body.querySelector('#rock');
 const paper = body.querySelector('#paper');
 const scissor = body.querySelector('#scissor');
 const play = body.querySelector('#play');
 const winStatusHolder = body.querySelector('.win_status_holder');
 let currentComputerChoice = '';
 let currentUserChoice = ''
 let userPoint = 0;
 let computerPoint = 0;
 let tiePoint = 0;
 let currentHoverButton ='';

 
//get user's choice
function getUserChoice(options){
    choice = options.target;
    switch(choice){
        case rock:
            currentUserChoice = 'rock';
            break;
        case paper:
            currentUserChoice = 'paper';
            break;
        case scissor:
            currentUserChoice = 'scissor';   
            break;     
    }
    winStatusHolder.style.visibility = 'visible';
    winStatusHolder.style.color = 'black';
    winStatusHolder.style.backgroundColor = 'white';
    winStatusHolder.textContent = `${currentUserChoice}`;
    shootOn();
}


function addClickEvent(reset, play){
    if(play){
    rock.addEventListener('click', getUserChoice);
    paper.addEventListener('click', getUserChoice);
    scissor.addEventListener('click', getUserChoice);
    shoot.addEventListener('click', shootButtonClicked);
    const buttons = body.querySelectorAll('.choice');
    buttons.forEach((button) => addHover(button));
    }
    if(reset) reset.addEventListener('click', resetGame);

}

function removeClickEvent(stop){
    if(stop){
    rock.removeEventListener('click', getUserChoice);
    paper.removeEventListener('click', getUserChoice);
    scissor.removeEventListener('click', getUserChoice);
    }
}


//get computer's choice
function getComputerChoice(){
    let computerChoice = generateNumber();
    switch(computerChoice){
        case 1:
            //choice is rock
            return 'rock';
        case 2:
            return 'paper';
        case 3:
            return 'scissor';
    }
    console.log(computerChoice);
}

function generateNumber(){
    let max = 3;
    let min = 1;
    return (Math.floor(Math.random() * max + min));
}



//find winner
function findWinner(user, computer){
        switch(user){
            case 'rock':
                switch(computer){
                    case 'rock':
                        return 'tie';
                    case 'paper':
                        return 'computer';
                    case 'scissor':
                        return 'user';
                }
            case 'paper':
                switch(computer){
                    case 'rock':
                        return 'user';
                    case 'paper':
                        return 'tie';
                    case 'scissor':
                        return 'computer';
                }
            case 'scissor':
                switch(computer){
                    case 'rock':
                        return 'computer';
                    case 'paper':
                        return 'user';
                    case 'scissor':
                        return 'tie';
                }
        }
}






//display winner

function displayWinner(winner){
    winStatusHolder.style.textContent = `${winner}`;
}

const playHolder = body.querySelector('#play_holder');

//create shoot button
function createHoverButton(buttonName){
    
    const thisButton = document.createElement('button');
    thisButton.textContent = buttonName;
    thisButton.style.cssText = `
    border-radius: 10%;
    height: fit-content;
    width: fit-content;
    padding: 10px;
    background-color: black;
    font-size: 20px;
    color: white;
    visibility: visible;
    `;
    addHover(thisButton);
    playHolder.appendChild(thisButton);
    return thisButton;
}

//add hover to shoot button

function addColor(options){
    currentHoverButton = options.srcElement;
    const leftFrom = options.fromElement;

    if(leftFrom !== currentHoverButton){
        
        currentHoverButton.style.color = 'black';
        currentHoverButton.style.background = 'white';
    }
}

function removeColor(options){
    const leftFrom = options.fromElement;
    
    if(leftFrom === currentHoverButton){
        currentHoverButton.style.color = 'white';
        currentHoverButton.style.background = 'black';
    }
}


function addHover(button){
    button.addEventListener('mouseenter', addColor);
    button.addEventListener('mouseleave', removeColor);
    
}

const shoot = createHoverButton('shoot');
playHolder.removeChild(shoot);

function startGame(){
    play.remove();
    updateDescription(null);
    currentComputerChoice = getComputerChoice();
    addClickEvent(shoot, true);
    

}


function shootButtonClicked(){
    let winner = findWinner(currentUserChoice, currentComputerChoice);
    updateConsole(winner);
    currentComputerChoice = getComputerChoice();
    resetChoiceDisplay();
    
}

function shootOff(){
    playHolder.removeChild(shoot);
}

function shootOn(){
    playHolder.appendChild(shoot);
}

function resetChoiceDisplay(){
    shootOff();
}

function updateConsole(winner){
    updateDescription(winner);
    updatePoint(winner);
}

function updateDescription(winner){
    const descriptionOne = body.querySelector('.description.one');
    const descriptionTwo = body.querySelector('.description.two');
    const descriptionThree = body.querySelector('.description.three');

    if(winner){

        descriptionOne.textContent = `COMPUTER played ${currentComputerChoice}`;
        descriptionOne.style.color = 'red';
        descriptionTwo.textContent = `YOU played ${currentUserChoice}`;
        descriptionTwo.style.color = 'blue';
        switch(winner){
            case 'tie':
                descriptionThree.style.fontSize = '30px';
                descriptionThree.textContent = `its a ${winner}`;
                winStatusHolder.textContent = `${winner}`;

                break;
            default:
                descriptionThree.textContent = `the WINNER is ${winner}`;
                winStatusHolder.textContent = `${winner} won`;


        }


    } else {
        descriptionTwo.textContent = `Pick a choice`;
        descriptionThree.textContent = `Then shoot`;


    }

}

function updatePoint(winner){
    switch(winner){
        case 'user':
            userPoint++;
            break;
        case 'computer':
            computerPoint++;
            break;
        case 'tie':
            tiePoint++;
            break;
    }
    const pointPlayer = body.querySelector('.point.player');
    const pointComputer = body.querySelector('.point.computer');
    pointPlayer.textContent = userPoint;
    pointComputer.textContent = computerPoint;
    checkPoint(userPoint, computerPoint, winner);
}

function checkPoint(userPoint, computerPoint, winner){
    if(userPoint === 5){
        winStatusHolder.textContent = `Congrats you won`;

        shootOff();
        resetButton();

    } else if(computerPoint === 5){
        console.log(winStatusHolder);
        winStatusHolder.textContent = `you suck you lost`;

        resetButton();
        shootOff();


    }
}

function resetGame(options){
    reset = options.target;
    console.log(reset);
    playHolder.removeChild(reset);
    currentComputerChoice = '';
    currentUserChoice = ''
    userPoint = 0;
    computerPoint = 0;
    tiePoint = 0;
    currentHoverButton ='';
    resetDescription(true);
    shootOn();
    addClickEvent(null, true);
}

function resetButton(){
    removeClickEvent(true);
    const reset = createHoverButton('reset');
    addClickEvent(reset, false);
    winStatusHolder.textContent = `you won`;

}

function resetDescription(){
    const descriptionOne = body.querySelector('.description.one');
    const descriptionTwo = body.querySelector('.description.two');
    const descriptionThree = body.querySelector('.description.three');
        descriptionOne.textContent = `HELLO`;
        descriptionOne.style.color = 'black';
        descriptionTwo.textContent = `PICK ONE`;
        descriptionTwo.style.color = 'black';

        descriptionTwo.textContent = `Pick a choice`;
        descriptionThree.textContent = `Then shoot`;


}


//start the game :)
play.addEventListener('click', (options) => startGame());





}