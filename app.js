const advice = document.getElementById("advice");
const btn = document.getElementById("btn");

// Global variable to store the advice data
let randomAdvice;

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to fetch and display random advice
function fetchRandomAdvice() {
    fetch(`https://api.adviceslip.com/advice?timestamp=${Date.now()}`)
        .then(resp => resp.json())
        .then(data => {
            // Store the data in the global variable
            randomAdvice = data;
            const adviceText = randomAdvice.slip.advice;

            // Split the advice text into words
            const words = adviceText.split(' ');

            // Generate a single random color
            const randomColor = getRandomColor();

            // Wrap each word in a span and color every fourth word
            const coloredWords = words.map((word, index) => {
                if ((index + 1) % 4 === 0) {
                    return `<span style="color: ${randomColor}; font-size: 2.5rem !important;">${word}</span>`;
                } else {
                    return word;
                }
            });

            // Join the words back into a string and update the advice element
            advice.innerHTML = coloredWords.join(' ');
        })
        .catch(error => {
            console.error("Error fetching data. Please try again later!");
        });
}

// Call the function to fetch advice initially
fetchRandomAdvice();

// Event listener for clicking the button
btn.addEventListener('click', fetchRandomAdvice);
