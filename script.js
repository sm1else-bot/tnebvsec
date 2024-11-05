document.addEventListener('DOMContentLoaded', function () {
    fetch('vehicles.csv')
        .then(response => response.text())
        .then(data => {
            console.log("CSV data loaded:");
            console.log(data);  // Debug: Show raw CSV data
            window.vehicleData = parseCSV(data);
            console.log("Parsed vehicle data:");
            console.log(window.vehicleData);  // Debug: Show parsed CSV data
        })
        .catch(error => console.error("Error loading CSV:", error));  // Debug: Handle CSV loading error
});

function parseCSV(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        let entry = {};
        headers.forEach((header, index) => {
            entry[header.trim()] = values[index] ? values[index].trim() : "";  // Handle missing values
        });
        return entry;
    });
}

function checkRegistration() {
    const input = document.getElementById('number-plate').value.trim();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!input) {
        resultsContainer.innerHTML = '<p class="no-match">Please enter the last 4 digits of the number plate.</p>';
        return;
    }

    console.log("User input:", input);  // Debug: Show user input
    const results = window.vehicleData.filter(vehicle => 
        vehicle['number plate'] && vehicle['number plate'].endsWith(input)
    );

    console.log("Filtered results:", results);  // Debug: Show matching results

    if (results.length > 0) {
        resultsContainer.innerHTML = `<p class="match-found">Vehicle Match Found</p>` +
        results.map(vehicle => `
            <p>Name: ${vehicle.name}</p>
            <p>Number Plate: ${vehicle['number plate']}</p>
            <p>Company: ${vehicle.company}</p>
            <hr>
        `).join('');
    } else {
        resultsContainer.innerHTML = '<p class="no-match">No matching vehicle found.</p>';
    }
}
