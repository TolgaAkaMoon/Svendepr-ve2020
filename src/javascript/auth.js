document.addEventListener("DOMContentLoaded", function () {
  let email = document.querySelector(".form__user");
  let pass = document.querySelector(".form__pass");
  let button = document.querySelector(".form__button");

  button.addEventListener("click", function () {
    if (email.value !== "") {
      document.querySelector(".form__user--error").style.opacity = "0";
      if (pass.value !== ""){
        document.querySelector(".form__pass--error").innerHTML = "Logger ind...."
        document.querySelector(".form__pass--error").style.opacity = "1";
        document.querySelector(".form__pass--error").style.color = "gray";
      fetch("https://svende-api-tolga-fixed.herokuapp.com/auth/token", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "body": `username=${email.value}&password=${pass.value}`
      })

        .then((response) => response.json())
        .then((data) => {
          if (data.token !== undefined) {
            sessionStorage.setItem("token", data.token);
            // sessionStorage.getItem("token")
            document.querySelector(".form__pass--error").innerHTML = "Du er nu logget ind :D"
            document.querySelector(".form__pass--error").style.opacity = "1";
            document.querySelector(".form__pass--error").style.color = "green"
          } else if (data) {
            document.querySelector(".form__pass--error").innerHTML = "Fejl, kunne ikke logge ind!"
            document.querySelector(".form__pass--error").style.opacity = "1";
            document.querySelector(".form__pass--error").style.color = "red";
          }
        })
        .catch((err) => {
          document.querySelector(".form__pass--error").innerHTML = "Forkert brugernavn eller adgangskode!" 
          document.querySelector(".form__pass--error").style.opacity = "1";
          document.querySelector(".form__pass--error").style.color = "red";
        });
      }
    } else {
        document.querySelector(".form__user--error").innerHTML = "Brugernavn må ikke være tomt"
        document.querySelector(".form__user--error").style.opacity = "1";
    };
    if (pass.value !== "") {
    } else {
        document.querySelector(".form__pass--error").innerHTML = "Adgangskode må ikke være tomt"
        document.querySelector(".form__pass--error").style.opacity = "1";
    };
  });
});
