const game =  document.querySelector('.main-container')
const selection = game.querySelector('.game-icons')
const yourScore = document.querySelector('[data-your-score]')
const computerScore = document.querySelector('[data-computer-score]')
const finalColumn = document.querySelector('[data-final-column]')

const selections = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    }
]

const getUserScore = () =>{
    return parseInt(localStorage.getItem('userScore')) || 0;
}

const getComputerScore = () =>{
    return parseInt(localStorage.getItem('computerScore')) || 0;
}

const setUserScore = (score) =>{
    localStorage.setItem('userScore', score.toString())
}

const setComputerScore = (score) =>{
    localStorage.setItem('computerScore', score.toString())
}

let userScore = getUserScore()
let computerScoreValue = getComputerScore()
yourScore.innerText = userScore;
computerScore.innerText = computerScoreValue;

selection.addEventListener("click", e =>{
    if (e.target.matches('i')){
        const selectionName = e.target.parentElement.dataset.selection
        const option = selections.find(selection => selection.name === selectionName)
        makeSelection(option)
    }
})

const makeSelection = (option) =>{
    const computerSelection = randomSelection()
    const yourWinner = isWinner(option, computerSelection)
    const computerWinner = isWinner(computerSelection, option)

    clearSelectionResults()
    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(option, yourWinner)

    if (yourWinner) incrementScore(yourScore)
    if (computerWinner){
        incrementScore(computerScore)
        computerScoreValue = parseInt(computerScore.innerText)
        setComputerScore(computerScoreValue)
    }
}

const incrementScore = (score) =>{
    score.innerText = parseInt(score.innerText) + 1
    userScore = parseInt(score.innerText)
    setUserScore(userScore)
}

const addSelectionResult = (selection, winner) => {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    // computerScore.after(div)
    finalColumn.append(div)
}

const clearSelectionResults = () =>{
    const resultDivs = document.querySelectorAll('.result-selection');
    resultDivs.forEach(div => div.remove())
}

const isWinner = (selection, opponentSelection) =>{
    return selection.beats === opponentSelection.name
}

const randomSelection =  () =>{
    const randomIndex = Math.floor(Math.random()* selections.length)
    return selections[randomIndex]
}





