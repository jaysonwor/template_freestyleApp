document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const formData = new FormData(contactForm); // Create a FormData object from the form
        fetch('https://your-backend-url.com/api/contact', { // Replace with your actual backend URL
            method: 'POST',
            body: formData // Send the form data
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log('Success:', data); // Log success message
            contactForm.reset(); // Reset the form fields
        })
        .catch((error) => {
            console.error('Error:', error); // Log any errors
        });
    });

    const imageGallery = document.querySelector('.gallery');
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Array of image paths
    images.forEach(image => {
        const imgElement = document.createElement('img'); // Create an img element
        imgElement.src = image; // Set the source of the image
        imgElement.alt = 'Gallery Image'; // Set alt text for accessibility
        imageGallery.appendChild(imgElement); // Append the image to the gallery
    });
});
