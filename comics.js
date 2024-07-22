const publicKey = "fadc2efad24eda425f9b278001eef032";
const privateKey = "c76e7d38c0729cb35bb720aa7bd20c06ce1c2c9b";


function generateHash(timestamp) {
    return CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
}

function searchComics() {
    const comicTitle = document.getElementById('comic-search').value;
    console.log(`Searching for comic: ${comicTitle}`);
    
    if (!comicTitle) {
        alert("Please enter a comic title");
        return;
    }
    
    const timestamp = new Date().getTime();
    const hash = generateHash(timestamp);
    const apiUrl = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${comicTitle}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    
    console.log("API URL:", apiUrl);
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Data received", data);
            if (data.data.results.length > 0) {
                displayComics(data.data.results);
            } else {
                alert("No comics found. Try another title.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        });
}

function displayComics(comics) {
    const container = document.getElementById('comics-container');
    container.innerHTML = '';
    comics.forEach(comic => {
        const comicDiv = document.createElement('div');
        comicDiv.className = 'col-md-4 mb-4';
        comicDiv.innerHTML = `
            <div class="card">
                <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" class="card-img-top" alt="${comic.title}">
                <div class="card-body">
                    <h5 class="card-title">${comic.title}</h5>
                    <p class="card-text">${comic.description || 'No description available.'}</p>
                    <p class="card-text"><small class="text-muted">Issue Number: ${comic.issueNumber}</small></p>
                    <p class="card-text"><small class="text-muted">Page Count: ${comic.pageCount}</small></p>
                </div>
            </div>
        `;
        container.appendChild(comicDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-comics-button').addEventListener('click', searchComics);
    document.getElementById('comic-search').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchComics();
        }
    });
});