function createPopBox(boxClass){
  const PopBox={
  mainContainer: document.querySelector('.main'),
  popBoxContainer:document.querySelector(`.${boxClass}`),
  shareButton:document.querySelector('.share-container'),
  profile: document.querySelector('.profile'),
  sharePicture: document.querySelector('.js-share-picture'),
  clickShare(){
    this.shareButton.addEventListener('click',()=>{
        this.popBoxContainer.classList.toggle('invisible');
        if(600>window.innerWidth){
        this.profile.classList.add('invisible');
      }
    })
    this.sharePicture.addEventListener('click', ()=>{
      this.popBoxContainer.classList.toggle('invisible');
      this.profile.classList.remove('invisible')
    })
    },

  addResize(){
    window.addEventListener('resize', ()=>{
      if(600 < window.innerWidth){
        this.profile.classList.remove('invisible');
        this.popBoxContainer.classList.add('invisible')
      }
    })
  },
}
return PopBox;
}
let viewportWidth;
function main(){
  viewportWidth = window.innerWidth;
  const popBoxMobile = createPopBox('popbox');
  const popBoxPc = createPopBox('popbox2');
  popBoxMobile.clickShare()
  popBoxMobile.addResize()
  popBoxPc.clickShare();
}
main();


