var minutes = 25;
var seconds = "00";
var timerState = "study";
var sessionCount = 1;
var minutes_interval;
var seconds_interval;
let startTime;
let hoursStudied;
let daysStudied;
let daysStreak;

var click = new Audio("./audios/click.mp3");
var bell = new Audio("./audios/bell.mp3");
var resetAudio = new Audio("./audios/reset.mp3");

window.onload = function(){
    template();
    // fetchActivitySummary();
}
function template(){
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("studyBtn").style.backgroundColor = "rgb(186, 73, 73)";
}
function start(){
    startTime = new Date();
    // Ring click & Update Button once start is clicked
    click.play();
    document.getElementById("start").style.display = "none";
    document.getElementById("reset").style.display = "inline";  

    if(timerState=="study"){
        minutes = 24;
    } else if (timerState=="shortBreak"){
        minutes = 4;
    } else if (timerState=="longBreak"){
        minutes = 14;
    }
    seconds = 59;

    // Update the displayed time
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Stop any ongoing timers & Start the timers
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    // minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);
}
// function minutesTimer(){
//     if (minutes > 0) {
//         minutes--;
//         document.getElementById("minutes").innerHTML = minutes;
//     }
// }
function secondsTimer(){
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        seconds = 59;
        minutes--;
    }
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("minutes").innerHTML = minutes;
    
    if (minutes === 0 && seconds === 0) {
            // Stop timers
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);

            // Ring bell and reset timer
            bell.play();
            reset();

            // Update Buttons once message is shown
            document.getElementById("start").style.display = "inline"; 
            document.getElementById("reset").style.display = "none";
    }
}
function resetTimer(){
    document.getElementById("done").innerHTML = ""; 
    document.getElementById("done").classList.remove("show_message");
    if(timerState=="study"){
        // Display break message
        document.getElementById("done").innerHTML = "Session Completed! Take a Break!";
        document.getElementById("done").classList.add("show_message");
        setTimeout(function() {
            document.getElementById("done").classList.remove("show_message");
        }, 3000);

        if(sessionCount%4 == 0){
            minutes = 15;
            timerState = "longBreak";
            document.getElementById("sessionDetails").innerHTML = "Session " + sessionCount + ": Long Break: You've earned it!";
            resetLongBrkBtn();
        } else {
            minutes = 5;
            timerState = "shortBreak";
            document.getElementById("sessionDetails").innerHTML = "Session " + sessionCount + ": Short Break: Relax!";
            resetShortBrkBtn();
        }
    } else {
        // Display break message
        document.getElementById("done").innerHTML = "Study Time...";
        document.getElementById("done").classList.add("show_message");
        setTimeout(function() {
            document.getElementById("done").classList.remove("show_message");
        }, 3000);

        minutes = 25;
        timerState = "study";
        sessionCount = sessionCount + 1;
        document.getElementById("sessionDetails").innerHTML = "Session " + sessionCount + ": Time to Study!";
        resetStudyBtn();
    }
    seconds = "00";
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}
function reset(){
    const endTime = new Date();  
    let duration;
    if (timerState === 'study') {
        duration = (seconds > 0) ? 25 - (minutes + 1) : 25 - minutes;
    } else if (timerState === 'shortBreak') {
        duration = (seconds > 0) ? 5 - (minutes + 1) : 5 - minutes;
    } else if (timerState === 'longBreak') {
        duration = (seconds > 0) ? 15 - (minutes + 1) : 15 - minutes;
    }

    storeSession(timerState, duration, startTime.toLocaleString(), endTime.toLocaleString());

    // Stop any ongoing timers
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    
    // Play reset and Reset minutes and seconds
    resetAudio.play();
    resetTimer();
    
    // Show the start button and hide the reset button
    document.getElementById("start").style.display = "inline"; 
    document.getElementById("reset").style.display = "none"; 
}
function resetStudyBtn(){
    // Reset the "done" message
    document.getElementById("done").innerHTML = "Timer is Reset...";
    document.getElementById("done").classList.add("show_message");
    setTimeout(function() {
        document.getElementById("done").innerHTML = ""; 
        document.getElementById("done").classList.remove("show_message"); 
    }, 1000);
    // Stop any ongoing timers
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    timerState = "study";
    minutes = 25;
    seconds = "00";
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("start").style.display = "inline"; 
    document.getElementById("reset").style.display = "none"; 
    
    document.body.style.backgroundColor = "rgb(186, 73, 73)";
    document.getElementById('start').style.color = "rgb(186, 73, 73)";
    document.getElementById('reset').style.color = "rgb(186, 73, 73)";
    document.querySelector('.timer').style.backgroundColor = "rgb(200, 85, 85)";
    document.querySelector('.studyBtn').style.backgroundColor = "rgb(186, 73, 73)";
    document.querySelector('.shortBrkBtn').style.backgroundColor = "rgb(200, 85, 85)";
    document.querySelector('.longBrkBtn').style.backgroundColor = "rgb(200, 85, 85)";
    document.querySelector('.reportBtn').style.backgroundColor = "rgb(200, 85, 85)";
    document.querySelector('.show_message').style.color = "rgb(186, 73, 73)";
}
function resetShortBrkBtn(){
    // Reset the "done" message
    document.getElementById("done").innerHTML = "Timer is Reset...";
    document.getElementById("done").classList.add("show_message");
    setTimeout(function() {
        document.getElementById("done").innerHTML = ""; 
        document.getElementById("done").classList.remove("show_message"); 
    }, 1000);
    // Stop any ongoing timers
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    timerState = "shortBreak";
    minutes = 5;
    seconds = "00";
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("start").style.display = "inline"; 
    document.getElementById("reset").style.display = "none"; 
    
    document.body.style.backgroundColor = "rgb(73, 148, 186)";
    document.getElementById('start').style.color = "rgb(73, 148, 186)";
    document.getElementById('reset').style.color = "rgb(73, 148, 186)";
    document.querySelector('.timer').style.backgroundColor = "rgb(90, 166, 205)";
    document.querySelector('.studyBtn').style.backgroundColor = "rgb(90, 166, 205)";
    document.querySelector('.shortBrkBtn').style.backgroundColor = "rgb(73, 148, 186)";
    document.querySelector('.longBrkBtn').style.backgroundColor = "rgb(90, 166, 205)";
    document.querySelector('.reportBtn').style.backgroundColor = "rgb(90, 166, 205)";
    document.querySelector('.show_message').style.color = "rgb(73, 148, 186)";
}
function resetLongBrkBtn(){
    // Reset the "done" message
    document.getElementById("done").innerHTML = "Timer is Reset...";
    document.getElementById("done").classList.add("show_message");
    setTimeout(function() {
        document.getElementById("done").innerHTML = ""; 
        document.getElementById("done").classList.remove("show_message"); 
    }, 1000);
    // Stop any ongoing timers
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    timerState = "longBreak";
    minutes = 15;
    seconds = "00";
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("start").style.display = "inline"; 
    document.getElementById("reset").style.display = "none"; 
    
    document.body.style.backgroundColor = "rgb(73, 109, 186)";
    document.getElementById('start').style.color = "rgb(73, 109, 186)";
    document.getElementById('reset').style.color = "rgb(73, 109, 186)";
    document.querySelector('.timer').style.backgroundColor = "rgb(85, 122, 201)";
    document.querySelector('.studyBtn').style.backgroundColor = "rgb(85, 122, 201)";
    document.querySelector('.shortBrkBtn').style.backgroundColor = "rgb(85, 122, 201)";
    document.querySelector('.longBrkBtn').style.backgroundColor = "rgb(73, 109, 186)";
    document.querySelector('.reportBtn').style.backgroundColor = "rgb(85, 122, 201)";
    document.querySelector('.show_message').style.color = "rgb(73, 109, 186)";
}
async function storeSession(sessionType, duration, startTime, endTime){
    const sessionData = {
        sessionType: sessionType,
        duration: duration,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString()
    };

    const response = await fetch('http://localhost:8080/createSession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
    });

    if (response.ok) {
        console.log('Session stored successfully');
    } else {
        console.error('Error storing session');
    }
}
async function fetchActivitySummary(){
    try {
        const response = await fetch('http://localhost:8080/getActivitySummary');
        if (response.ok) {
            const sessions = await response.json();
            updateActivitySummary(sessions);
        } else {
            console.error('Failed to fetch sessions');
        }
    } catch (error) {
        console.error('Error fetching session data:', error);
    }
}
function updateActivitySummary(sessions){
    const { hoursFocused, minutesFocused, daysAccessed, dayStreak } = sessions;

    document.getElementById("hoursFocused").innerText = hoursFocused + "h";
    document.getElementById("minutesFocused").innerText = minutesFocused + "m";
    document.getElementById("daysAccessed").innerText = daysAccessed;
    document.getElementById("dayStreak").innerText = dayStreak; 
}
