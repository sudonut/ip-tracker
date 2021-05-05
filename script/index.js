const apiKey = "at_RZImwWGNn2H4hohnEiQPF1YpOqygR";

document.getElementById("ip-submit").addEventListener("click", getIp);

function getIp() {
  let ip = document.getElementById("ip-input").value;

  fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`)
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.ip;
      const location = data.location.city;
      const timezone = data.location.timezone;
      const isp = data.isp;
      const lat = data.location.lat;
      const lon = data.location.lng;

      document.getElementById("ip-address").innerHTML = ipAddress;
      document.getElementById("ip-location").innerHTML = location;
      document.getElementById("ip-timezone").innerHTML = timezone;
      document.getElementById("ip-isp").innerHTML = isp;

      console.log(ipAddress, location, timezone);
    });
}

function generateMap() {
  let myMap = L.map("map").setView([51.505, -0.09], 13);
  const locationPin = L.icon({
    iconUrl: "imgs/icon-location.svg",
  });
  L.marker([51.505, -0.09], { icon: locationPin }).addTo(myMap);
  L.tileLayer(
    "https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=rbPdbXPCW2tS6QkeFTal"
  ,
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }
  ).addTo(myMap);
};

// function generateMap() {
//   let mymap = L.map("map").setView([51.505, -0.09], 13);
//   let locationPin = L.icon({
//     iconUrl: "imgs/icon-location.svg",
//   });
//   L.marker([51.5, -0.09], { icon: locationPin }).addTo(mymap);

//   L.tileLayer(
//     "https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=rbPdbXPCW2tS6QkeFTal",
//     {
//       attribution:
//         '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
//     }
//   ).addTo(mymap);
// };

generateMap();
