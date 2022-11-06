// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


const toggleSelect = ()=>{

    if (!imageMenuVisibility){
        imageMenu.style.display= 'flex'
        imageMenuVisibility = true;
    } else {
        imageMenu.style.display= 'none'
        imageMenuVisibility = false;
    }

}


imageHolder.addEventListener('click',(e)=>{
    imageMenu.style.top=(e.pageY)+'px'
    imageMenu.style.left=(e.pageX)+'px'
    toggleSelect()
});

imageHolder.addEventListener('mousemove',(e)=>{
    cursor.style.top=(e.pageY-27)+'px'
    cursor.style.left=(e.pageX-27)+'px'

})