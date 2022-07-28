const OPTIONS = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cbbd4be2ddmsh142d5b1a43c05d8p1ce764jsn21fa7944a3fe',
      'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
    }
  };

const fetchIpInfo = ip => {
    return fetch(`https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.error(err))
};

const form = document.querySelector('#form');
const ip = document.querySelector('#ip');
const submit = document.querySelector('#submit');
const results = document.querySelector('#results');
const flag = document.querySelector('#flag');
const connection = document.querySelector('#connection');
const currency = document.querySelector('#currency');
const vpn = document.querySelector('#vpn');

form.addEventListener('submit', async (event) => {
event.preventDefault();
const {value} = ip;
if(!value) return

submit.setAttribute('disabled', '');
submit.setAttribute('aria-busy', 'true');

const ipInfo = await fetchIpInfo(value);

if(ipInfo) {
    console.log(JSON.stringify(ipInfo, null, 2));
    flag.innerHTML =  '<img src="'+ipInfo.location.country.flag.emojitwo+'" style="height: 100px"></img>';
    connection.innerHTML = 'Connection: '+ipInfo.connection.domain;
    currency.textContent = 'Currency: '+ipInfo.currency.name;
    vpn.textContent = 'VPN: ' + ipInfo.security.is_vpn;
}

submit.removeAttribute('disabled');
submit.removeAttribute('aria-busy');

});