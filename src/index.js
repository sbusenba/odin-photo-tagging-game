// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
  } from 'firebase/firestore';
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc_AQ4M7-SdiABMy2nEObGUEFeTGhs3i8",
  authDomain: "odin-photo-tagging-game.firebaseapp.com",
  projectId: "odin-photo-tagging-game",
  storageBucket: "odin-photo-tagging-game.appspot.com",
  messagingSenderId: "524954722565",
  appId: "1:524954722565:web:1b2abd8e403ba17432d76c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import './styles/style.css'
import odlawImg from './imgs/Odlaw.webp'
import waldoImg from './imgs/Waldo.webp'
import wilmaImg from './imgs/Wilma.webp'
let odlawPic = document.querySelector('#odlaw-img')
odlawPic.src = odlawImg;
let waldoPic = document.querySelector('#waldo-img')
waldoPic.src = waldoImg;
let wilmaPic = document.querySelector('#wilma-img')
wilmaPic.src = wilmaImg;


let imageHolder = document.querySelector('#image-holder')
let cursor = document.querySelector('#cursor')
let imageMenu = document.querySelector('#select-menu')
let imageMenuVisibility= false;
let givingDirections = true;
let menuItems = document.querySelectorAll('#select-menu div')
let locations = document.querySelectorAll('.location-button')
let scoreButton = document.querySelector('#submit-score')
let scoreInput = document.querySelector('#score-name')
let storedLocations =''
let location = ''
let charsFound = 0;
let wilmaFound = false;
let waldoFound = false;
let odlawFound = false;
let timer = null;
let secondsElapsed = 0;
let storedScores =[]
let scoreBoard = document.querySelector('#scoreboard')

function hideDirections(){
    givingDirections = false;
    let directionDiv = document.querySelector('#directions')
    directionDiv.style.display = 'none'
}
function showHolder(){
    imageHolder.style.display = 'block'
}
function hideHolder(){
    imageHolder.style.display = 'none'
}
function showCongrats(){
    let congrats = document.querySelector('#congrats') 
    congrats.style.display = 'flex'
}

function startTimer(){
    timer =setInterval(()=>{secondsElapsed++},1000)
}
function stopTimer(){
    clearInterval(timer)
}

async function getScores (){
    try{
        storedScores = await(await getDocs(collection(getFirestore(),`highscores`))).docs;
        console.table(storedScores)
    }
    catch(error){
        console.error('Error retrieving scores from Firebase Database', error);
    }
}
async function addScore (name,score){
    try {
        await addDoc(collection(getFirestore(), `highscores`), {
          name: name,
          score: score,
          location: location
        });
      }
      catch(error) {
        console.error('Error writing new score to Firebase Database', error);
      }

}


async function getLocations (){
    try{
    storedLocations = await (await getDocs(collection(getFirestore(),`${location}`))).docs;
    }
    catch(error){
        console.error('Error retrieving from Firebase Database', error);
    }
}
async function mapClick (loc,char,x,y){
    try {
        await addDoc(collection(getFirestore(), `${loc}`), {
          character: char,
          xLoc: x,
          yLoc: y
        });
      }
      catch(error) {
        console.error('Error writing new hotspot to Firebase Database', error);
      }

}
function checkClick (char,x,y){
    let found = false;
    storedLocations.forEach((location)=>{
        if ((location.data().character === char)&&
        (parseInt(location.data().xLoc) >= parseInt(x)-20)&&
        (parseInt(location.data().xLoc) <= parseInt(x)+20)&&
        (parseInt(location.data().yLoc) >= parseInt(y)-20)&&
        (parseInt(location.data().yLoc) <= parseInt(y)+20)){
            console.log(`${char} found!`)
            if ((char ==="Waldo")&&(waldoFound===false)){
                waldoFound = true;
                found = true;
                charsFound+=1; 
            }else if ((char === "Odlaw")&&(odlawFound===false)){
                odlawFound = true;
                found = true;
                charsFound+=1; 
            }
            if ((char === "Wilma")&&(wilmaFound===false)){
                wilmaFound = true;
                found = true;
                charsFound+=1; 
            }
        }
    })
    return found;
}

locations.forEach((locationButton)=>{
    locationButton.addEventListener('click',(e)=>{
        location = e.target.innerText
        switch(e.target.innerText){
            case 'The Ski Slope':
                imageHolder.classList.add('skiscene')
            break;
            case 'The Beach':
                imageHolder.classList.add('beachscene')
            break;
            case 'The Moon Base':
                imageHolder.classList.add('spacescene')
            break;
            default:
            break;
        }
        hideDirections()
        showHolder()
        getLocations()
        startTimer()
    });
});

menuItems.forEach((imageItem)=>{
    imageItem.addEventListener('click',(e)=>{
        //mapClick(location,e.target.innerText,imageMenu.style.left,imageMenu.style.top)
        
        let tag = document.createElement('div')
        tag.classList.add('tag')
        if (checkClick(e.target.innerText,imageMenu.style.left,imageMenu.style.top)){
            tag.classList.add('good')
        } else {
            tag.classList.add('bad')

        }
        console.log(`${charsFound} characters found!`)

        tag.style.left = (parseInt(imageMenu.style.left)-27)+'px'
        tag.style.top = (parseInt(imageMenu.style.top)-27)+'px'
        imageHolder.appendChild(tag)
        if (wilmaFound&&waldoFound&&odlawFound){
            console.log('you win!')
            hideHolder()
            stopTimer()
            let score = document.querySelector('#score-span')
            score.innerText=secondsElapsed
            showCongrats()
           

        }
    })
})

const toggleSelect = ()=>{
    if (!imageMenuVisibility){
        imageMenu.style.display= 'flex'
        imageMenuVisibility = true;
        imageHolder.style.cursor = 'auto'

    } else {
        imageMenu.style.display= 'none'
        imageMenuVisibility = false;
        imageHolder.style.cursor = 'none'
    }
}

imageHolder.addEventListener('click',(e)=>{
    imageMenu.style.top=(e.pageY)+'px'
    imageMenu.style.left=(e.pageX)+'px'
    toggleSelect()
});

imageHolder.addEventListener('mousemove',(e)=>{
    if (!imageMenuVisibility){
    cursor.style.top=(e.pageY-27)+'px'
    cursor.style.left=(e.pageX-27)+'px'
    }
})

scoreButton.addEventListener('click',()=>{ 
   addScore(scoreInput.value,secondsElapsed)
   document.querySelector("#score-entry-div").style.display = 'none'
   let scoreData = document.querySelector('#scoreboard')
   storedScores.forEach((score)=>{
    if (score.data().location ===location){
        let scoreItem = document.createElement('div')
        scoreItem.innerText = `${score.data().name} completed ${score.data().location} in ${score.data().score}s`
        scoreData.appendChild(scoreItem)
    }

   });
        })
 getScores()
