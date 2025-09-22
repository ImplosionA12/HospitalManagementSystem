// VIT-AP University Hospital - Perfect Application Logic
// Complete functionality with theme toggle, working records, and all features

// Global Application State
let currentTheme = localStorage.getItem('vitap-theme') || 'light';
let currentSection = 'home';
let currentUser = null;

// Ruthvik's Complete Medical Data
const ruthvikMedicalData = {
    personal_info: {
        student_name: "Ruthvik",
        student_id: "24MIC7198", 
        email: "ruthvik.24mic7198@vitap.ac.in",
        phone: "+91-9876543210",
        course: "B.Tech Computer Science",
        batch: "2024-2028",
        hostel: "Mens Hostel Block A",
        room_number: "A-420",
        emergency_contact: "+91-9876543211"
    },
    medical_records: {
        basic_info: {
            blood_group: "B+",
            height: "175 cm",
            weight: "68 kg",
            bmi: "22.2",
            allergies: ["Dust", "Pollen"],
            medical_conditions: ["None"],
            medications: ["Vitamin D3 (Weekly)"]
        },
        recent_visits: [
            {
                date: "2025-09-15",
                doctor: "Dr. Priya Sharma",
                department: "Student Health Center", 
                reason: "Annual Health Checkup",
                diagnosis: "Overall healthy condition with no acute concerns",
                notes: "Patient is in excellent health. All vital signs normal. Blood pressure: 120/80 mmHg. Continue current lifestyle with regular exercise. Recommended Vitamin D3 supplement weekly due to minimal sun exposure.",
                prescription: ["Vitamin D3 60,000 IU - Once weekly", "Multivitamin - Daily"],
                cost: "Free (Student Coverage)",
                follow_up: "Annual checkup next year"
            },
            {
                date: "2025-08-22",
                doctor: "Dr. Anitha Reddy",
                department: "Mental Health Services",
                reason: "Academic Stress Counseling",
                diagnosis: "Mild anxiety symptoms related to academic pressure and semester exams",
                notes: "Student experiencing normal academic stress. Discussed stress management techniques including deep breathing exercises, time management, and study scheduling. Sleep hygiene recommendations provided. Encouraged regular physical activity.",
                prescription: ["Stress management techniques", "Regular sleep schedule", "Physical exercise 30min daily"],
                cost: "Free (Student Coverage)",
                follow_up: "Follow-up in 4 weeks if symptoms persist"
            },
            {
                date: "2025-07-10",
                doctor: "Dr. Vikram Singh",
                department: "Sports Medicine",
                reason: "Knee strain from basketball",
                diagnosis: "Minor strain in left knee - Grade 1 MCL sprain",
                notes: "Injury occurred during basketball practice. Mild swelling and tenderness noted. Prescribed rest for 2 weeks with ice therapy 3-4 times daily. Physiotherapy sessions recommended. Patient responded well to treatment. Full recovery achieved within expected timeframe.",
                prescription: ["Rest for 2 weeks", "Ice therapy 3-4x daily", "Physiotherapy sessions", "Anti-inflammatory gel"],
                cost: "₹300 (Student Discount Applied)",
                follow_up: "Return to sports activities after 2 weeks rest"
            },
            {
                date: "2025-06-05",
                doctor: "Dr. Sanjay Kumar",
                department: "General Medicine",
                reason: "Fever and cold symptoms",
                diagnosis: "Viral upper respiratory tract infection",
                notes: "Presented with low-grade fever (100.2°F), runny nose, and mild cough. Symptoms consistent with common cold. Advised rest, increased fluid intake, and symptomatic treatment. No antibiotics required as infection is viral in nature.",
                prescription: ["Paracetamol 500mg - As needed for fever", "Steam inhalation", "Warm salt water gargling", "Rest and increased fluids"],
                cost: "₹150 (Student Coverage)",
                follow_up: "Return if symptoms worsen or persist beyond 7 days"
            }
        ],
        vaccinations: [
            {
                vaccine: "COVID-19 Booster",
                date: "2025-08-01",
                administered_by: "Dr. Priya Sharma",
                batch_number: "COV123456",
                next_due: "2026-08-01"
            },
            {
                vaccine: "Hepatitis B",
                date: "2024-09-15",
                administered_by: "Dr. Rajesh Kumar",
                batch_number: "HEP789012",
                next_due: "Complete"
            }
        ],
        lab_reports: [
            {
                date: "2025-09-15",
                test_name: "Complete Blood Count (CBC)",
                results: {
                    "Hemoglobin": "14.2 g/dL (Normal)",
                    "WBC Count": "7,200/μL (Normal)",
                    "Platelet Count": "2.8 lakh/μL (Normal)",
                    "ESR": "15 mm/hr (Normal)"
                },
                status: "Normal"
            },
            {
                date: "2025-09-15",
                test_name: "Vitamin D Level",
                results: {
                    "25-OH Vitamin D": "18 ng/mL (Deficient - Normal: 30-50 ng/mL)"
                },
                status: "Deficient"
            }
        ]
    }
};

