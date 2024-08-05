async function getQuote() {
    return fetch('/meditations.json')
        .then(response => response.json())
        .then(data => {
            const books = Object.keys(data);
            const bookIndex = Math.floor(Math.random() * books.length);
            const bookTitle = books[bookIndex];
            const quotes = data[bookTitle];
            const quoteIndex = Math.floor(Math.random() * quotes.length);
            const [index, quote] = quotes[quoteIndex];
            return `${bookTitle}.${index} "${quote}"`;
        });
}

function setText() {
    chrome.storage.local.get(['marcusDate', 'marcusText'], (result) => {
        let date = new Date().toISOString().split('T')[0]; 
        if (result.marcusDate === date) {
            document.getElementById('text').innerText = result.marcusText;
        } else {
            refresh();
        }
    });
}

function refresh() {
    console.log('refreshing'); 
    getQuote().then(newQuote => {
        let date = new Date().toISOString().split('T')[0];
        chrome.storage.local.set({marcusDate: date, marcusText: newQuote}, () => {
            document.getElementById('text').innerText = newQuote;
        });
    });
}

document.getElementById('refresh').addEventListener('click', refresh);

setText();
