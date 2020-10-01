let mainNav = document.getElementById('uList');
let navBarToggle = document.querySelector("#checkboxLabel");
let checbox = document.querySelector("#checkbox");

// Give class active when you click on the Burger Menu
navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle('active');
  if (mainNav.classList == "") {
    mainNav.id = "navLeftToRight";
    mainNav.style=""
    setTimeout(function(){
      mainNav.id = "uList";
    }, 500);
  }
  else {
    mainNav.style="animation: rightToLeft 0.6s ease;";
    mainNav.id = "uList";
  }
});
