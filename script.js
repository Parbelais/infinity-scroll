const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 5;
const apiKey = 'tWbNNX1BEZwg6AxcwOlpRy8Hqv73u_gvOyWLmY8qM0I';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imageLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

//Helper function to set attributes on DOM elements (DRY code)
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements For Links & Photos, Add to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
      //  Create an anchor <a> to link to Unsplash
      const item = document.createElement('a');
      setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    });
      //Create image for photo
      const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    //Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
      //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}


//Get photos from Unsplash API
async function getPhotos () {
    try {
      const response = await fetch(apiURL);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
        //Catch Error Here
    }
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=> {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});


//On Load
getPhotos();