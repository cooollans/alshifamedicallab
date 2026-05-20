// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== DARK MODE - FULLY WORKING ==========
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Load saved preference from localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️ Light Mode';
    } else {
        if (darkModeToggle) darkModeToggle.textContent = '🌙 Dark Mode';
    }
    
    // Toggle dark mode function
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.textContent = '☀️ Light Mode';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.textContent = '🌙 Dark Mode';
            }
        });
    }
    
    // ========== EXPLORE TESTS BUTTON - FULLY WORKING ==========
    const exploreBtn = document.getElementById('exploreTestsBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const testsSection = document.querySelector('.tests-pricing-section');
            if (testsSection) {
                testsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // ========== FORMSPREE FORM SUBMISSION ==========
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
                    if (statusDiv) {
                        statusDiv.innerHTML = '✅ Registration successful! Details sent to anasnadeem5641@gmail.com';
                        statusDiv.style.color = 'green';
                    }
                    form.reset();
                    setTimeout(() => {
                        if (statusDiv) statusDiv.innerHTML = '';
                    }, 5000);
                } else {
                    const errorData = await response.json();
                    if (statusDiv) {
                        statusDiv.innerHTML = '❌ Error: ' + (errorData.error || 'Submission failed. Please try again.');