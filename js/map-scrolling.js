//add scrolling effects to all maps
const FADE_TIMER = 2000;
var text_timestamp = 500;
var current_timestamp = 0;
function flashMessage(map_element=null, message=''){  
    if( map_element!=null ){
      let msg = map_element.getElementsByClassName('map_overlay')[0];
      if( msg!=null ){
        msg.innerText = message;
        document.body.classList.add('scrolling');
        current_timestamp =  Math.floor(Date.now());
        setTimeout(() => {
          if(  Math.floor(Date.now()) - current_timestamp >= FADE_TIMER ){
            document.body.classList.remove('scrolling');
          }
          text_timestamp = Date.now();
          setTimeout(()=>{
            if(Date.now() - text_timestamp >= 400){ //400 = 0.4s in css transition rule
              msg.innerText = 'ctrl + scroll to zoom';
            }
            text_timestamp = Date.now();
          },400);
        }, FADE_TIMER);
      }
    }
  }
  
  var map_elmts = document.querySelectorAll('.libre_map');
  var touchID = 0;
  map_elmts.forEach((map_element)=>{
    let msg = map_element.getElementsByClassName('map_overlay')[0];
    msg.innerText = 'ctrl + scroll to zoom';
    map_element.addEventListener('pointerdown',(event)=>{
      if( event.pointerType=="touch" && event.isPrimary==true){  //if touch with one finger
        touchID == event.pointerID;
        flashMessage(map_element, 'use two fingers to move the map');
      }else if( event.pointerType=="touch" && event.isPrimary==false && event.pointerID!=touchID){  //if touch with one finger
        document.body.classList.remove('scrolling');
      }else if( event.pointerType=="mouse" ){
        document.body.classList.remove('scrolling');
      }
    });
  });
  
  document.body.addEventListener('scroll', (event)=>{
    document.body.classList.add('scrolling');
    current_timestamp =  Math.floor(Date.now());
    setTimeout(()=>{
      if(  Math.floor(Date.now()) - current_timestamp >= FADE_TIMER ){
        document.body.classList.remove('scrolling');
      }
    },FADE_TIMER);
  });