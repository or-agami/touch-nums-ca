'use strict'

const elTitle = document.querySelector('.number-or-score h2')
const elBestScore = document.getElementById('best-score')
var tableNums = []
var bestScore = Infinity
var tableSize, currNum, startTime, endTime

function init(elButton = document.querySelector('button')) {
    elTitle.innerText = 'bestScore()'
    levelSelect(elButton)
}

function levelSelect(elButton) {
    var buttons = document.querySelectorAll('button')
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = '#4e4f50'
        buttons[i].classList.remove('selected-level')
    }
    elButton.style.backgroundColor = '#2374e1'
    elButton.classList.add('selected-level')
    tableSize = +elButton.classList[0]
    tableNums = getGameNums(tableSize)
}

function startGame(elButton) {
    if (elButton.innerText === 'game(start)') {
        elButton.innerText = 'game(reStart)'
    }
    else restartGame()
    resetTimer()
    currNum = 1
    elTitle.innerText = 'nextNumber()'
    let elTable = document.querySelector('.table-layout')
    elTable.innerHTML = getGameTable()
    updateStat()
    startTimer()
}

function checkAnswer(elTableCell) {
    if (+elTableCell.innerText === currNum) {
        elTableCell.classList.replace('unchecked', 'checked')
        if (currNum === tableSize) endGame()
        else {
            currNum++
            updateStat()
        }
    }
    else {
        elTableCell.classList.toggle('wrong')
        setTimeout(() => { elTableCell.classList.toggle('wrong') }, 100)

    }
}

function updateStat() {
    let elNextNumber = document.querySelector('.next-number')
    elNextNumber.innerText = currNum
}

function endGame() {
    elTitle.innerText = 'bestScore()'
    let timeElaps = stopTimer()
    if (timeElaps < bestScore) {
        bestScore = timeElaps
        alert(`You broke your Best Score!! \nYour best score now is: ${bestScore}`)
    }
    elBestScore.innerText = bestScore
}

function restartGame() {
    tableNums = []
    let elLevelButton = document.querySelector('.selected-level')
    levelSelect(elLevelButton)
}

function getGameTable() {
    let gameTable = ''
    let tableRows = Math.sqrt(tableSize)
    let tableCols = tableRows
    let cellNumber = 1
    let tableRow = { start: '<tr>\n', end: '</tr>\n' }
    let tableData = { start: `<td class="unchecked" onclick="checkAnswer(this)">`, end: '</td>\n' }

    for (let i = 1; i < tableRows + 1; i++) {
        gameTable += tableRow.start
        for (let j = 1; j < tableCols + 1; j++) {
            gameTable += tableData.start
            gameTable += tableNums.shift()
            gameTable += tableData.end
            cellNumber++
        }
        gameTable += tableRow.end
    }
    return gameTable
}

function getGameNums(maxNum) {
    let nums = []
    let randomNums = []
    for (let i = 0; i < maxNum; i++) {
        nums.push(i + 1)
    }
    for (let i = 0; i < maxNum; i++) {
        let randomNum = nums.splice(getRandomInt(nums.length - 1), 1)
        randomNums.push(randomNum[0])
    }
    return randomNums
}

function getRandomInt(max) {
    return Math.floor(Math.random() * ((max) + 1))
}
