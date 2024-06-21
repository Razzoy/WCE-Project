//   Fetch domain greencheck

const greencheckResult = document.querySelector('#greencheckResult');

async function getGreenCheckData() {
    try {
        const response = await fetch(`https://api.thegreenwebfoundation.org/api/v3/greencheck/climateaction.tech`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.green);
        displayGreenCheck(data.green);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayGreenCheck(data) {
    const dataResult = document.createElement('div');
    dataResult.innerText = JSON.stringify(data);
    greencheckResult.appendChild(dataResult);
}


//   Fetch IP to CO2 Intensity API 

const ipintensityResult = document.querySelector('#ipintensityResult');

async function getIpIntensityData() {
    try {
        const response = await fetch(`https://api.thegreenwebfoundation.org/api/v3/ip-to-co2intensity/35.187.144.0`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.carbon_intensity);
        displayIpIntensity(data.carbon_intensity);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayIpIntensity(data) {
    const dataResult = document.createElement('div');
    dataResult.innerText = ('Intensity of this IP is' + ' '+ JSON.stringify(data) + 'grams per kilowatt-hour');
    ipintensityResult.appendChild(dataResult);
}
