// Mock authentication status
let isAuthenticated = true; // Set to true for testing; change to false to simulate unauthenticated user

// Check user authentication
function checkAuthentication() {
    if (!isAuthenticated) {
        alert("You must be logged in to register an asset.");
        window.location.href = "login.html"; // Redirect to login page
    }
}

// Validate unique asset number
const existingAssetNumbers = ["A001", "A002"]; // Mock existing asset numbers
function isAssetNumberUnique(assetNumber) {
    return !existingAssetNumbers.includes(assetNumber);
}

// Validate purchase date
function isPurchaseDateValid(purchaseDate) {
    const today = new Date();
    return new Date(purchaseDate) <= today;
}

// Handle form submission
document.getElementById("assetForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const assetNumber = document.getElementById("assetNumber").value;
    const purchaseDate = document.getElementById("purchaseDate").value;

    // Validate asset number uniqueness
    if (!isAssetNumberUnique(assetNumber)) {
        alert("Asset number must be unique.");
        return;
    }

    // Validate purchase date
    if (!isPurchaseDateValid(purchaseDate)) {
        alert("Purchase date cannot be in the future.");
        return;
    }

    // Simulate form submission
    document.getElementById("successMessage").innerText = "Asset registered successfully!";
    document.getElementById("successMessage").style.display = "block";

    // Clear form fields
    document.getElementById("assetForm").reset();
});

// Check authentication on page load
checkAuthentication();
