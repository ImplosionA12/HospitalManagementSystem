// VIT-AP University Hospital - Application Logic

// Global state
let currentTheme = localStorage.getItem('vitap-theme') || 'light';
let currentSection = 'home';
let currentUser = null;

// Ruthvik's personal information
const ruthvikData = {
    personal_info: {
        student_name: "Ruthvik",
        student_id: "24MIC7198", 
        email: "ruthvik.24mic7198@vitap.ac.in",
        phone: "+91-9876543210",
        course: "B.Tech Computer Science",
        batch: "2024-2028",
        hostel: "Mens Hostel Block A",
        room_number: "A-420"
    },
    medical_records: {
        basic_info: {
            blood_group: "B+",
            height: "175 cm",
            weight: "68 kg",
            bmi: "22.2",
            allergies: ["Dust", "Pollen"]
        },
        recent_visits: [
            {
                date: "2025-09-15",
                doctor: "Dr. Priya Sharma",
                department: "Student Health Center", 
                reason: "Annual Health Checkup",
                diagnosis: "Healthy - No issues",
                cost: "Free (Student Coverage)"
            }
        ]
    }
};

// Hospital data
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
            student_consultation: "Free for VIT-AP students"
        },
        {
            id: 2,
            name: "Dr. Rajesh Kumar", 
            specialty: "Emergency Medicine",
            title: "Chief Emergency Physician",
            experience: "15 years",
            rating: 5.0,
            availability: "24/7 Emergency Coverage",
            student_consultation: "₹200 for VIT-AP students"
        }
    ]
};

// Initialize the application
function initApp() {
    console.log('🏥 Initializing VIT-AP University Hospital...');

    // Load saved theme
    loadTheme();

    // Set up event listeners
    setupEventListeners();

    console.log('✅ VIT-AP University Hospital initialized successfully!');
}

function loadTheme() {
    setTheme(currentTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vitap-theme', theme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }

    console.log(`🎨 Theme set to: ${theme}`);
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    showToast(`Switched to ${newTheme} theme! 🎨`, 'success');

    // Add a nice visual feedback
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }
}

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

    // Hero search
    const heroSearch = document.getElementById('hero-search');
    if (heroSearch) {
        heroSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performHeroSearch();
            }
        });
    }

    // Modal overlay
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Toggle theme with Ctrl/Cmd + Shift + T
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }

        // Close modal with Escape
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    console.log('🎯 Event listeners setup complete');
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

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log(`📄 Showing section: ${sectionId}`);
    }
}

function setActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
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
                    Demo Credentials: 24MIC7198 / vitap123<br>
                    For Faculty: FAC001 / vitap123<br>
                    🔥 Pro tip: Use <kbd>Ctrl+Shift+T</kbd> to toggle theme!
                </small>
            </div>
        </div>
    `);
}

function processSignIn(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate credentials
    if (validateCredentials(username, password)) {
        currentUser = getUserData(username);
        updateUIForLoggedInUser();
        closeModal();
        showToast(`Welcome back, ${currentUser.name}! 👋`, 'success');
        console.log('✅ User signed in:', currentUser);
    } else {
        showToast('Invalid credentials. Please try again. 🔐', 'error');
    }
}

function validateCredentials(username, password) {
    const validCredentials = [
        { username: '24MIC7198', password: 'vitap123' },
        { username: 'ruthvik', password: 'vitap123' },
        { username: 'Ruthvik', password: 'vitap123' },
        { username: 'FAC001', password: 'vitap123' },
        { username: 'STF001', password: 'vitap123' }
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
            ...ruthvikData.personal_info
        };
    } else if (username.startsWith('FAC')) {
        return {
            id: username,
            name: 'Faculty User',
            email: `${username.toLowerCase()}@vitap.ac.in`,
            type: 'faculty'
        };
    } else if (username.startsWith('STF')) {
        return {
            id: username,
            name: 'Staff User', 
            email: `${username.toLowerCase()}@vitap.ac.in`,
            type: 'staff'
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

    showToast('Signed out successfully! 👋', 'info');
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
                Welcome <strong>${currentUser.name}</strong>! Let's schedule your appointment.
            </p>

            <form id="appointment-form" onsubmit="submitAppointment(event)">
                <div class="form-group">
                    <label class="form-label">Service Type</label>
                    <select class="form-input" id="service-type" required>
                        <option value="">Select service type...</option>
                        <option value="student-health">Student Health Center (Free)</option>
                        <option value="general">General Consultation (₹300)</option>
                        <option value="specialist">Specialist Consultation (₹500)</option>
                        <option value="emergency">Emergency Consultation</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Preferred Doctor</label>
                    <select class="form-input" id="doctor-select" required>
                        <option value="">Select doctor...</option>
                        <option value="1">Dr. Priya Sharma - Family Medicine</option>
                        <option value="2">Dr. Rajesh Kumar - Emergency Medicine</option>
                        <option value="3">Dr. Anitha Reddy - Mental Health</option>
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
                <p><strong>Date:</strong> ${new Date(appointmentData.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${appointmentData.time}</p>
                <p><strong>Service:</strong> ${appointmentData.service}</p>
                <p><strong>Location:</strong> VIT-AP University Hospital</p>
            </div>

            <div style="background: rgba(0, 166, 140, 0.1); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
                <p style="color: var(--teal-accent); margin: 0; font-weight: 500;">
                    📧 Confirmation email sent to ${appointmentData.patient.email}<br>
                    📱 SMS reminder will be sent 1 day before your appointment
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

function performHeroSearch() {
    const searchInput = document.getElementById('hero-search');
    const query = searchInput?.value.trim() || '';

    if (query) {
        console.log('🔍 Searching for:', query);
        showToast(`Searching for "${query}"... Advanced search coming soon! 🔍`, 'info');

        // Clear search input
        if (searchInput) searchInput.value = '';
    }
}

function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        performHeroSearch();
    }
}

function handleEmergency() {
    showToast('Emergency services: +91-863-123-VITAP 🚨', 'warning');

    if (confirm('This will call the emergency hotline. Continue?')) {
        window.open('tel:+918631234827');
    }
}

function toggleMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle) {
        toggle.classList.toggle('active');
    }

    // In a real implementation, you'd show/hide mobile menu
    showToast('Mobile menu toggle - full navigation coming soon! 📱', 'info');
}

// Modal utility methods
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

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    console.log('🎉 VIT-AP University Hospital ready!');

    // Show welcome message
    setTimeout(() => {
        showToast('Welcome to VIT-AP University Hospital! 🏥', 'success');
    }, 1000);

    // Show theme tip after a delay
    setTimeout(() => {
        if (currentTheme === 'light') {
            showToast('💡 Tip: Click the 🌙 button to switch to dark mode!', 'info');
        }
    }, 3000);
});

// Global functions for onclick handlers
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