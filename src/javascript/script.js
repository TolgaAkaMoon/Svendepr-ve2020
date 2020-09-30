document.addEventListener("DOMContentLoaded", function () {

    fetch("https://svende-api-tolga-fixed.herokuapp.com/api/v1/abouts", {
        method: "get",
      })
        .then((response) => response.json())
        .then((about) => {
            about.forEach(omos => {
                document.querySelector(".about").innerHTML += `
                <section class="about__section">
                    <h2 class="section__aboutText">${omos.title}</h2>
                    <p class="section__aboutDesc">${omos.content}</p>
                </section>
                `
            });
        })
    .catch((err) => {
        console.log(err);
    });


// Volunteers Script
  fetch("https://svende-api-tolga-fixed.herokuapp.com/api/v1/volunteers", {
    method: "get",
  })
    .then((response) => response.json())
    .then((voluns) => {
      voluns.forEach((volunteer) => {
        let volunteerUrl = volunteer.asset.url.replace(
          "localhost:4000",
          "svende-api-tolga-fixed.herokuapp.com"
        );
        if (volunteer.extra == "") {
          document.querySelector(".frivilig__section").innerHTML += `
                <div class="frivilig__box">
                <div class="box__textFrivilig"><span class="textFrivilig__span">${volunteer.title}</span></div>
                <div class="box__container">
                    <img class="container__imgFrivilig" src="${volunteerUrl}">
                    <p class="container__descFrivilig">${volunteer.content}</p>
                    </div>
                </div>
                `;
        } else {
          document.querySelector(".frivilig__section").innerHTML += `
                <div class="frivilig__box">
                <div class="box__textFrivilig"><span class="textFrivilig__span">${volunteer.title}</span></div>
                <div class="box__container">
                    <img class="container__imgFrivilig" src="${volunteerUrl}">
                    <p class="container__descFrivilig">${volunteer.content}</p>
                    </div>
                    <div class="box__bottomFrivilig"><span class="bottomFrivilig__span">${volunteer.extra}</span></div>
                </div>
                `;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });


    fetch("https://svende-api-tolga-fixed.herokuapp.com/api/v1/adoptsections", {
        method: "get",
      })
        .then((response) => response.json())
        .then((banner) => {
            console.log(banner)
            banner.forEach(dyrNod => {
                document.querySelector(".box__text").textContent = dyrNod.title
                document.querySelector(".box__desc").textContent = dyrNod.content
            });
        })
    .catch((err) => {
        console.log(err);
    });

    // Animals Script
  fetch("https://svende-api-tolga-fixed.herokuapp.com/api/v1/animals", {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".box__countVores").innerHTML =
        data.length + " " + "Dyr";
      data.forEach((animal) => {
        let idag = new Date();
        let dageSiden = new Date(animal.createdAt);
        dageSiden.setHours("0", "0", "0", "0");
        idag.setHours("0", "0", "0", "0");
        let forskellenTid = dageSiden.getTime() - idag.getTime();
        let forskelleniDage = forskellenTid / (1000 * 3600 * 24);
        let nyTid = `${forskelleniDage}`.replace("-", "");

        let fixedUrl = animal.asset.url.replace(
          "localhost:4000",
          "svende-api-tolga-fixed.herokuapp.com"
        );
        let dateF = animal.createdAt;
        document.querySelector(".vores__animals").innerHTML += `
                <div class="animals__animal">
                    <img class="animal__img" src="${fixedUrl}">
                    <section>
                        <h3 class="animal__title">${animal.name}</h3>
                        <p class="animal__desc">${animal.description}</p>
                        <p class="animal__time">Været på internettet i ${nyTid} dage.</p>
                    </section>
                </div>
                `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
