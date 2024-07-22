const publicKey = "fadc2efad24eda425f9b278001eef032";
const privateKey = "c76e7d38c0729cb35bb720aa7bd20c06ce1c2c9b";

function generateHash(timestamp) {
    return CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
}

function findyourherovillain() {
    console.log("Function called");
    const characterName = document.getElementById('character-search').value;
    console.log("Character name:", characterName);
    
    if (!characterName) {
        console.log("No character name entered");
        alert("Please enter a character name");
        return;
    }
    
    const timestamp = new Date().getTime();
    const hash = generateHash(timestamp);
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${characterName}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    
    console.log("API URL:", apiUrl);
    
    fetch(apiUrl)
        .then(response => {
            console.log("Response received", response);
            return response.json();
        })
        .then(data => {
            console.log("Data received", data);
            if (data.data.results.length > 0) {
                displayCharacters(data.data.results);
            } else {
                console.log("No characters found");
                alert("No characters found. Try another name.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        });
}

function displayCharacters(characters) {
    const container = document.getElementById('characters-container');
    container.innerHTML = '';
    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'col-md-4 mb-4';
        characterDiv.innerHTML = `
            <div class="card">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">${character.description || 'No description available.'}</p>
                </div>
            </div>
        `;
        container.appendChild(characterDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-button').addEventListener('click', findyourherovillain);
    document.getElementById('character-search').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            findyourherovillain();
        }
    });
});