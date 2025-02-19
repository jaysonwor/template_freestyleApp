// Initialize an empty array to store patient data
let patients = [];

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const medicalHistory = document.getElementById('medical-history').value;
    const medications = document.getElementById('medications').value;
    const allergies = document.getElementById('allergies').value;
    const visitNotes = document.getElementById('visit-notes').value;

    if (!validateForm(name, age, gender)) {
        alert("Please fill in all required fields correctly.");
        return;
    }

    const patient = {
        name,
        age,
        gender,
        medicalHistory,
        medications,
        allergies,
        visitNotes
    };

    // Check if editing an existing patient
    const editIndex = document.getElementById('data-entry-form').dataset.editIndex;
    if (editIndex !== undefined) {
        updatePatientData(parseInt(editIndex), patient);
    } else {
        patients.push(patient);
    }

    renderPatientData();
    clearForm();
}

// Function to validate form fields
function validateForm(name, age, gender) {
    return name.trim() !== "" && !isNaN(age) && age >= 0 && gender !== "";
}

// Function to render patient data in the table
function renderPatientData() {
    const tableBody = document.getElementById('patient-table-body');
    tableBody.innerHTML = ""; // Clear existing rows

    patients.forEach((patient, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.medicalHistory}</td>
            <td>${patient.medications}</td>
            <td>${patient.allergies}</td>
            <td>${patient.visitNotes}</td>
            <td>
                <button class="ui button" onclick="populateFormForEditing(${index})">Edit</button>
                <button class="ui button red" onclick="deletePatient(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to clear form fields after submission
function clearForm() {
    document.getElementById('data-entry-form').reset();
    delete document.getElementById('data-entry-form').dataset.editIndex; // Clear edit index
}

// Function to populate form with selected patient data for editing
function populateFormForEditing(index) {
    const patient = patients[index];
    document.getElementById('name').value = patient.name;
    document.getElementById('age').value = patient.age;
    document.getElementById('gender').value = patient.gender;
    document.getElementById('medical-history').value = patient.medicalHistory;
    document.getElementById('medications').value = patient.medications;
    document.getElementById('allergies').value = patient.allergies;
    document.getElementById('visit-notes').value = patient.visitNotes;
    document.getElementById('data-entry-form').dataset.editIndex = index; // Set edit index
}

// Function to update patient data in the local array
function updatePatientData(index, updatedPatient) {
    patients[index] = updatedPatient;
}

// Function to delete a patient record
function deletePatient(index) {
    patients.splice(index, 1);
    renderPatientData();
}

// Event listener for form submission
document.getElementById('data-entry-form').addEventListener('submit', handleFormSubmit);

// Function to clear local storage on browser close
window.addEventListener('beforeunload', function() {
    patients = []; // Clear patient data
});
