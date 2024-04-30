import { horizontal, vertical, slant } from "./winconditions.js";


let buttonNumber = 4;
let game = false;
const inputButtonNumber = document.querySelector('.js-input-button-number');
const playButton = document.querySelector('.play-button')

playButton.addEventListener('click', ()=>{
  buttonNumber = Number(inputButtonNumber.value)
  if (buttonNumber >= 3 && buttonNumber <= 5 )
  {game = true
  inititateGame()}
  else(
    alert('Input Number between 3 - 5')
  )
})
function inititateGame(){
  if(game){
    generateButtons();
    const allButtons = document.querySelectorAll('button')
    let winCombo = [];
    let clickable = [];
    let result;
    let turn = 'X';
    horizontal(allButtons, buttonNumber,winCombo);
    vertical(buttonNumber,winCombo);
    slant(buttonNumber, winCombo);
    searchButton();
    mainFunction()

function generateButtons(){
  document.querySelector('.js-main-container').innerHTML = null;
  let buttonsHtml =``;
  if(buttonNumber === 3){
    document.querySelector('.js-main-container').classList.add(`main-container-${buttonNumber}`)
    document.querySelector('.js-main-container').classList.remove('main-container-4')
    document.querySelector('.js-main-container').classList.remove('main-container-5')
  }else if(buttonNumber === 4){
    document.querySelector('.js-main-container').classList.add(`main-container-${buttonNumber}`)
    document.querySelector('.js-main-container').classList.remove('main-container-5')

  }else if(buttonNumber === 5){
    document.querySelector('.js-main-container').classList.add(`main-container-${buttonNumber}`)
  }
  for(let i = 0; i < (buttonNumber**2); i++ ){
    buttonsHtml +=`<button>-</button>`
  }
  
  document.querySelector('.js-main-container').innerHTML = buttonsHtml
  if(buttonNumber){
  }
}
function searchButton(){
  allButtons.forEach((button, index)=>{
    clickable.push(index);
  })
}
function mainFunction(){
allButtons.forEach((button, index)=>{
  button.addEventListener('click', ()=>{
    let arrayValues = [];
    if(!clickable.includes(index) || turn !=='X' || result){
      console.log('cannot be clicked');
    }else{
     
      //Player is Moving
    updateClickableArray(index)
    updateButtonDisplay(button)
    countScore(arrayValues);
    result = checkWinCondition(arrayValues);
    if(result){
      if(result === 'Draw'){
      document.querySelector('.js-announce').innerHTML = `<div class="box">
      <div class="display-result">${result}</div>
      <div class="computer-says"></div>
      <button class = "restart-button">Restart</button>
    </div>`;
    document.querySelector('.js-announce').classList.add('announce');
    document.querySelector('.computer-says').innerHTML = `Computer says: "Your neural network requires more training time"`
    document.querySelector('.restart-button').addEventListener('click', ()=>{
      document.querySelector('.js-announce').classList.remove('announce')
      document.querySelector('.js-announce').innerHTML = null
      playButton.click()
    })
    } else if(result === 'Win'){
      document.querySelector('.js-announce').innerHTML = `<div class="box">
      <div class="display-result">${result}</div>
      <div class="computer-says"></div>
      <button class = "restart-button">Restart</button>
    </div>`;
    document.querySelector('.js-announce').classList.add('announce');
    document.querySelector('.computer-says').innerHTML = `Computer admires your calculations!`
    document.querySelector('.restart-button').addEventListener('click', ()=>{
      document.querySelector('.js-announce').classList.remove('announce')
      document.querySelector('.js-announce').innerHTML = null
      playButton.click()
    })
    }
    }

    //if there is a result do not proceed
    if(result){
    }else{
        //Computer is Moving
    computerIsMoving(arrayValues)
    arrayValues = [];
    countScore(arrayValues);
    result = checkWinCondition(arrayValues)
    if(result){
      if(result === 'Lose'){
        document.querySelector('.js-announce').innerHTML = `<div class="box">
        <div class="display-result">${result}</div>
        <div class="computer-says"></div>
        <button class = "restart-button">Restart</button>
      </div>`;
      document.querySelector('.js-announce').classList.add('announce');
      document.querySelector('.computer-says').innerHTML = `Computer says: "Upgrade your neural architecture"`
      document.querySelector('.restart-button').addEventListener('click', ()=>{
        document.querySelector('.js-announce').classList.remove('announce')
        document.querySelector('.js-announce').innerHTML = null
        playButton.click()
      })
    }else{
      document.querySelector('.js-announce').innerHTML = `<div class="box">
      <div class="display-result">${result}</div>
      <div class="computer-says"></div>
      <button class = "restart-button">Restart</button>
    </div>`;
    document.querySelector('.js-announce').classList.add('announce');
    document.querySelector('.computer-says').innerHTML = `Computer says: "Your neural network requires more training time"`
    document.querySelector('.restart-button').addEventListener('click', ()=>{
      document.querySelector('.js-announce').classList.remove('announce')
      document.querySelector('.js-announce').innerHTML = null
      playButton.click()
    })
    }
    }
    }
  }
  })

})
}

function updateClickableArray(index){
  let newClickable = [];
  clickable.forEach((i)=>{
    if(i !== index){
      newClickable.push(i);
    }
  })
  clickable = newClickable;
}

function updateButtonDisplay(button){
  button.innerHTML = turn;
  if(turn==='X'){
    turn = 'O'
  }else{
    turn = 'X'
  }
}

function countScore(arrayValues){
  winCombo.forEach((array)=>{
    let scoreCount = 0;
    
    array.forEach((button)=>{
      if(button.innerHTML === 'X'){
        scoreCount -=1;
      }else if(button.innerHTML === 'O'){
        scoreCount += buttonNumber*1;
      }
    })
    arrayValues.push(scoreCount);
  })
}

function computerIsMoving(arrayValues){
  let priorityIndex;
  arrayValues.forEach((score, index)=>{
    if (score === buttonNumber*(buttonNumber-1)){
      priorityIndex = index;
    }else if(score === (1 - buttonNumber)){
      priorityIndex = index;
    }
  })
  if (priorityIndex || priorityIndex ===0){
    winCombo[priorityIndex].forEach((button, index)=>{
      if(button.innerHTML !=='X'){
        button.innerHTML = 'O'
        allButtons.forEach((item, index)=>{
          if(item===button){
            updateClickableArray(index)
          }
        })
        turn = 'X'
      }
    })
  }else{
    if(clickable.length !==0){
      const randomIndex = clickable[Math.floor(Math.random() * clickable.length)]
      allButtons[randomIndex].innerHTML = 'O';
      const button = allButtons[randomIndex]
      allButtons.forEach((item, index)=>{
        if(item===button){
          updateClickableArray(index)
        }
      })
      turn = 'X'
    }

  }
}

function checkWinCondition(arrayValues){
  if(arrayValues.includes(-buttonNumber)){
    result = 'Win'
    game = false
    return result;
  }
  if(arrayValues.includes((buttonNumber*buttonNumber))){
    result = 'Lose'
    game = false
    return result
   
  }
  if(clickable.length===0 && !result){
    result = 'Draw'
    game = false
    console.log('draw')
    return result
  }
}

  }
}


