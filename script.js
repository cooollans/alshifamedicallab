// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️ Light';
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.textContent = '☀️ Light';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.textContent = '🌙 Dark';
            }
        });
    }
    
    // Formspree Form Submission
    const form = document.getElementById('patientForm');
    const statusDiv = document.getElementById('formStatusMsg');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (statusDiv) {
                statusDiv.innerHTML = '⏳ Sending registration details...';
                statusDiv.style.color = '#0f4c81';
            }
            
            const formData = new FormData(form);
            
            try {
                const response = await fetch('https://formspree.io/f/mdajaqdv', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    statusDiv.innerHTML = '✅ Registration successful! Patient details sent to anasnadeem5641@gmail.com';
                    statusDiv.style.color = 'green';
                    form.reset();
                    setTimeout(() => { statusDiv.innerHTML = ''; }, 5000);
                } else {
                    const errorData = await response.json();
                    statusDiv.innerHTML = '❌ Error: ' + (errorData.error || 'Submission failed.');
                    statusDiv.style.color = '#c41e3a';
                }
            } catch (error) {
                statusDiv.innerHTML = '❌ Network error. Please check your connection.';
                statusDiv.style.color = '#c41e3a';
            }
        });
    }
    
    // Open Satellite View Button
    const openSatelliteBtn = document.getElementById('openSatelliteBtn');
    if (openSatelliteBtn) {
        openSatelliteBtn.addEventListener('click', function() {
            const satelliteUrl = "https://www.google.com/maps/place/Al+Shifa+Hospital+%26+Kidney+Stone+Centre+Vehari/@30.0462643,72.3594653,200m/data=!3m1!1e3!4m6!3m5!1s0x393ceb43f1f01a55:0xdc061f4bd6dff9b9!