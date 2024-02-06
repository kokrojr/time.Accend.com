// Gallery JS

// Initialization
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// Elements
const galleryContainer = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more-btn');
const modal = document.getElementById('fs-container');
let modalImg = document.getElementById('modal-image');
const closeBtn = document.getElementById('closeFImageBtn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const galleryPage = document.getElementById('page');

// Variables
let imagesToLoad = 10;
let imagesLoaded = 0;
let currentImageIndex = -1;
let lastDocument = null; // Track the last document to use as a starting point for the next query
let totalDocumentCount = 0; // Track the total number of documents in the collection

// Image constructor function
class ImageData {
  constructor(id, timeStamp, description, url, location, index) {
    this.id = id;
    this.timeStamp = timeStamp;
    this.description = description;
    this.url = url;
    this.location = location;
    this.index = index;
  }
}

// Fetch the total number of documents in the collection
function getTotalDocumentCount() {
  firestore.collection('gallery_photos').get()
    .then(querySnapshot => {
      totalDocumentCount = querySnapshot.size;
      // Initially, you can load a set number of images, e.g., 10, by calling getImagesFromFirestore();
      getImagesFromFirestore();
    })
    .catch(error => {
      console.error('Error fetching total document count:', error);
    });
}

// Spinner
const spinnerContainer = document.querySelector('.spinner-container');

// Show the spinner when the page loads
window.addEventListener('load', function () {
  spinnerContainer.classList.add('show-spinner');
});

// Function to check if all documents have been loaded
function isAllDocumentsLoaded() {
  return imagesLoaded >= totalDocumentCount;
}

// Fetch images' URLs from Firestore
function getImagesFromFirestore() {
  let index = 0;

  if (isAllDocumentsLoaded()) {
    // If all documents are already loaded, return without making the query
    return;
  }

  // Show the spinner while loading images
  spinnerContainer.classList.add('show-spinner');
  
  let query = firestore.collection('gallery_photos').orderBy('id').limit(imagesToLoad);

  if (lastDocument) {
    query = query.startAfter(lastDocument);
  }

  //

  query.get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const newImageData = new ImageData(
          doc.data().id || null,
          doc.data().timeStamp || null,
          doc.data().description || null,
          doc.data().url || null,
          doc.data().location || null,
          imagesLoaded + index + 1
        );
        createThumbnail(newImageData);
        console.log('image loaded with id ', doc.data().id || null);
        index++;
      });

      imagesLoaded += index;
      lastDocument = querySnapshot.docs[index - 1]; // Update lastDocument with the last fetched document

      // Hide the spinner after images are loaded
      spinnerContainer.classList.remove('show-spinner');

      // Disable the "Load More" button if all documents have been loaded
      if (isAllDocumentsLoaded()) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('disable-pri-btn');
        console.log("LoadMore disabled");
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      spinnerContainer.classList.remove('show-spinner');
    });
}

// Load More images
function loadMoreImages() {
  // imagesToLoad += 5;
  getImagesFromFirestore();
}

// Call to fetch the total document count and initiate loading of images
getTotalDocumentCount();

function createThumbnail(imageObject) {
  const image = new Image();
  image.src = imageObject.url;
  const thumbnail = document.createElement("div");
  thumbnail.classList.add("image-thumb");

  image.addEventListener('click', function() {
    modal.style.display = 'flex';
    modal.classList.add('fadeIn-05s');
    setTimeout(() => {
      modal.classList.remove('fadeIn-05s');
    }, 500);
    modalImg.src = imageObject.url;
    galleryPage.classList.add('no-scroll');

    // Set the currentImageIndex to the index of the clicked thumbnail
    currentImageIndex = imageObject.index;
  });

  thumbnail.appendChild(image);
  galleryContainer.appendChild(thumbnail);
}

// Function to handle key presses
function handleKeyPress(event) {
  if (event.keyCode === 37) {
    // Left arrow key pressed
    showPreviousImage();
  } else if (event.keyCode === 39) {
    // Right arrow key pressed
    showNextImage();
  } else if (event.keyCode === 27) {
    // Escape key pressed
    closeModal();
  }
}

// Event listener for keydown event on the document
document.addEventListener('keydown', handleKeyPress);

// Show the next image
function showNextImage() {
  const thumbnails = document.querySelectorAll('.image-thumb img');
  if (currentImageIndex >= 0 && currentImageIndex < thumbnails.length - 1) {
    currentImageIndex++;
    modalImg.src = thumbnails[currentImageIndex].src;
    // modalImg.classList.add('fadeInRight-05s');
    // setTimeout(()=>{
    //   modalImg.classList.remove('fadeInRight-05s');
    // }, 500);
  }
}

// Show the previous image
function showPreviousImage() {
  const thumbnails = document.querySelectorAll('.image-thumb img');
  if (currentImageIndex > 0 && currentImageIndex < thumbnails.length) {
    currentImageIndex--;
    modalImg.src = thumbnails[currentImageIndex].src;
    // modalImg.classList.add('fadeInRight-05s');
    // setTimeout(()=>{
    //   modalImg.classList.remove('fadeInRight-05s');
    // }, 500);
  }
}

// Close Modal
function closeModal() {
  modal.classList.add("fadeOut-05s");
  setTimeout(() => {
    modal.classList.remove("fadeOut-05s");
    modal.style.display = "none";
  }, 300);
  // modal.style.display = 'none';
  galleryPage.classList.remove("no-scroll");
}

// Event listeners
loadMoreBtn.addEventListener('click', loadMoreImages);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPreviousImage);
closeBtn.addEventListener('click', closeModal);

// Initially load images from Firestore
getImagesFromFirestore();
