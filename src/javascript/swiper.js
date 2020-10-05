let apiUrl = "https://svende-api-tolga-fixed.herokuapp.com/api/v1/animals";

fetch(apiUrl, {
  method: "get",
})
  .then((res) => res.json())
  .then((data) => {
    let carouselDOM = document.querySelector(".carousel");
    data.forEach((animal) => {
      let idag = new Date();
      let dageSiden = new Date(animal.createdAt);
      dageSiden.setHours("0", "0", "0", "0");
      idag.setHours("0", "0", "0", "0");
      let forskellenTid = dageSiden.getTime() - idag.getTime();
      let forskelleniDage = forskellenTid / (1000 * 3600 * 24);
      let nyTid = `${forskelleniDage}`.replace("-", "");
      
      document.querySelector(".box__countVores").innerHTML = data.length + " " + "Dyr";

      
      let fixedUrl = animal.asset.url.replace(
        "localhost:4000",
        "svende-api-tolga-fixed.herokuapp.com"
      );
      let dateF = animal.createdAt;

      carouselDOM.innerHTML += `
      <a href="/dyr/?animal=${animal.id}" class="animals__animal">
      <img class="animal__img" src="${fixedUrl}">
      <section>
          <h3 class="animal__title">${animal.name}</h3>
          <p class="animal__desc">${animal.description}</p>
          <p class="animal__time">Været på internatet i ${nyTid} dage.</p>
      </section>
    </a>      
      `;
    });

    let options = {
      setGallerySize: true,
      cellAlign: "center",
      wrapAround: true,
      autoPlay: 3000,
      pauseAutoPlayOnHover: true,
      initialIndex: 0,
      lazyLoad: 2,
      imagesLoaded: true,
    };
    let carousel = new Flickity(carouselDOM, options);
    carousel.resize();

  })
  .catch((error) => console.log(error));
