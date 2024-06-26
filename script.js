document.getElementById('loadDataButton').addEventListener('click', function() {
    fetch('https://brianobruno.github.io/cats.json')
        .then(response => response.json())
        .then(data => {
       
            data.facts.sort((a, b) => a.factId - b.factId);

            const tableBody = document.getElementById('factsTable');
            tableBody.innerHTML = ''; 

            data.facts.forEach(fact => {
                const row = document.createElement('tr');
                const factIdCell = document.createElement('td');
                factIdCell.textContent = fact.factId;
                const factTextCell = document.createElement('td');
                factTextCell.textContent = fact.text;

                row.appendChild(factIdCell);
                row.appendChild(factTextCell);
                tableBody.appendChild(row);
            });

           
            document.getElementById('catImage').src = data.catPhoto;
        })
        .catch(error => console.error('Error fetching data:', error)); // Log errors
});
