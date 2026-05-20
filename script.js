// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== DARK MODE - FIXED ==========
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Load saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️ Light Mode';
    } else {
        if (darkModeToggle) darkModeToggle.textContent = '🌙 Dark Mode';
    }
    
    // Toggle dark mode
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
    
    // ========== FORMSPREE FORM SUBMISSION ==========
    const form = document.getElementById('patientForm');
    const statusDiv = document.getElementById('formStatusMsg');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            statusDiv.innerHTML = '⏳ Sending registration details...';
            statusDiv.style.color = '#0f4c81';
            
            const formData = new FormData(form);
            
            try {
                const response = await fetch('https://formspree.io/f/mdajaqdv', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    statusDiv.innerHTML = '✅ Registration successful! Details sent to anasnadeem5641@gmail.com';
                    statusDiv.style.color = 'green';
                    form.reset();
                    setTimeout(() => {
                        statusDiv.innerHTML = '';
                    }, 5000);
                } else {
                    const errorData = await response.json();
                    statusDiv.innerHTML = '❌ Error: ' + (errorData.error || 'Submission failed. Please try again.');
                    statusDiv.style.color = '#c41e3a';
                }
            } catch (error) {
                console.error('Error:', error);
                statusDiv.innerHTML = '❌ Network error. Please check your connection.';
                statusDiv.style.color = '#c41e3a';
            }
        });
    }
    
    // ========== EXPLORE TESTS BUTTON ==========
    const exploreBtn = document.getElementById('exploreTestsBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('.tests-pricing-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    // ========== LOGIN FORM HANDLER ==========
    const loginForm = document.getElementById('staffLoginForm');
    if (loginForm) {
        loginForm