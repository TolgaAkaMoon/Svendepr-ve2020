document.addEventListener("DOMContentLoaded", function () {
  let email = document.querySelector(".form__user");
  let pass = document.querySelector(".form__pass");
  let button = document.querySelector(".form__button");

  button.addEventListener("click", function () {
    if (email.value !== "") {
      document.querySelector(".form__user--error").style.opacity = "0";
      if (pass.value !== ""){
        document.querySelector(".form__user--error").style.opacity = "0";
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
            document.querySelector(".form__pass--error").innerHTML = "Succssfully signed in"
            document.querySelector(".form__pass--error").style.opacity = "1";
            document.querySelector(".form__pass--error").style.color = "green";
          } else if (data) {
            document.querySelector(".form__pass--error").innerHTML = "Error, could not sign in"
            document.querySelector(".form__pass--error").style.opacity = "1";
            document.querySelector(".form__pass--error").style.color = "red";
          }
        })
        .catch((err) => {
          document.querySelector(".form__pass--error").innerHTML = "Wrong username or password! " 
          document.querySelector(".form__pass--error").style.opacity = "1";
          document.querySelector(".form__pass--error").style.color = "red";
        });
      }
    } else {
        document.querySelector(".form__user--error").innerHTML = "Username cannot be blank"
        document.querySelector(".form__user--error").style.opacity = "1";
    };
    if (pass.value !== "") {
        document.querySelector(".form__pass--error").style.opacity = "0";
    } else {
        document.querySelector(".form__pass--error").innerHTML = "Password cannot be blank"
        document.querySelector(".form__pass--error").style.opacity = "1";
    };
  });
});
