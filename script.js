document.addEventListener('DOMContentLoaded', function() {
    populateForms();

    document.getElementById('demographicsForm').addEventListener('submit', handleDemographicsSubmit);
    document.getElementById('medicalHistoryForm').addEventListener('submit', handleMedicalHistorySubmit);
    document.getElementById('medicationsForm').addEventListener('submit', handleMedicationsSubmit);
});

function handleDemographicsSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('patientName').value;
    const dob = document.getElementById('patientDOB').value;
    const gender = document.getElementById('patientGender').value;

    const demographics = { name, dob, gender };
    localStorage.setItem('demographics', JSON.stringify(demographics));
    alert('Demographics saved successfully!');
}

function handleMedicalHistorySubmit(event) {
    event.preventDefault();
    const medicalHistory = document.getElementById('medicalHistory').value;

    localStorage.setItem('medicalHistory', medicalHistory);
    alert('Medical history saved successfully!');
}

function handleMedicationsSubmit(event) {
    event.preventDefault();
    const medications = document.getElementById('medications').value;

    localStorage.setItem('medications', medications);
    alert('Medications saved successfully!');
}

function populateForms() {
    const demographics = JSON.parse(localStorage.getItem('demographics'));
    if (demographics) {
        document.getElementById('patientName').value = demographics.name || '';
        document.getElementById('patientDOB').value = demographics.dob || '';
        document.getElementById('patientGender').value = demographics.gender || '';
    }

    const medicalHistory = localStorage.getItem('medicalHistory');
    if (medicalHistory) {
        document.getElementById('medicalHistory').value = medicalHistory;
    }

    const medications = localStorage.getItem('medications');
    if (medications) {
        document.getElementById('medications').value = medications;
    }
}
