export function horizontal(allButtons,buttonNumber, winCombo){
let arrayBy = [];
allButtons.forEach((button)=>{
arrayBy.push(button)
if(arrayBy.length === buttonNumber){
winCombo.push(arrayBy)
arrayBy = [];
}
})
}

export function vertical(buttonNumber,winCombo){
  let combo = [];
  let arrayBy = [];
  let index = 0
  for(let i = 0; i < buttonNumber; i++){
    winCombo.forEach((buttonArray)=>{
    arrayBy.push(buttonArray[index])
    if(arrayBy.length === buttonNumber){
      combo.push(arrayBy);
      arrayBy = [];
      index++;
    }
    })
  }
  combo.forEach((buttonArray)=>{
    winCombo.push(buttonArray);
  })
}

export function slant(buttonNumber, winCombo){
  let combo = [];
  let arrayBy=[];
  let index = 0;
  let state = true;
  winCombo.forEach((buttonArray)=>{
    if(state === true){
    arrayBy.push(buttonArray[index])
    index++;
    if(index === buttonNumber){
      combo.push(arrayBy);
      arrayBy = []
      state = false
      index --;
    }
  }else if (state ===false){
    arrayBy.push(buttonArray[index]);
    index--;
  }
  })
  combo.push(arrayBy);
  combo.forEach((buttonArray)=>{
    winCombo.push(buttonArray);
  })

}


