document.addEventListener('DOMContentLoaded', () => {

    calculateProgressPercentage();
    adjustProgressBarWidth();

    // Add event listener for the .check-btn elements
    const checkBtns = document.querySelectorAll('.check-btn');
    checkBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            increaseBarHeight();
        });
    });

    // Add event listener for the .delete-btn elements
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            decreaseBarHeight();
        });
    });
});

// Retrieve the stored value for c6 from localStorage or set to 0 initially
let c6 = localStorage.getItem('fridayValue') || 0;

// Sample data for the bar graph
let data = [5, 8, 6, 10, 7, parseInt(c6), 0]; // Set Saturday's value to 0
const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get the canvas context and other elements
const ctx = document.getElementById('weeklyBarGraph').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Tasks',
            data: data,
            backgroundColor: '#ADFA1D',
            hoverBackgroundColor: '#83c804',
            borderWidth: 1,
            borderRadius: 10,
            // Setting font properties for the dataset label
            text: {
                font: {
                    family: 'Source Code Pro',
                    size: 14, // Adjust font size if needed
                    weight: 'bold', // Adjust font weight if needed
                }
            }
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'Source Code Pro',
                        color: '#94a3b8',
                        size: 17 // Font size for x-axis labels
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        family: 'Source Code Pro',
                        color: '#94a3b8',
                        size: 17 // Font size for y-axis labels
                    }
                }
            },
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    },
                    title: function (tooltipItem) {
                        const dayIndex = labels.indexOf(tooltipItem[0].label);
                        return dayIndex !== -1 ? fullDayNames[dayIndex] : tooltipItem[0].label;
                    }
                },
                bodyFontFamily: 'Source Code Pro', // Font for tooltip
                bodyFontColor: '#ffffff' // Font color for tooltip
            }
        }
    }
});

// Function to calculate the progress percentage based on the comparison of the sixth bar with the average of the first five bars
function calculateProgressPercentage() {
    // Get the heights of the first five bars
    const firstFiveBars = data.slice(0, 5); // Get an array of the first five bars
    const sumFirstFiveBars = firstFiveBars.reduce((total, height) => total + height, 0);
    const averageFirstFiveBars = sumFirstFiveBars / firstFiveBars.length;

    const sixthBarHeight = data[5]; // Get the height of the sixth bar

    // Calculate the progress percentage
    let progressPercentage = (sixthBarHeight * 100) / averageFirstFiveBars;

    // Limit the progress percentage to a maximum of 100% if it exceeds
    progressPercentage = Math.min(progressPercentage, 100);

    // Update the progress text with the calculated percentage
    const progressText = document.getElementById('progressText');
    progressText.textContent = `${progressPercentage.toFixed(2)}%`;
}

// Function to increase the rightmost bar height by 1 unit and update progress bar
function increaseBarHeight() {
    c6 = parseInt(c6) + 1; // Increase Friday's value by 1
    data[5] = c6;
    myChart.data.datasets[0].data = data;
    myChart.update();
    localStorage.setItem('fridayValue', c6); // Store updated value in localStorage

    // Call the increaseProgressBar function to update the progress bar
    increaseProgressBar();
}

// Function to decrease the rightmost bar height by 1 unit and update progress bar
function decreaseBarHeight() {
    if (c6 > 0) {
        c6 = parseInt(c6) - 1; // Decrease Friday's value by 1
        data[5] = c6;
        myChart.data.datasets[0].data = data;
        myChart.update();
        localStorage.setItem('fridayValue', c6); // Store updated value in localStorage

        // Call the decreaseProgressBar function to update the progress bar
        decreaseProgressBar();
    }
}


function increaseProgressBar() {
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progressText');

    const sixthBarHeight = data[5]; // Get the height of the sixth bar
    const averageFirstFive = data.slice(0, 5).reduce((acc, val) => acc + val, 0) / 5; // Calculate the average of the first five bars

    let progressPercentage = (sixthBarHeight * 100) / averageFirstFive;

    // Limit the progress percentage to a maximum of 100%
    progressPercentage = Math.min(progressPercentage, 100);

    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage.toFixed(2)}%`;
}

function decreaseProgressBar() {
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progressText');

    const sixthBarHeight = data[5]; // Get the height of the sixth bar
    const averageFirstFive = data.slice(0, 5).reduce((acc, val) => acc + val, 0) / 5; // Calculate the average of the first five bars

    let progressPercentage = (sixthBarHeight * 100) / averageFirstFive;
    console.log(progressPercentage);

    // Limit the progress percentage to a maximum of 100%
    progressPercentage = Math.min(progressPercentage, 100);

    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage.toFixed(2)}%`;
}

function adjustProgressBarWidth() {
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progressText');

    const sixthBarHeight = data[5]; // Get the height of the sixth bar
    const averageFirstFive = data.slice(0, 5).reduce((acc, val) => acc + val, 0) / 5; // Calculate the average of the first five bars

    let progressPercentage = (sixthBarHeight * 100) / averageFirstFive;

    // Limit the progress percentage to a maximum of 100%
    progressPercentage = Math.min(progressPercentage, 100);

    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage.toFixed(2)}%`;
}