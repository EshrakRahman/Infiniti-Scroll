const imageContainerElm = document.getElementById('image-container');
const loaderElm = document.getElementById('loader');

// image data from api
let photosArray = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// unsplash api keys
const count = 10;
const apiKey = "fZSRfj35e-nqObyPff2W-g_F7LwaVoLnm2nDM4ah030";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all the images are loaded
function isAllImageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loaderElm.hidden = true;
        ready = true;
    }
}

// create set attributes function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// displaying photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photos => {
        let item = document.createElement('a');
        setAttributes(item, {
            href: photos.links.html,
            target: '_blank'
        });
        let image = document.createElement('img');
        setAttributes(image, {
            src: photos.urls.regular,
            alt: photos.alt_description,
            title: photos.alt_description
        });
        // event listener to check all the images are loaded
        image.addEventListener('load', isAllImageLoaded);
        // put img tag inside a tag then put both of them to image container
        item.appendChild(image);
        imageContainerElm.appendChild(item);
    });
}

// fetching from unsplash
async function getImagesFromUnsplash() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (e) {
        console.log(e);
    }
}

// scroll event

window.addEventListener('scroll', (evt) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getImagesFromUnsplash();
    }
});
// on load
getImagesFromUnsplash();
