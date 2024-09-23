var minutes = 25;
var seconds = "00";
var minutes_interval;
var seconds_interval;
var message_interval;

var click = new Audio("./audios/click.mp3");
var bell = new Audio("./audios/bell.mp3");
var resetAudio = new Audio("./audios/reset.mp3");

function template(){
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

function start(){
    // Ring click & Update Button once start is clicked
    click.play();
    document.getElementById("start").style.display = "none";
    document.getElementById("reset").style.display = "inline";  

    minutes = 24;
    seconds = 59;

    // Update the displayed time
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Stop any ongoing timers & Start the timers
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);

    function minutesTimer(){
        minutes = minutes - 1;
        document.getElementById("minutes").innerHTML = minutes;
    }
    function secondsTimer(){
        seconds = seconds - 1;
        document.getElementById("seconds").innerHTML = seconds;
        if(seconds == 55){
            if(minutes == 24){
                // Stop timers
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);

                // Displaye break message
                document.getElementById("done").innerHTML = "Session Completed! Take a Break!";
                document.getElementById("done").classList.add("show_message");
                var message_interval = setInterval(messageTimer, 5000);
                clearInterval(messageTimer);

                // Ring bell and reset timer
                bell.play();
                minutes = 25;
                seconds = "00";
                document.getElementById("minutes").innerHTML = minutes;
                document.getElementById("seconds").innerHTML = seconds;

                // Update Buttons once message is shown
                document.getElementById("start").style.display = "inline"; 
                document.getElementById("reset").style.display = "none";
            }
            seconds = 60;
        }
        function messageTimer(){
            document.getElementById("done").style.display = "none";
        }
    }
}

function reset() {
    // Stop any ongoing timers
    clearInterval(minutes_interval);
    clearInterval(seconds_interval);
    
    // Reset minutes and seconds
    resetAudio.play();
    minutes = 25;
    seconds = "00";
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    
    // Play reset and Reset the "done" message
    // reset.play();
    document.getElementById("done").innerHTML = "Timer is Reset...";
    document.getElementById("done").classList.add("show_message");
    setTimeout(function() {
        document.getElementById("done").innerHTML = ""; 
        document.getElementById("done").classList.remove("show_message"); 
    }, 1000);
    
    // Show the start button and hide the reset button
    document.getElementById("start").style.display = "inline"; 
    document.getElementById("reset").style.display = "none"; 
}