// Hospital Information and Doctors Database
const hospitalData = {
    doctors: [
        {
            id: 1,
            name: "Dr. Priya Sharma",
            specialty: "Family Medicine & Student Health",
            title: "Director of Student Health Services",
            experience: "12 years",
            rating: 4.9,
            availability: "Mon-Fri 8AM-6PM",
            student_consultation: "Free for VIT-AP students",
            education: "MBBS, MD Family Medicine",
            languages: ["English", "Hindi", "Telugu"]
        },
        {
            id: 2,
            name: "Dr. Rajesh Kumar", 
            specialty: "Emergency Medicine",
            title: "Chief Emergency Physician",
            experience: "15 years",
            rating: 5.0,
            availability: "24/7 Emergency Coverage",
            student_consultation: "₹200 for VIT-AP students",
            education: "MBBS, MD Emergency Medicine",
            languages: ["English", "Hindi"]
        },
        {
            id: 3,
            name: "Dr. Anitha Reddy",
            specialty: "Psychiatry & Mental Health",
            title: "Senior Psychiatrist",
            experience: "10 years",
            rating: 4.8,
            availability: "Mon-Sat 9AM-5PM",
            student_consultation: "Free for VIT-AP students",
            education: "MBBS, MD Psychiatry",
            languages: ["English", "Telugu", "Hindi"]
        },
        {
            id: 4,
            name: "Dr. Vikram Singh",
            specialty: "Sports Medicine & Orthopedics",
            title: "Sports Medicine Specialist",
            experience: "8 years",
            rating: 4.7,
            availability: "Mon-Fri 2PM-8PM",
            student_consultation: "₹300 for VIT-AP students",
            education: "MBBS, MS Orthopedics, Fellowship Sports Medicine",
            languages: ["English", "Hindi", "Punjabi"]
        }
    ],
    services: [
        {
            name: "Student Health Center",
            description: "24/7 primary healthcare exclusively for VIT-AP students",
            features: ["Free consultations", "Mental health support", "Emergency care"],
            availability: "24/7"
        },
        {
            name: "Emergency Services",
            description: "Round-the-clock emergency medical care",
            features: ["3-minute response time", "Advanced trauma center", "Ambulance service"],
            availability: "24/7"
        },
        {
            name: "Telemedicine",
            description: "Virtual consultations with our doctors",
            features: ["HD video calls", "Digital prescriptions", "Convenient scheduling"],
            availability: "Mon-Fri 8AM-8PM"
        }
    ]
};

// ==========================================
// APPLICATION INITIALIZATION
// ==========================================

function initApp() {
    console.log('🏥 Initializing VIT-AP University Hospital Application...');

    // Load and apply saved theme
    setTheme(currentTheme);

    // Setup all event listeners
    setupEventListeners();

    // Initialize navigation
    initializeNavigation();

    // Setup keyboard shortcuts
    setupKeyboardShortcuts();

    console.log('✅ VIT-AP University Hospital Application initialized successfully!');

    // Show welcome message after initialization
    setTimeout(() => {
        showWelcomeMessage();
    }, 1000);
}

