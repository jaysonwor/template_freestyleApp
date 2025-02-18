document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact-form');
    contactForm.addEventListener('submit', handleFormSubmit);
    loadImageGallery();
});

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('https://your-backend-endpoint.com/api/contact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Your message has been sent successfully!');
            document.getElementById('contact-form').reset();
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
}

function loadImageGallery() {
    fetch('https://your-image-source-endpoint.com/api/images')
    .then(response => response.json())
    .then(images => {
        const gallery = document.getElementById('gallery');
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = image.description;
            imgElement.classList.add('ui', 'image');
            gallery.appendChild(imgElement);
        });
    })
    .catch(error => {
        console.error('Error loading images:', error);
    });
}
