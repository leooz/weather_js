let latitude = "9.55";

let longitude = "44.050000";
test("gdlksng");

fetch(
  "http://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=82005d27a116c2880c8f0fcb866998a0"
)
  .then(
    (degree) => degree.json() //REcup que les data
  )
  .then((data) => console.log(data));

test("gdlksng");
function test(data) {
  console.log(data);
}
