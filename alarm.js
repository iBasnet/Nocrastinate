function restrictNegativeInput() {
    const timerInputs = document.querySelectorAll('.input-form-alarm-button');

    timerInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (parseInt(input.value) < 0) {
                input.value = '0';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const alarmSwitch = document.querySelector('.input-form-alarm-button[type="checkbox"]');
    const alarmParagraph = document.querySelector('.input-form-alarm-tooltip p:nth-child(3)');

    // Function to update the paragraph text based on switch state
    function updateAlarmText() {
        if (alarmSwitch.checked) {
            alarmParagraph.textContent = 'PM¬';
        } else {
            alarmParagraph.textContent = 'AM¬';
        }
    }

    // Event listener for the switch input
    alarmSwitch.addEventListener('change', updateAlarmText);
});

// Function to check if the entered hours are within the valid range (0-12)
function validateHoursInput() {
    const hoursInput = document.getElementById('hoursInput');
    if (parseInt(hoursInput.value) > 12) {
        hoursInput.value = '12'; // Set the value to maximum allowed (12)
    }
}

// Function to check if the entered minutes are within the valid range (0-59)
function validateMinutesInput() {
    const minutesInput = document.getElementById('minutesInput');
    if (parseInt(minutesInput.value) > 59) {
        minutesInput.value = '59'; // Set the value to maximum allowed (59)
    }
}

// Attach event listeners to restrict input values
document.addEventListener('DOMContentLoaded', () => {
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');

    // Add event listeners to validate input on change
    hoursInput.addEventListener('change', validateHoursInput);
    minutesInput.addEventListener('change', validateMinutesInput);
});


////////////////////////////////////////////////////////////

// Function to format time (e.g., adding leading zeros)
function formatTime(value) {
    return value < 10 ? `0${value}` : `${value}`;
}

// Function to update the anchor tag text
function updateAlarmText() {
    const hours = parseInt(document.getElementById('hoursInput').value, 10);
    const minutes = parseInt(document.getElementById('minutesInput').value, 10);

    if (isNaN(hours) || isNaN(minutes)) {
        // alert('Please enter valid numbers for hours and minutes.');
        return;
    }

    const isPM = document.querySelector('.input-switch').checked;
    let formattedHours = formatTime(hours);
    const formattedMinutes = formatTime(minutes);

    if (isPM && hours < 12) {
        formattedHours = formatTime(hours);
    }

    const period = isPM ? 'PM' : 'AM';
    const newAlarmText = `${formattedHours}:${formattedMinutes} ${period}`;
    document.querySelector('.btn-alarm').textContent = newAlarmText;
}

// Function to set the alarm
function setAlarm() {
    const hours = parseInt(document.getElementById('hoursInput').value, 10);
    const minutes = parseInt(document.getElementById('minutesInput').value, 10);

    if (isNaN(hours) || isNaN(minutes)) {
        alert_warning();
        return;
    }

    const isPM = document.querySelector('.input-switch').checked;
    let formattedHours = hours;
    if (isPM && hours < 12) {
        formattedHours += 12;
    }

    const now = new Date();
    const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), formattedHours, minutes, 0);

    const timeDifference = alarmTime - now;

    if (timeDifference <= 0) {
        alert_warning();
        return;
    }
    else {
        alert_alarm_added();
    }

    const alarmButton = document.querySelector('.btn-alarm');

    const countdown = setTimeout(() => {
        alert_info_alarm();
        playAudio();
        alarmButton.textContent = 'STOP'; // Change the text to 'STOP' when the alarm goes off
    }, timeDifference);

    // Event listener for the STOP button
    alarmButton.addEventListener('click', () => {
        clearTimeout(countdown); // Clear the countdown interval
        stopAudio(); // Call the function to stop the audio
        alarmButton.textContent = 'ALARM'; // Reset the text back to 'ALARM'
    });

    updateAlarmText();
}


// Event listener for the "START" button click
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.btn-form-2-ii');

    startButton.addEventListener('click', () => {
        setAlarm();
    });

    // Event listener for input changes to update alarm text
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const switchInput = document.querySelector('.input-switch');

    hoursInput.addEventListener('input', updateAlarmText);
    minutesInput.addEventListener('input', updateAlarmText);
    switchInput.addEventListener('click', updateAlarmText);

    // Initial update of alarm text based on default values
    updateAlarmText();
});

////////////////////////////////////////////////////////////

// Function to reset the alarm inputs to zero
function resetAlarm(event) {
    event.preventDefault();

    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const alarmButton = document.querySelector('.btn-alarm');

    // Reset the input field values to zero
    hoursInput.value = '0';
    minutesInput.value = '0';

    // Change the text of the anchor tag to '12:00 AM'
    alarmButton.textContent = 'ALARM';
}
// Close the ongoing set alarm (you might need to implement the logic for clearing the ongoing alarm)