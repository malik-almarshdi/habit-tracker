let habits = JSON.parse(localStorage.getItem("habits")) || []
let lastDate = localStorage.getItem("lastDate")

let today = new Date().toDateString()

// daily reset
if(lastDate !== today){

habits.forEach(habit=>{
habit.doneToday=false
})

localStorage.setItem("lastDate",today)
save()

}

render()

function addHabit(){

let input=document.getElementById("habitInput")

if(input.value.trim()==="") return

habits.push({

name:input.value,
streak:0,
doneToday:false,
history:[false,false,false,false,false,false,false]

})

input.value=""

save()
render()

}

function render(){

let list=document.getElementById("habitList")
list.innerHTML=""

let completed=0

habits.forEach((habit,index)=>{

let li=document.createElement("li")

let historyHTML = habit.history.map(day => 
`<div class="day-box ${day ? "day-done":""}"></div>`
).join("")

li.innerHTML=`

<div class="habit-main">

<div class="habit-check ${habit.doneToday ? "checked" : ""}">
${habit.doneToday ? "✔" : ""}
</div>

<div class="habit-text">

<strong>${habit.name}</strong>
<div class="streak">🔥 ${habit.streak} day streak</div>

<div class="habit-history">
${historyHTML}
</div>

</div>

<button class="delete-btn">✕</button>

</div>

`

// toggle habit
li.querySelector(".habit-check").onclick=function(){

if(!habit.doneToday){

habit.doneToday=true
habit.streak++

habit.history.shift()
habit.history.push(true)

save()
render()

}

}

// delete habit
li.querySelector(".delete-btn").onclick=function(){

habits.splice(index,1)

save()
render()

}

if(habit.doneToday) completed++

list.appendChild(li)

})

updateProgress(completed)

}

function updateProgress(completed){

let total=habits.length

document.getElementById("progressText").innerText=
completed+" / "+total+" habits completed today"

let percent=total===0?0:(completed/total)*100

document.getElementById("progressFill").style.width=
percent+"%"

// longest streak
let longest=0

habits.forEach(habit=>{
if(habit.streak>longest){
longest=habit.streak
}
})

document.getElementById("longestStreak").innerText=
"🔥 Longest streak: "+longest+" days"

// motivation message
let message=document.getElementById("motivationMessage")

if(total>0 && completed===total){

message.innerText="Great job! All habits completed today 🔥"

}else{

message.innerText=""

}

}

function save(){

localStorage.setItem("habits",JSON.stringify(habits))

}