const apiKey = "at_RZImwWGNn2H4hohnEiQPF1YpOqygR";

document.getElementById("ip-submit").addEventListener("click", getIp);
document.getElementById("ip-input").addEventListener("keyup", (e) => {
  if (e.key === 'Enter') {
    getIp();
  }
});

let myMap = L.map("map").setView([51.505, -0.09], 13);
let markerGroup = L.layerGroup().addTo(myMap);

const locationIcon = L.icon({
  iconUrl: "imgs/icon-location.svg",
});

L.tileLayer(
  "https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=rbPdbXPCW2tS6QkeFTal"
,
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(myMap);

async function getIp() {
  try {
    let ip = document.getElementById("ip-input").value;
    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}&domain=${ip}`, { mode: "cors" });

    const ipData = await response.json();
    const ipAddress = ipData.ip;
    const location = ipData.location.city;
    const timezone = ipData.location.timezone;
    const isp = ipData.as.name;
    const lat = ipData.location.lat;
    const lon = ipData.location.lng;

    document.getElementById("ip-address").innerHTML = ipAddress;
    document.getElementById("ip-location").innerHTML = location;
    document.getElementById("ip-timezone").innerHTML = timezone;
    document.getElementById("ip-isp").innerHTML = isp;

    function updateMap() {
      markerGroup.clearLayers();
      myMap.panTo({lat: lat, lng: lon});
      L.marker([lat, lon], {icon: locationIcon}).addTo(markerGroup);
    }
    updateMap();
  } catch(e) {
    alert("Error fetching data! Is the domain name or ip correct?");
  }
}

getIp();