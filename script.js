// Function to initialize event listeners
function initializeEventListeners() {
    const button = document.querySelector('.ui.button');
    if (button) {
        button.addEventListener('click', handleButtonClick);
    }

    const menuItems = document.querySelectorAll('.ui.menu .item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Log the feature name for navigation
            console.log('Navigating to:', this.textContent);
            // Smooth scrolling implementation
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Function to handle button click
function handleButtonClick() {
    alert('Button clicked!');
}

// Add event listeners or interactivity here
document.addEventListener('DOMContentLoaded', initializeEventListeners);