const quoteEl = document.getElementById("quote");
const btnEl = document.getElementById("btn");
const authorEl = document.getElementById("author");

const apiURL = "https://api.quotable.io/random";

async function getQuote() {

    try {
        
        btnEl.innerText = "Loading...";
        btnEl.disabled = true;
        const response = await fetch(apiURL);
        const data = await response.json();

        const quoteContent = data.content;
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