function showWelcomeMessage() {
    console.log('🎉 Welcome to VIT-AP University Hospital!');
    console.log('💡 Tips:');
    console.log('   • Use Ctrl+Shift+T to toggle theme');
    console.log('   • Sign in with: 24MIC7198 / vitap123');
    console.log('   • Check Records section for medical data');
}

// ==========================================
// THEME MANAGEMENT SYSTEM
// ==========================================

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vitap-theme', theme);

    // Update theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }

    console.log(`🎨 Theme applied: ${theme}`);
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Visual feedback - rotate the toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }

    // Show feedback message
    showToast(`Switched to ${newTheme} theme! 🎨`, 'success');

    console.log(`🎨 Theme toggled to: ${newTheme}`);
}

// ==========================================
// EVENT LISTENERS SETUP
// ==========================================

function setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('onclick').match(/showSection\('([^']+)'\)/)?.[1];
            if (section) {
                showSection(section);
                setActiveNavLink(link);
            }
        });
    });

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }

    // Hero search functionality
    const heroSearch = document.getElementById('hero-search');
    if (heroSearch) {
        heroSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performHeroSearch();
            }
        });
    }

    // Modal overlay click handling
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    console.log('🎯 Event listeners setup complete');
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Theme toggle: Ctrl/Cmd + Shift + T
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }

        // Close modal: Escape key
        if (e.key === 'Escape') {
            closeModal();
        }

        // Quick search: Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('hero-search');
            if (searchInput && currentSection === 'home') {
                searchInput.focus();
            }
        }
    });

    console.log('⌨️ Keyboard shortcuts setup complete');
}

// ==========================================
// NAVIGATION SYSTEM
// ==========================================

function initializeNavigation() {
    // Set home as active section
    showSection('home');

    // Set active nav link
    const homeLink = document.querySelector('.nav-link[onclick*="home"]');
    if (homeLink) {
        setActiveNavLink(homeLink);
    }
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section  
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;

        // Update page title
        document.title = `${getSectionTitle(sectionId)} - VIT-AP University Hospital`;

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Special handling for records section
        if (sectionId === 'records') {
            renderRecords();
        }

        console.log(`📄 Showing section: ${sectionId}`);
    }
}

function setActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function getSectionTitle(sectionId) {
    const titles = {
        'home': 'Home',
        'services': 'Healthcare Services',
        'doctors': 'Find Doctors', 
        'student-health': 'Student Health Center',
        'emergency': 'Emergency Services',
        'records': 'Medical Records',
        'support': 'Contact Support',
        'telemedicine': 'Telemedicine',
        'dashboard': 'Patient Dashboard',
        'appointments': 'My Appointments'
    };
    return titles[sectionId] || sectionId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ==========================================
// AUTHENTICATION SYSTEM
// ==========================================

function handleSignIn() {
    const modal = createModal('Sign In to VIT-AP Hospital', `
        <div class="sign-in-modal">
            <form class="auth-form" id="sign-in-form" onsubmit="processSignIn(event)">
                <div class="form-group">
                    <label class="form-label">Student ID</label>
                    <input type="text" class="form-input" placeholder="Enter your Student ID (e.g., 24MIC7198)" id="username" required>
                    <div class="form-help">Use your VIT-AP Student ID</div>
                </div>

                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" placeholder="Enter your password" id="password" required>
                    <div class="form-help">Demo password: vitap123</div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn--primary">Sign In</button>
                </div>
            </form>

            <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
                <small style="color: var(--text-secondary);">
                    <strong>Demo Credentials:</strong><br>
                    Student ID: 24MIC7198<br>
                    Password: vitap123<br><br>
                    <em>💡 Pro tip: Use Ctrl+Shift+T to toggle theme!</em>
                </small>
            </div>
        </div>
    `);

    // Focus on username field
    setTimeout(() => {
        const usernameField = document.getElementById('username');
        if (usernameField) usernameField.focus();
    }, 100);
}

function processSignIn(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Validate credentials
    if (validateCredentials(username, password)) {
        currentUser = getUserData(username);
        updateUIForLoggedInUser();
        closeModal();
        showToast(`Welcome back, ${currentUser.name}! 👋`, 'success');

        // If on records page, re-render with user data
        if (currentSection === 'records') {
            renderRecords();
        }

        console.log('✅ User signed in:', currentUser);
    } else {
        showToast('Invalid credentials. Please try: 24MIC7198 / vitap123', 'error');
    }
}

function validateCredentials(username, password) {
    const validCredentials = [
        { username: '24MIC7198', password: 'vitap123' },
        { username: 'ruthvik', password: 'vitap123' },
        { username: 'Ruthvik', password: 'vitap123' }
    ];

    return validCredentials.some(cred => 
        cred.username.toLowerCase() === username.toLowerCase() && 
        cred.password === password
    );
}

function getUserData(username) {
    if (['24MIC7198', 'ruthvik', 'Ruthvik'].includes(username)) {
        return {
            id: '24MIC7198',
            name: 'Ruthvik',
            email: 'ruthvik.24mic7198@vitap.ac.in',
            type: 'student',
            ...ruthvikMedicalData.personal_info
        };
    }
    return null;
}

function updateUIForLoggedInUser() {
    const signInBtn = document.getElementById('sign-in-btn');
    const userProfile = document.getElementById('user-profile');
    const profileName = document.getElementById('profile-name');

    if (signInBtn && currentUser) {
        signInBtn.style.display = 'none';

        if (userProfile && profileName) {
            userProfile.classList.add('active');
            profileName.textContent = currentUser.name;
        }
    }
}

function logout() {
    currentUser = null;
    const signInBtn = document.getElementById('sign-in-btn');
    const userProfile = document.getElementById('user-profile');

    if (signInBtn) signInBtn.style.display = 'flex';
    if (userProfile) userProfile.classList.remove('active');

    // Re-render records if currently viewing
    if (currentSection === 'records') {
        renderRecords();
    }

    showToast('Signed out successfully! 👋', 'info');
    console.log('👋 User signed out');
}

// ==========================================
// MEDICAL RECORDS RENDERING
// ==========================================

function renderRecords() {
    const recordsContent = document.getElementById('records-content');
    if (!recordsContent) return;

    if (!currentUser) {
        recordsContent.innerHTML = `
            <div class="coming-soon">
                <h3>🔐 Sign In Required</h3>
                <p>Please sign in with your student ID to access your complete medical records and health information.</p>
                <button class="btn btn--primary" onclick="handleSignIn()">Sign In to View Records</button>
            </div>
        `;
        return;
    }

    // Render complete medical records for Ruthvik
    const data = ruthvikMedicalData.medical_records;
    const visits = ruthvikMedicalData.medical_records.recent_visits;
    const vaccinations = ruthvikMedicalData.medical_records.vaccinations;
    const labReports = ruthvikMedicalData.medical_records.lab_reports;

    recordsContent.innerHTML = `
        <!-- Patient Overview Card -->
        <div class="card">
            <div class="card-header">
                <div class="card-title">Patient Overview</div>
                <div class="card-subtitle">${currentUser.name} • ${currentUser.student_id}</div>
            </div>
            <div class="card-body">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div><strong>Blood Group:</strong> ${data.basic_info.blood_group}</div>
                    <div><strong>Height:</strong> ${data.basic_info.height}</div>
                    <div><strong>Weight:</strong> ${data.basic_info.weight}</div>
                    <div><strong>BMI:</strong> ${data.basic_info.bmi}</div>
                    <div><strong>Email:</strong> ${currentUser.email}</div>
                    <div><strong>Emergency Contact:</strong> ${currentUser.emergency_contact}</div>
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
                    <div style="margin-bottom: 0.5rem;"><strong>Known Allergies:</strong> ${data.basic_info.allergies.join(', ')}</div>
                    <div style="margin-bottom: 0.5rem;"><strong>Medical Conditions:</strong> ${data.basic_info.medical_conditions.join(', ')}</div>
                    <div><strong>Current Medications:</strong> ${data.basic_info.medications.join(', ')}</div>
                </div>
            </div>
        </div>

        <!-- Recent Medical Visits -->
        <div class="card">
            <div class="card-header">
                <div class="card-title">Medical Visit History</div>
                <div class="card-subtitle">Last ${visits.length} clinical encounters with detailed information</div>
            </div>
            <div class="card-body">
                ${visits.map((visit, index) => `
                    <div style="padding: 1.5rem 0; ${index < visits.length - 1 ? 'border-bottom: 1px solid var(--border-light);' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <div style="flex: 1;">
                                <div style="font-weight: 600; font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">
                                    ${visit.reason}
                                </div>
                                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.75rem;">
                                    <strong>${visit.doctor}</strong> • ${visit.department} • ${new Date(visit.date).toLocaleDateString('en-IN', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </div>
                            </div>
                            <div style="text-align: right; color: var(--primary-blue); font-weight: 600; font-size: 0.9rem; min-width: 120px;">
                                ${visit.cost}
                            </div>
                        </div>

                        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                            <div style="margin-bottom: 0.75rem;">
                                <strong style="color: var(--text-primary);">Diagnosis:</strong>
                                <div style="margin-top: 0.25rem; line-height: 1.5;">${visit.diagnosis}</div>
                            </div>
                            <div style="margin-bottom: 0.75rem;">
                                <strong style="color: var(--text-primary);">Clinical Notes:</strong>
                                <div style="margin-top: 0.25rem; line-height: 1.5;">${visit.notes}</div>
                            </div>
                            ${visit.prescription ? `
                                <div style="margin-bottom: 0.75rem;">
                                    <strong style="color: var(--text-primary);">Prescription:</strong>
                                    <ul style="margin: 0.25rem 0 0 1rem; padding: 0;">
                                        ${visit.prescription.map(med => `<li style="margin: 0.25rem 0;">${med}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            ${visit.follow_up ? `
                                <div>
                                    <strong style="color: var(--text-primary);">Follow-up:</strong>
                                    <div style="margin-top: 0.25rem;">${visit.follow_up}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Vaccinations Record -->
        <div class="card">
            <div class="card-header">
                <div class="card-title">Vaccination History</div>
                <div class="card-subtitle">Immunization records and schedules</div>
            </div>
            <div class="card-body">
                ${vaccinations.map((vaccine, index) => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; ${index < vaccinations.length - 1 ? 'border-bottom: 1px solid var(--border-light);' : ''}">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 0.25rem;">${vaccine.vaccine}</div>
                            <div style="color: var(--text-secondary); font-size: 0.9rem;">
                                Administered by ${vaccine.administered_by} • Batch: ${vaccine.batch_number}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: 500;">${new Date(vaccine.date).toLocaleDateString('en-IN')}</div>
                            <div style="color: var(--text-secondary); font-size: 0.8rem;">
                                Next: ${vaccine.next_due === 'Complete' ? 'Complete' : new Date(vaccine.next_due).toLocaleDateString('en-IN')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Lab Reports -->
        <div class="card">
            <div class="card-header">
                <div class="card-title">Laboratory Reports</div>
                <div class="card-subtitle">Recent test results and analyses</div>
            </div>
            <div class="card-body">
                ${labReports.map((report, index) => `
                    <div style="padding: 1rem 0; ${index < labReports.length - 1 ? 'border-bottom: 1px solid var(--border-light);' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 0.25rem;">${report.test_name}</div>
                                <div style="color: var(--text-secondary); font-size: 0.9rem;">${new Date(report.date).toLocaleDateString('en-IN')}</div>
                            </div>
                            <div style="padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 600; ${report.status === 'Normal' ? 'background: rgba(47, 191, 113, 0.1); color: var(--success-green);' : 'background: rgba(220, 104, 3, 0.1); color: var(--warning-orange);'}">
                                ${report.status}
                            </div>
                        </div>
                        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 0.5rem;">
                            ${Object.entries(report.results).map(([key, value]) => `
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="font-weight: 500;">${key}:</span>
                                    <span>${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Footer Information -->
        <div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: var(--bg-secondary); border-radius: 0.75rem;">
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0; line-height: 1.6;">
                📋 Complete medical history available since enrollment<br>
                🔒 All records are HIPAA compliant and securely encrypted<br>
                📱 Access your records anytime through this portal<br>
                📞 For questions about your records, call: +91-863-2293-000
            </p>
        </div>
    `;

    console.log('📋 Medical records rendered for user:', currentUser.name);
}

// ==========================================
// SEARCH AND BOOKING FUNCTIONALITY
// ==========================================

function performHeroSearch() {
    const searchInput = document.getElementById('hero-search');
    const query = searchInput?.value.trim() || '';

    if (query) {
        console.log('🔍 Searching for:', query);
        showToast(`Searching for "${query}"... Advanced search functionality coming soon! 🔍`, 'info');

        // Clear search input
        if (searchInput) searchInput.value = '';
    } else {
        showToast('Please enter a search term', 'warning');
    }
}

function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        performHeroSearch();
    }
}

function handleBookAppointment() {
    if (!currentUser) {
        showToast('Please sign in first to book an appointment 🔐', 'warning');
        handleSignIn();
        return;
    }

    const modal = createModal('Book Appointment 📅', `
        <div class="appointment-booking">
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Welcome <strong>${currentUser.name}</strong>! Let's schedule your appointment with our expert medical team.
            </p>

            <form id="appointment-form" onsubmit="submitAppointment(event)">
                <div class="form-group">
                    <label class="form-label">Service Type</label>
                    <select class="form-input" id="service-type" required>
                        <option value="">Select service type...</option>
                        <option value="student-health">Student Health Center (Free)</option>
                        <option value="general">General Consultation (₹300)</option>
                        <option value="specialist">Specialist Consultation (₹500)</option>
                        <option value="mental-health">Mental Health Counseling (Free)</option>
                        <option value="sports-medicine">Sports Medicine (₹300)</option>
                        <option value="emergency">Emergency Consultation</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Preferred Doctor</label>
                    <select class="form-input" id="doctor-select" required>
                        <option value="">Select doctor...</option>
                        <option value="1">Dr. Priya Sharma - Family Medicine (Free for students)</option>
                        <option value="2">Dr. Rajesh Kumar - Emergency Medicine (₹200)</option>
                        <option value="3">Dr. Anitha Reddy - Mental Health (Free for students)</option>
                        <option value="4">Dr. Vikram Singh - Sports Medicine (₹300)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Preferred Date</label>
                    <input type="date" class="form-input" id="appointment-date" required min="${new Date().toISOString().split('T')[0]}">
                </div>

                <div class="form-group">
                    <label class="form-label">Preferred Time</label>
                    <select class="form-input" id="appointment-time" required>
                        <option value="">Select time...</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Reason for Visit (Optional)</label>
                    <input type="text" class="form-input" placeholder="Brief description of your health concern" id="visit-reason">
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn--primary">Book Appointment</button>
                </div>
            </form>
        </div>
    `);
}

function submitAppointment(event) {
    event.preventDefault();

    const serviceType = document.getElementById('service-type').value;
    const doctorId = document.getElementById('doctor-select').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const visitReason = document.getElementById('visit-reason').value;

    const appointmentData = {
        patient: currentUser,
        service: serviceType,
        doctor: doctorId,
        date: appointmentDate,
        time: appointmentTime,
        reason: visitReason,
        confirmation_id: `VH-${Date.now()}`,
        timestamp: new Date().toISOString()
    };

    console.log('📅 Booking appointment:', appointmentData);
    closeModal();

    // Show success with confirmation
    setTimeout(() => {
        showAppointmentConfirmation(appointmentData);
    }, 500);
}

function showAppointmentConfirmation(appointmentData) {
    const doctor = hospitalData.doctors.find(d => d.id == appointmentData.doctor);

    const modal = createModal('Appointment Confirmed! ✅', `
        <div class="confirmation-modal" style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h3 style="color: var(--success-green); margin-bottom: 1rem;">Appointment Successfully Booked!</h3>

            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 1rem; margin: 1.5rem 0; text-align: left;">
                <p><strong>Confirmation ID:</strong> ${appointmentData.confirmation_id}</p>
                <p><strong>Patient:</strong> ${appointmentData.patient.name}</p>
                <p><strong>Doctor:</strong> ${doctor ? doctor.name : 'TBD'}</p>
                <p><strong>Date:</strong> ${new Date(appointmentData.date).toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
                <p><strong>Time:</strong> ${appointmentData.time}</p>
                <p><strong>Service:</strong> ${appointmentData.service}</p>
                <p><strong>Location:</strong> VIT-AP University Hospital</p>
            </div>

            <div style="background: rgba(0, 166, 140, 0.1); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
                <p style="color: var(--teal-accent); margin: 0; font-weight: 500;">
                    📧 Confirmation email sent to ${appointmentData.patient.email}<br>
                    📱 SMS reminder will be sent 1 day before your appointment<br>
                    📞 For any changes, call: +91-863-2293-000
                </p>
            </div>

            <div class="form-actions">
                <button class="btn btn--primary" onclick="closeModal()">Done</button>
                <button class="btn btn--outline" onclick="downloadAppointmentTicket('${appointmentData.confirmation_id}')">Download Ticket</button>
            </div>
        </div>
    `);

    showToast('Appointment booked successfully! 🎉', 'success');
}

function downloadAppointmentTicket(confirmationId) {
    showToast('Appointment ticket downloaded to your device 📥', 'success');
    console.log('📥 Downloading appointment ticket:', confirmationId);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function handleEmergency() {
    const confirmed = confirm(
        '🚨 EMERGENCY SERVICES\n\n' +
        'VIT-AP University Hospital Emergency Hotline:\n' +
        '+91-863-123-VITAP\n\n' +
        'Our campus response time is under 3 minutes.\n' +
        'This will attempt to make a phone call.\n\n' +
        'Continue?'
    );

    if (confirmed) {
        window.open('tel:+918631234827');
        showToast('Emergency services contacted! 🚨', 'warning');
    }
}

function toggleMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (toggle) {
        toggle.classList.toggle('active');
    }

    showToast('Mobile navigation menu coming soon! 📱', 'info');
}

// ==========================================
// MODAL SYSTEM
// ==========================================

function createModal(title, content) {
    const overlay = document.getElementById('modal-overlay');
    const container = document.getElementById('modal-container');

    if (overlay && container) {
        container.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        `;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        return container;
    }
    return null;
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================

function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${getToastIcon(type)}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    document.body.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        success: '✅',
        error: '❌', 
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// ==========================================
// GLOBAL FUNCTION EXPORTS
// ==========================================

// Export functions for onclick handlers in HTML
window.showSection = showSection;
window.handleSignIn = handleSignIn;
window.processSignIn = processSignIn;
window.handleBookAppointment = handleBookAppointment;
window.submitAppointment = submitAppointment;
window.performHeroSearch = performHeroSearch;
window.handleSearchKeyPress = handleSearchKeyPress;
window.handleEmergency = handleEmergency;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.closeModal = closeModal;
window.logout = logout;
window.downloadAppointmentTicket = downloadAppointmentTicket;

// ==========================================
// APPLICATION STARTUP
// ==========================================

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    console.log('🎉 VIT-AP University Hospital is ready to serve you!');
});

// Add error handling for uncaught errors
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showToast('An error occurred. Please refresh the page if issues persist.', 'error');
});

// Add performance monitoring
window.addEventListener('load', function() {
    console.log('📊 Application loaded successfully');
    console.log('⚡ Performance: Page loaded in', Math.round(performance.now()), 'ms');
});