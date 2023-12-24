let countdown; // Variable to hold the countdown interval

function startTimer() {
    alert_timer_added();
    // Fetching input values for hours, minutes, and seconds
    const hoursInput = parseInt(document.querySelector('.iftb-1').value) || 0;
    const minutesInput = parseInt(document.querySelector('.iftb-2').value) || 0;
    const secondsInput = parseInt(document.querySelector('.iftb-3').value) || 0;

    // Calculating total seconds from input values
    let totalSeconds = hoursInput * 3600 + minutesInput * 60 + secondsInput;

    // Get the anchor tag element
    const timerAnchor = document.querySelector('.btn-timer');

    clearInterval(countdown); // Clear previous interval if any

    countdown = setInterval(() => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Format the time into HH:MM:SS
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update the timer text inside the anchor tag
        timerAnchor.textContent = formattedTime;

        if (totalSeconds <= 0) {
            clearInterval(countdown);
            timerAnchor.textContent = 'STOP'; // Update text to Time Up! when timer ends
            alert_info_timer();
            playAudio();

        } else {
            totalSeconds--;
        }
    }, 1000);
}

function resetTimer() {
    // Get the anchor tag element and input fields
    const timerAnchor = document.querySelector('.btn-timer');
    const hoursInput = document.querySelector('.iftb-1');
    const minutesInput = document.querySelector('.iftb-2');
    const secondsInput = document.querySelector('.iftb-3');

    clearInterval(countdown); // Clear the countdown interval

    // Reset input fields to 0 and update timer text to 00:00:00
    hoursInput.value = '0';
    minutesInput.value = '0';
    secondsInput.value = '0';
    timerAnchor.textContent = '00:00:00';
}

function playAudio() {
    var audio = document.getElementById('audioPlayer');

    // Check if the audio is paused or ended before playing
    if (audio.paused || audio.ended) {
        audio.currentTime = 0; // Set audio's currentTime to the beginning
        audio.play(); // Start playing the audio
    }
}

function stopAudio() {
    var audio = document.getElementById('audioPlayer');

    // Pause the audio without removing the element from the DOM
    audio.pause();
}

document.addEventListener('DOMContentLoaded', () => {
    const stopButton = document.querySelector('.btn-timer');

    stopButton.addEventListener('click', () => {
        const timerAnchor = document.querySelector('.btn-timer');
        const audio = document.getElementById('audioPlayer');

        if (timerAnchor.textContent === 'STOP') {
            stopAudio(); // Call the function to stop the audio
        }
    });
});

function restrictNegativeInput() {
    const timerInputs = document.querySelectorAll('.input-form-timer-button');

    timerInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (parseInt(input.value) < 0) {
                input.value = '0';
            }
        });
    });
}

function toggleTimerText() {
    const timerAnchor = document.querySelector('.btn-timer');

    if (timerAnchor.textContent === 'STOP') {
        timerAnchor.textContent = 'TIMER';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const timerButton = document.querySelector('.btn-timer');

    timerButton.addEventListener('click', () => {
        if (timerButton.textContent === 'STOP') {
            stopAudio(); // Call the function to stop the audio if it's playing
            toggleTimerText(); // Change the text from STOP to START
        } else if (timerButton.textContent === 'TIMER') {
            // If the text is START, you may add the logic to restart or reset the timer if needed
            // Restart or reset logic here...
            startTimer(); // For example, restart the timer by calling the startTimer() function
        }
    });
});