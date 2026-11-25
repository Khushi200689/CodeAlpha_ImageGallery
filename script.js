const images = [
  {name:"Beautiful Mountains", category:"nature", url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"},
  {name:"Green Forest", category:"nature", url:"https://images.unsplash.com/photo-1448375240586-882707db888b"},
  {name:"Ocean View", category:"nature", url:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21"},
  {name:"Cute Fox", category:"animals", url:"https://images.unsplash.com/photo-1474511320723-9a56873867b5"},
  {name:"Beautiful Bird", category:"animals", url:"https://images.unsplash.com/photo-1444464666168-49d633b86797"},
  {name:"Wild Elephant", category:"animals", url:"https://images.unsplash.com/photo-1557050543-4d5f4e07ef46"},
  {name:"City Architecture", category:"architecture", url:"https://images.unsplash.com/photo-1511818966892-d7d671e672a2"},
  {name:"Modern Building", category:"architecture", url:"https://images.unsplash.com/photo-1487958449943-2429e8be8625"},
  {name:"Historic Building", category:"architecture", url:"https://images.unsplash.com/photo-1519608487953-e999c86e7455"},
  {name:"Delicious Pizza", category:"food", url:"https://images.unsplash.com/photo-1513104890138-7c749659a591"},
  {name:"Fresh Dessert", category:"food", url:"https://images.unsplash.com/photo-1551024506-0bccd828d307"},
  {name:"Tasty Breakfast", category:"food", url:"https://images.unsplash.com/photo-1490645935967-10de6ba17061"}
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const preview = document.getElementById("preview");
const caption = document.getElementById("caption");

let currentImages = images;
let currentIndex = 0;

function displayImages(items) {
  currentImages = items;
  gallery.innerHTML = "";

  items.forEach((item, index) => {
    const img = document.createElement("img");
    img.src = item.url + "?auto=format&fit=crop&w=700&q=80";
    img.alt = item.name;
    img.loading = "lazy";

    img.addEventListener("click", () => openPreview(index));
    gallery.appendChild(img);
  });
}

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;

    displayImages(
      filter === "all"
        ? images
        : images.filter(item => item.category === filter)
    );
  });
});

function openPreview(index) {
  currentIndex = index;
  updatePreview();
  lightbox.classList.add("show");
}

function updatePreview() {
  const item = currentImages[currentIndex];
  preview.src = item.url + "?auto=format&fit=max&w=1200&q=90";
  caption.textContent = item.name;
}

document.getElementById("close").onclick = () => {
  lightbox.classList.remove("show");
};

document.getElementById("next").onclick = () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updatePreview();
};

document.getElementById("prev").onclick = () => {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  updatePreview();
};

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("show")) return;

  if (event.key === "Escape") lightbox.classList.remove("show");
  if (event.key === "ArrowRight") document.getElementById("next").click();
  if (event.key === "ArrowLeft") document.getElementById("prev").click();
});

displayImages(images);