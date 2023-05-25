import { initializeApp } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings={
    databaseURL:"https://we-are-champions1-default-rtdb.asia-southeast1.firebasedatabase.app/"   
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const  reviewListInDB=ref(database,"reviewslist")


const inputFieldEl=document.getElementById("input-el")
const addBtnEl=document.getElementById("button-el")
const reviewListEl=document.getElementById("review-list")

addBtnEl.addEventListener("click",function(){
 const inputValue=inputFieldEl.value
 
 push(reviewListInDB,inputValue)
 
 clearreviewListEl()
 
})
onValue(reviewListInDB,function(snapshot){
    
    let reviewArray=Object.entries(snapshot.val())
    clearviewlist()
    for(let i=0;i<reviewArray.length; i++){
        let currentreview=reviewArray[i]
        let currentreviewId=currentreview[0]
        let currentreviewvalue=currentreview[1]
        appendreviewstoreviewListEl(currentreview)
    }   
   
    
function clearviewlist(){
    reviewListEl.innerHTML=""
}


})
function clearreviewListEl(){
    reviewListEl.innerHTML+=""
}
function appendreviewstoreviewListEl(review){
      let itemid=review[0]
      let  itemvalue=review[1]

    let newEl=document.createElement("li")
    newEl.textContent=itemvalue

    newEl.addEventListener("click",function(){
        let exactItemLocationInDB=ref(database,`reviewslist/${itemvalue}`)
        remove(exactItemLocationInDB)
    })
    reviewListEl.append(newEl)
}


 



