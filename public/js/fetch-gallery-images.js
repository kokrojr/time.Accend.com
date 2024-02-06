
// Retrieve Download URLs from Firebase Storage
const storageRef = firebase.storage().ref().child('gallery');

storageRef.listAll()
  .then((result) => {
    result.items.forEach((imageRef) => {
      imageRef.getDownloadURL()
        .then((url) => {
          // Store the URL in Firestore
          storeImageURLInFirestore(url);
        })
        .catch((error) => {
          console.error('Error getting download URL:', error);
        });
    });
  })
  .catch((error) => {
    console.error('Error listing images in storage:', error);
  });

let id = 0;

// Function to store URLs in Firestore
function storeImageURLInFirestore(url) {
  const firestore = firebase.firestore();
  const imagesCollection = firestore.collection('gallery_photos');

  // Add the URL to Firestore collection
  imagesCollection.add({
    url: url,
    id: id + 1
  })
  .then((docRef) => {
    console.log('Image URL added to Firestore:', docRef.id);
  })
  .catch((error) => {
    console.error('Error adding image URL to Firestore:', error);
  });
  id++;
}
