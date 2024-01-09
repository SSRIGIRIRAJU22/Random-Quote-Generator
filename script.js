const quoteEl = document.getElementById("quote");
const btnEl = document.getElementById("btn");
const authorEl = document.getElementById("author");
const volumeEl = document.querySelector(".fa-volume-high");
const copyEl = document.querySelector(".fa-copy");

let quoteContent = "";

const apiURL = "https://api.quotable.io/random";

async function getQuote() {

    try {
        
        btnEl.innerText = "Loading...";
        btnEl.disabled = true;
        const response = await fetch(apiURL);
        const data = await response.json();

        quoteContent = data.content;
        const quoteAuthor = data.author;

        quoteEl.innerText = quoteContent;
        authorEl.innerText = "~ " + quoteAuthor;

        btnEl.innerText = "Get a quote";
        btnEl.disabled = false;

    } catch (error) {
        console.log(error);
        quoteEl.innerText = "An error happend, try again later";
        authorEl.innerText = "";
        btnEl.innerText = "Get a quote";
        btnEl.disabled = false;
    }
    
}

getQuote()

btnEl.addEventListener("click", getQuote);

volumeEl.addEventListener("click", () => {
    volumeEl.classList.add("active");
    const speechText = new SpeechSynthesisUtterance(quoteContent);
    window.speechSynthesis.speak(speechText);

    speechText.onend = function() {
        volumeEl.classList.remove("active");
    }
});

copyEl.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteContent);
});