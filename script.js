document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    // Validate form fields
    if (!name || !email || !message) {
        formMessage.textContent = 'All fields are required.';
        return;
    }

    // Validate email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        formMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // Submit form data to backend
    fetch('https://example.com/api/contact', { // Replace with actual backend endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        formMessage.textContent = 'Your message has been sent successfully!';
    })
    .catch(error => {
        formMessage.textContent = 'There was an error sending your message.';
    });
});
