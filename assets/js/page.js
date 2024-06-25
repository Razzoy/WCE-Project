
// fetch co2 intensity


document.addEventListener('DOMContentLoaded', (event) => {
    const ipintensityResult = document.querySelector('#ipintensityResult');
    const inputIntensity = document.querySelector('#inputIntensity');

    async function getIpFromDomain(domain) {
        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const answer = data.Answer.find(record => record.type === 1); // Type 1 indicates an A record (IPv4)
            if (answer) {
                return answer.data;
            } else {
                throw new Error('No A record found for the domain');
            }
        } catch (error) {
            console.error('Error fetching IP address:', error);
            throw error;
        }
    }

    async function getIpIntensityData() {
        const domain = inputIntensity.value.trim();
        if (!domain) {
            console.error('Domain name is required');
            return;
        }
        ipintensityResult.innerText = '';
        try {
            const ipAddress = await getIpFromDomain(domain);
            const response = await fetch(`https://api.thegreenwebfoundation.org/api/v3/ip-to-co2intensity/${ipAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            displayIpIntensity(data.carbon_intensity);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayIpIntensity(data) {
        const dataResult = document.createElement('div');
        dataResult.innerText = `Intensity of this IP is ${JSON.stringify(data)} grams per kilowatt-hour`;
        ipintensityResult.appendChild(dataResult);
    }

    // Add an event listener to trigger the function when the input is submitted (e.g., button click or Enter key)
    const checkIntensityButton = document.querySelector('#checkIntensityButton');
    if (checkIntensityButton) {
        checkIntensityButton.addEventListener('click', getIpIntensityData);
    } else {
        console.error('Button not found');
    }
});


// Fetch domain greencheck

const greencheckResult = document.querySelector('#greencheckResult');
const inputCheck = document.querySelector('#inputCheck');

async function getGreenCheckData() {
    const domain = inputCheck.value;
    greencheckResult.innerText = '';
    try {
        const response = await fetch(`https://api.thegreenwebfoundation.org/api/v3/greencheck/${domain}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayGreenCheck(data.green);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayGreenCheck(data) {
    const dataResult = document.createElement('div');
    if (data === true) {
        dataResult.innerText = 'This website provider uses green and renewable energy';
    } else {
        dataResult.innerText = 'This website provider does not use green and renewable energy';
    }
    greencheckResult.appendChild(dataResult);
}
document.querySelector('#checkButton').addEventListener('click', getGreenCheckData);

