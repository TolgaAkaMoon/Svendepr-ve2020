document.addEventListener("DOMContentLoaded", function () {
  // Newsletter Script
  let subEmail = document.querySelector(".form__imputBrevEmail");
  let subName = document.querySelector(".form__imputBrevName");
  let subButton = document.querySelector(".form__buttonBrev");
  let subError = document.querySelector(".form__errorHandler");
  let subEmailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  subButton.addEventListener("click", function () {
    if ((subButton.value === "Afmeld")) {
      fetch(`https://svende-api-tolga-fixed.herokuapp.com/api/v1/subscribers/${subEmail}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status == 200) {
            subButton.value = "Tilmeld";
            subError.textContent = "Du er nu afmeldt";
            subError.style.opacity = "1";
            subError.style.color = "green";
            subEmail.value = "";
            subName.value = "";
            subEmail.style.color = "black";
            subName.style.color = "black";
            subEmail.readOnly = false;
            subName.readOnly = false;
            subButton.style.backgroundColor = "rgb(0, 102, 255)";
            setTimeout(() => {
              subError.style.opacity = "0";
            }, 3000);
          } else {
            subError.textContent = "Kunne ikke aflmelde fra nyhedsbrevet";
            subError.style.opacity = "1";
            subError.style.color = "red";
          }
        })
        .catch((err) => {
        });
    } else {
      if (subEmail.value !== "" && subName !== "") {
        subError.style.opacity = "0";
        subEmail.style.backgroundColor = "white";
        if (subEmail.value.match(subEmailFormat) && subName !== "") {
          subError.textContent = "Vent venligst...";
          subError.style.opacity = "1";
          subEmail.style.backgroundColor = "white";
          fetch(
            "https://svende-api-tolga-fixed.herokuapp.com/api/v1/subscribers",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `name=${subName.value}&email=${subEmail.value}`,
            }
          )
            .then((response) => response.json())
            .then((data) => {
              subError.style.color = "Green";
              subError.textContent = "Du er nu tilmeldt til vores nyhedsbrev!";
              subError.style.opacity = "1";
              subEmail.value = data.email;
              subName.value = data.name;
              subEmail.style.color = "rgba(0, 0, 0, 0.500)";
              subName.style.color = "rgba(0, 0, 0, 0.500)";
              subEmail.readOnly = true;
              subName.readOnly = true;
              subButton.value = "Afmeld";
              subButton.style.backgroundColor = "red";
            })
            .catch((err) => {
              subError.style.color = "red";
              subError.textContent = "Dette E-mail er allerede tilmeldt";
              subError.style.opacity = "1";
              subError.style.color = "red";
            });
        } else {
          subError.textContent = "Forkert E-mail";
          subError.style.opacity = "1";
          subEmail.style.backgroundColor = "rgba(255, 0, 0, 0.200)";
          subError.style.color = "red";
        }
      } else {
        subEmail.style.backgroundColor = "rgba(255, 0, 0, 0.200)";
        subError.textContent = "Alle felter skal udfyldes!!";
        subError.style.opacity = "1";
        subError.style.color = "red";
      }
      if (subName.value !== "") {
        subName.style.backgroundColor = "white";
      } else {
        subError.style.color = "red";
        subName.style.backgroundColor = "rgba(255, 0, 0, 0.200)";
        subError.textContent = "Alle felter skal udfyldes!!";
        subError.style.opacity = "1";
      }
    }
  });

  /*     fetch("https://svende-api-tolga-fixed.herokuapp.com/api/v1/abouts", {
        method: "get",
      })
        .then((response) => response.json())
        .then((about) => {
        })
    .catch((err) => {
        console.log(err);
    }); */

  // About Script
  fetch("https://svende-api-tolga-fixed.herokuapp.com/api/v1/abouts", {
    method: "get",
  })
    .then((response) => response.json())
    .then((about) => {
      about.forEach((omos) => {
        document.querySelector(".about").innerHTML += `
                <section class="about__section">
                    <h2 class="section__aboutText">${omos.title}</h2>
                    <p class="section__aboutDesc">${omos.content}</p>
                </section>
                `;
      });
    })
    .catch((err) => {
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
                <div class="box__containerFrivilig">
                    <img class="container__imgFrivilig" src="${volunteerUrl}">
                    <p class="container__descFrivilig">${volunteer.content}</p>
                    </div>
                    <div class="box__bottomFrivilig"></div>
                </div>
                `;
        } else {
          document.querySelector(".frivilig__section").innerHTML += `
                <div class="frivilig__box">
                <div class="box__textFrivilig"><span class="textFrivilig__span">${volunteer.title}</span></div>
                <div class="box__containerFrivilig">
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
    });

  fetch("https://svende-api-tolga-fixed.herokuapp.com/api/v1/adoptsections", {
    method: "get",
  })
    .then((response) => response.json())
    .then((banner) => {
        document.querySelector(".box__text").textContent = banner[0].title;
        document.querySelector(".box__desc").textContent = banner[0].content;

        document.querySelector(".box__text2").textContent = banner[1].title;
        document.querySelector(".box__desc2").textContent = banner[1].content;

        document.querySelector(".box__text3").textContent = banner[2].title;
        document.querySelector(".box__desc3").textContent = banner[2].content;
    })
    .catch((err) => {
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
                <a href="/dyr/?animal=${animal.id}" class="animals__animal">
                    <img class="animal__img" src="${fixedUrl}">
                    <section>
                        <h3 class="animal__title">${animal.name}</h3>
                        <p class="animal__desc">${animal.description}</p>
                        <p class="animal__time">Været på internettet i ${nyTid} dage.</p>
                    </section>
                </a>
                `;
      });
    })
    .catch((err) => {
    });
});
