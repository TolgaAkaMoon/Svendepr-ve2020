document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const path = window.location.pathname.replace(/\//g, "");
  const animalId = params.get("animal");

  fetch(
    `https://svende-api-tolga-fixed.herokuapp.com/api/v1/animals/${animalId}`,
    {
      method: "get",
    }
  )
    .then((response) => response.json())
    .then((pet) => {
      let idag = new Date();
      let dageSiden = new Date(pet.createdAt);
      dageSiden.setHours("0", "0", "0", "0");
      idag.setHours("0", "0", "0", "0");
      let forskellenTid = dageSiden.getTime() - idag.getTime();
      let forskelleniDage = forskellenTid / (1000 * 3600 * 24);
      let nyTid = `${forskelleniDage}`.replace("-", "");
      let petUrl = pet.asset.url.replace(
        "localhost:4000",
        "svende-api-tolga-fixed.herokuapp.com"
      );
      document.querySelector(".single__name").innerHTML = pet.name;
      document.querySelector(".single__desc").innerHTML = pet.description;
       document.querySelector(".single__age").innerHTML = pet.age + " år gammel";
      document.querySelector(".single__created").innerHTML = "Dette dyr har været på internatet i" + " " + nyTid + " " + "dage";
      document.querySelector(".single__img").setAttribute("src", petUrl)
    })
    document.querySelector(".single__back").addEventListener("click", function() {
        window.location.href = '/#vores';
    })
    .catch((err) => {
      console.log(err);
    });
});
