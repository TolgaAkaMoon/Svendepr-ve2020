document.addEventListener("DOMContentLoaded", function () {
        fetch("https://svende-api-tolga-fixed.herokuapp.com", {
          "method": "get"
        })
  
          .then((response) => response.json())
          .then((data) => {
        })
          .catch((err) => {
        });
  });
  