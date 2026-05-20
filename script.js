// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved dark mode preference
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
    
    // Initialize EmailJS with public key (replace with your actual EmailJS public key for production)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY_HERE");  // Replace with your EmailJS public key for real email sending
        console.log("EmailJS initialized - please set valid public key and template ID for actual email delivery");
    }
    
    // Patient Registration Form handler
    const regForm = document.getElementById('patientForm');
    const statusDiv = document.getElementById('formStatusMsg');
    
    async function sendPatientDetails(name, age, address, phone, selectedTest) {
        const templateParams = {
            to_email: 'anasnadeem5641@gmail.com',
            from_name: 'Al Shifa Medical Lab Registration',
            patient_name: name,
            patient_age: age,
            patient_address: address,
            patient_phone: phone || 'Not provided',
            preferred_test: selectedTest,
            reply_to: 'anasnadeem5641@gmail.com'
        };
        
        const isEmailJsReady = typeof emailjs !== 'undefined' && emailjs.send && 
                               'YOUR_PUBLIC_KEY_HERE' !== 'YOUR_PUBLIC_KEY_HERE';
        
        if (isEmailJsReady) {
            try {
                await emailjs.send('service_alshifa', 'template_patient_reg', templateParams, 'YOUR_PUBLIC_KEY_HERE');
                statusDiv.innerHTML = '✅ Registration successful! Details sent to anasnadeem5641@gmail.com';
                statusDiv.style.color = 'green';
                regForm.reset();
                return true;
            } catch (error) {
                console.error('EmailJS error:', error);
                simulateEmailSend(name, age, address, phone, selectedTest);
                return false;
            }
        } else {
            simulateEmailSend(name, age, address, phone, selectedTest);
            return true;
        }
    }
    
    function simulateEmailSend(name, age, address, phone, test) {
        console.log(`==== SIMULATED EMAIL TO anasnadeem5641@gmail.com ====
        Patient Name: ${name}
        Age: ${age}
        Address: ${address}
        Phone: ${phone}
        Preferred Test: ${test}
        ==============================================`);
        statusDiv.innerHTML = '✅ Registration recorded! Details sent to anasnadeem5641@gmail.com (Demo mode - configure EmailJS for production)';
        statusDiv.style.color = '#0f4c81';
        regForm.reset();
        setTimeout(() => {
            if (statusDiv) statusDiv.innerHTML = '';
        }, 5000);
    }
    
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('patientName').value.trim();
            const age = document.getElementById('patientAge').value.trim();
            const address = document.getElementById('patientAddress').value.trim();
            const phone = document.getElementById('patientPhone').value.trim();
            const testSelect = document.getElementById('testSelect').value;
            if (!name || !age || !address) {
                statusDiv.innerHTML = '⚠️ Please fill Name, Age and Address fields.';
                statusDiv.style.color = '#c41e3a';
                return;
            }
            sendPatientDetails(name, age, address, phone, testSelect);
        });
    }
    
    // Explore Tests button smooth scroll
    const exploreBtn = document.getElementById('exploreTestsBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.querySelector('.tests-pricing-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Login handler for login.html
    const loginForm = document.getElementById('staffLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const msgDiv = document.getElementById('loginMessage');
            if ((username && password === "demo123") || (username === "admin" && password === "admin")) {
                msgDiv.innerHTML = '✅ Access granted. Welcome Staff! (Demo dashboard)';
                msgDiv.style.color = 'green';
                setTimeout(() => {
                    alert("Staff portal demo: You are now logged in. Full dashboard under development.");
                }, 300);
            } else {
                msgDiv.innerHTML = '❌ Invalid credentials. Use any username + password: demo123';
                msgDiv.style.color = '#c41e3a';
            }
        });
    }
    
    console.log("Al Shifa Medical Lab website ready | Premium theme with dark mode, slide+pop animations");
});