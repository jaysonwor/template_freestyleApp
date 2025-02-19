document.addEventListener('DOMContentLoaded', () => {
    const patientForm = document.getElementById('patient-form');
    const patientTableBody = document.querySelector('#patient-table tbody');
    let patients = JSON.parse(localStorage.getItem('patients')) || [];

    function displayPatients() {
        patientTableBody.innerHTML = '';
        patients.forEach((patient, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.medicalHistory}</td>
                <td>${patient.currentMedications}</td>
                <td>${patient.allergies}</td>
                <td>${patient.visitNotes}</td>
            `;
            row.addEventListener('click', () => editPatient(index));
            patientTableBody.appendChild(row);
        });
    }

    function validateForm() {
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) return false;
        if (!age || age <= 0) return false;
        if (!gender) return false;
        return true;
    }

    function addOrUpdatePatient(index) {
        const patient = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            medicalHistory: document.getElementById('medical-history').value,
            currentMedications: document.getElementById('current-medications').value,
            allergies: document.getElementById('allergies').value,
            visitNotes: document.getElementById('visit-notes').value,
        };
        if (index !== undefined) {
            patients[index] = patient;
        } else {
            patients.push(patient);
        }
        localStorage.setItem('patients', JSON.stringify(patients));
        displayPatients();
        patientForm.reset();
    }

    function editPatient(index) {
        const patient = patients[index];
        document.getElementById('name').value = patient.name;
        document.getElementById('age').value = patient.age;
        document.getElementById('gender').value = patient.gender;
        document.getElementById('medical-history').value = patient.medicalHistory;
        document.getElementById('current-medications').value = patient.currentMedications;
        document.getElementById('allergies').value = patient.allergies;
        document.getElementById('visit-notes').value = patient.visitNotes;
        patientForm.onsubmit = (e) => {
            e.preventDefault();
            if (validateForm()) {
                addOrUpdatePatient(index);
            }
        };
    }

    patientForm.onsubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addOrUpdatePatient();
        }
    };

    displayPatients();
});
