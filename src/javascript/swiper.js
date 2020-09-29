let apiUrl = "http://night-club-api.herokuapp.com/assets";

fetch(apiUrl)
  .then((res) => res.json())
  .then((gallery) => {
    let carouselDOM = document.querySelector(".carousel");
    gallery.forEach((element) => {
      console.log(element.url)
      carouselDOM.innerHTML += `<div class="carousel-cell"><img data-flickity-lazyload="${element.url}"></div>`;
    });

    //Init Flickity
    let options = {
      cellAlign: "left",
      wrapAround: true,
      autoPlay: 3000,
      pauseAutoPlayOnHover: true,
      initialIndex: 1,
      lazyLoad: 2,
      imagesLoaded: true,
    };
    let carousel = new Flickity(carouselDOM, options);
    carousel.resize();

  })
  .catch((error) => console.log(error));
