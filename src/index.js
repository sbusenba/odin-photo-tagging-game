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
let menuItems = document.querySelectorAll('#select-menu div')

menuItems.forEach((imageItem)=>{
    imageItem.addEventListener('click',(e)=>{
        console.log(`${e.target.innerText} at ${imageMenu.style.left}, ${imageMenu.style.top}`)
        let tag = document.createElement('div')
        tag.classList.add('tag')
        if (Math.random()>0.50){
            tag.classList.add('good')
        } else {
            tag.classList.add('bad')
        }
        console.log(imageMenu.style.left)
        tag.style.left = (parseInt(imageMenu.style.left)-27)+'px'
        console.log(tag.style.left)
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