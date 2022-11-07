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

let imageHolder = document.querySelector('#image-holder')
let cursor = document.querySelector('#cursor')
let imageMenu = document.querySelector('#select-menu')
let imageMenuVisibility= false;
let givingDirections = true;
let menuItems = document.querySelectorAll('#select-menu div')
let locations = document.querySelectorAll('.location-button')
let storedLocations =''
let location = ''
let charsFound = 0;

function hideDirections(){
    givingDirections = false;
    let directionDiv = document.querySelector('#directions')
    directionDiv.style.display = 'none'
}
function showHolder(){
    imageHolder.style.display = 'block'
}
function startTimer(){

}

async function getLocations (){
    try{
    storedLocations = await (await getDocs(collection(getFirestore(),`${location}`))).docs;
    console.table(locations)
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
            found = true;
            charsFound++; 
        } else {
            if (char ===location.data().character){
            console.log(`${char} not found x =${parseInt(x)} xLoc =${parseInt(location.data().xLoc)}
             y =${parseInt(y)} storedY =${parseInt(location.data().yLoc)}`)
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
            imageHolder.style.backgroundImage = 'url(../imgs/waldo-ski.jpg)'
            break;
            case 'The Beach':
                imageHolder.style.backgroundImage = 'url(../imgs/waldo-beach.jpg)'
            break;
            case 'The Moon Base':
                imageHolder.style.backgroundImage = 'url(../imgs/waldo-space.jpg)'
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
        console.log(`${e.target.innerText} at ${imageMenu.style.left}, ${imageMenu.style.top}`)
        //mapClick(location,e.target.innerText,imageMenu.style.left,imageMenu.style.top)
        
        let tag = document.createElement('div')
        tag.classList.add('tag')
        if (checkClick(e.target.innerText,imageMenu.style.left,imageMenu.style.top)){
            tag.classList.add('good')
        } else {
            tag.classList.add('bad')

        }
        tag.style.left = (parseInt(imageMenu.style.left)-27)+'px'
        tag.style.top = (parseInt(imageMenu.style.top)-27)+'px'
        imageHolder.appendChild(tag)

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