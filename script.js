document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const feedbackMessage = document.createElement('div'); // Create a feedback message element
    feedbackMessage.id = 'feedbackMessage';
    contactForm.appendChild(feedbackMessage); // Append feedback message to the form

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const formData = new FormData(contactForm); // Create a FormData object from the form
        fetch('https://your-backend-url.com/api/contact', { // Replace with your actual backend URL
            method: 'POST',
            body: formData // Send the form data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log('Success:', data); // Log success message
            feedbackMessage.textContent = 'Your message has been sent successfully!'; // Success feedback
            feedbackMessage.style.color = 'green'; // Style success message
            contactForm.reset(); // Reset the form fields
        })
        .catch((error) => {
            console.error('Error:', error); // Log any errors
            feedbackMessage.textContent = 'There was an error sending your message. Please try again.'; // Error feedback
            feedbackMessage.style.color = 'red'; // Style error message
        });
    });

    const imageGallery = document.querySelector('.gallery');
    const images = [
        { src: 'image1.jpg', alt: 'Description for image 1' },
        { src: 'image2.jpg', alt: 'Description for image 2' },
        { src: 'image3.jpg', alt: 'Description for image 3' }
    ]; // Array of image objects with paths and descriptions

    images.forEach(image => {
        const imgElement = document.createElement('img'); // Create an img element
        imgElement.src = image.src; // Set the source of the image
        imgElement.alt = image.alt; // Set alt text for accessibility
        imgElement.onerror = function() {
            this.src = 'fallback-image.jpg'; // Fallback image if the original fails to load
            this.alt = 'Fallback image description'; // Fallback alt text
        };
        imageGallery.appendChild(imgElement); // Append the image to the gallery
    });
});
