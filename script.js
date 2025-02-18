document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const imageGallery = document.getElementById('imageGallery');
    const loadMoreButton = document.getElementById('loadMore');
    let imageCount = 6;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        fetch('https://your-backend-url.com/api/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            contactForm.reset();
            alert('Your message has been sent successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later.');
        });
    });

    loadMoreButton.addEventListener('click', () => {
        loadImages(imageCount);
        imageCount += 6;
    });

    function loadImages(count) {
        fetch('https://your-image-source-url.com/api/images')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(images => {
            const galleryImages = images.slice(0, count);
            galleryImages.forEach(image => {
                if (image.url) {
                    const imgElement = document.createElement('img');
                    imgElement.src = image.url;
                    imgElement.alt = 'Image from gallery'; // Accessibility improvement
                    imgElement.className = 'ui image';
                    imageGallery.appendChild(imgElement);
                } else {
                    console.warn('Image URL is not defined for an image object:', image);
                }
            });
        })
        .catch(error => {
            console.error('Error loading images:', error);
            alert('There was an error loading images. Please try again later.');
        });
    }

    loadImages(imageCount);
});
