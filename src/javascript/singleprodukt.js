document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const path = window.location.pathname.replace(/\//g, "");
  const skuId = params.get("sku");

  const db = firebase.firestore();

  let docRef = db.collection("wine").doc(skuId);

  docRef.get().then(function (doc) {
    const sku = new URL(window.location).searchParams.get("sku");
    const container = document.getElementsByClassName("page")[0];

    doc.data().image.forEach((element) => {
      container.querySelector(".gallery").innerHTML += `
			<img src="/assets/images/${element}" alt="" class="gallery__small">`;
    });

    container.querySelector(".gallery__large").src = `/assets/images/${
      doc.data().image[0]
    }`;

    container.querySelectorAll(".gallery__small").forEach(function (img) {
      img.addEventListener("click", function () {
        container.querySelector(".gallery__large").src = this.src;
      });
    });

    container.querySelector(".name").innerText = doc.data().name;
    container.querySelector(".country").innerText = doc.data().country;
    container.querySelector(".region").innerText = doc.data().region;
    container.querySelector(".price").innerText = doc.data().price + " DKK";
    container.querySelector(".category").innerText = doc.data().category;

    document
      .querySelector(".unorderedList")
      .addEventListener("mouseover", function (event) {
        if (event.target.tagName == "LI") {
          let rating = event.target.dataset.rating;
          event.target.classList.add("checked");
        }
      });

    document
      .querySelector(".unorderedList")
      .addEventListener("click", function (event) {
        if (event.target.tagName == "LI") {
          const stars = parseInt(event.target.dataset.rating);

          docRef
            .collection("ratings")
            .doc("rating")
            .update({
              usersRated: firebase.firestore.FieldValue.increment(1),
              totalStars: firebase.firestore.FieldValue.increment(stars),
            });

          console.log(event.target.dataset.rating);
        }
      });

    docRef
      .collection("ratings")
      .doc("rating")
      .onSnapshot(function (doc) {
        console.log(doc.data());
        const usersRated = doc.data().usersRated;
        const totalStars = doc.data().totalStars;

        const abage = totalStars / usersRated;

        if ((usersRated, totalStars == 0)) {
          container.querySelector(".spanGennemsnit").innerText =
            "Gennemsnit: " + 0.0;
        } else {
          container.querySelector(".spanGennemsnit").innerText =
            "Gennemsnit: " + abage.toFixed(1);
        }
      });

    document
      .querySelector(".unorderedList")
      .addEventListener("mouseout", function (event) {
        if (event.target.tagName == "LI") {
          event.target.classList.remove("checked");
        }
      });
  });
});
