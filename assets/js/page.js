//   Fetch domain greencheck

const greencheckResult = document.querySelector('#greencheckResult');
const inputCheck = document.querySelector('#inputCheck');

async function getGreenCheckData() {
    greencheckResult.innerText = '';
    try {
        const response = await fetch('https://api.thegreenwebfoundation.org/api/v3/greencheck/climateaction.tech');
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
    if(data === true){
        dataResult.innerText = 'This website provider uses green and renewable energy';
    } else{
        dataResult.innerText = 'This website provider does not use green and renewable energy';
    }
    greencheckResult.appendChild(dataResult);
}


//   Fetch IP to CO2 Intensity API 

const ipintensityResult = document.querySelector('#ipintensityResult');
const inputIntensity = document.querySelector('#inputIntensity');

async function getIpIntensityData() {
    ipintensityResult.innerText = '';
    try {
        const response = await fetch('https://api.thegreenwebfoundation.org/api/v3/ip-to-co2intensity/35.187.144.0');
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
    dataResult.innerText = ('Intensity of this IP is' + ' ' + JSON.stringify(data) + 'grams per kilowatt-hour');
    ipintensityResult.appendChild(dataResult);
}