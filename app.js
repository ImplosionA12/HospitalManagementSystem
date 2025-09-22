let currentTheme = localStorage.getItem('vitap-theme') || 'light';
let currentSection = 'home';
let currentUser = null;

function initApp() {
    setTheme(currentTheme);
    setupEventListeners();
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vitap-theme', theme);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        btn.setAttribute('title', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Visual feedback
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.style.transform = 'rotate(360deg)';
        setTimeout(() => { btn.style.transform = ''; }, 300);
    }
}

function setupEventListeners() {
    // Navigation
    document.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            const match = e.target.getAttribute('onclick')?.match(/showSection\('([^']+)'\)/);
            if (match) showSection(match[1]);
        }
    });

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }
        if (e.key === 'Escape') closeModal();
    });
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(id);
    if (section) {
        section.classList.add('active');
        currentSection = id;
        if (id === 'records') renderRecords();
    }
}

function handleSignIn() {
    const overlay = document.getElementById('modal-overlay');
    const container = document.getElementById('modal-container');

    container.innerHTML = \`
        <div class="modal-header">
            <h2 class="modal-title">Sign In to VIT-AP Hospital</h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <form onsubmit="processSignIn(event)">
                <div class="form-group">
                    <label class="form-label">Student ID</label>
                    <input id="username" class="form-input" required placeholder="24MIC7198">
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input id="password" type="password" class="form-input" required placeholder="vitap123">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    <button class="btn btn--primary">Sign In</button>
                </div>
            </form>
            <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
                <small style="color: var(--text-secondary);">
                    Demo: 24MIC7198 / vitap123
                </small>
            </div>
        </div>
    \`;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function processSignIn(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (['24MIC7198', 'ruthvik', 'Ruthvik'].includes(username) && password === 'vitap123') {
        currentUser = {
            id: '24MIC7198',
            name: 'Ruthvik',
            email: 'ruthvik.24mic7198@vitap.ac.in',
            student_id: '24MIC7198'
        };

        // Update UI
        document.getElementById('sign-in-btn').style.display = 'none';
        const userProfile = document.getElementById('user-profile');
        if (userProfile) {
            userProfile.classList.add('active');
            document.getElementById('profile-name').textContent = 'Ruthvik';
        }

        closeModal();

        // Render records if on records page
        if (currentSection === 'records') {
            renderRecords();
        }
    } else {
        alert('Invalid credentials. Please try 24MIC7198 / vitap123');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('sign-in-btn').style.display = 'flex';
    const userProfile = document.getElementById('user-profile');
    if (userProfile) userProfile.classList.remove('active');

    if (currentSection === 'records') {
        renderRecords(); // Re-render to show sign-in prompt
    }
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function renderRecords() {
    const section = document.getElementById('records');
    if (!section) return;

    if (!currentUser) {
        section.innerHTML = \`
            <div class="container">
                <div class="page-header">
                    <h1 class="page-title">Medical Records</h1>
                    <p class="page-subtitle">Sign in to view your complete health information</p>
                </div>
                <div class="coming-soon">
                    <h3>🔐 Sign In Required</h3>
                    <p>Please sign in with your student ID to access medical records.</p>
                    <button class="btn btn--primary" onclick="handleSignIn()">Sign In</button>
                </div>
            </div>
        \`;
        return;
    }

    // Demo data for Ruthvik
    const patientData = {
        name: 'Ruthvik',
        id: '24MIC7198',
        email: 'ruthvik.24mic7198@vitap.ac.in',
        blood_group: 'B+',
        height: '175 cm',
        weight: '68 kg',
        bmi: '22.2',
        allergies: ['Dust', 'Pollen']
    };

    const visits = [
        {
            date: '2025-09-15',
            department: 'Student Health Center',
            doctor: 'Dr. Priya Sharma',
            reason: 'Annual Health Checkup',
            notes: 'Overall healthy condition. Maintain current routine. Recommended Vitamin D3 supplement weekly.',
            cost: 'Free (Student Coverage)'
        },
        {
            date: '2025-08-22',
            department: 'Mental Health Services',
            doctor: 'Dr. Anitha Reddy',
            reason: 'Academic Stress Counseling',
            notes: 'Mild anxiety symptoms related to academic pressure. Stress management techniques discussed. Sleep hygiene recommendations provided.',
            cost: 'Free (Student Coverage)'
        },
        {
            date: '2025-07-10',
            department: 'Sports Medicine',
            doctor: 'Dr. Vikram Singh',
            reason: 'Knee strain from basketball',
            notes: 'Minor strain in left knee. Prescribed rest for 2 weeks, ice therapy, and physiotherapy sessions. Full recovery achieved.',
            cost: '₹300 (Student Discount Applied)'
        }
    ];

    section.innerHTML = \`
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Medical Records</h1>
                <p class="page-subtitle">Your complete health history at VIT-AP University Hospital</p>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Patient Overview</div>
                    <div class="card-subtitle">\${patientData.name} • \${patientData.id}</div>
                </div>
                <div class="card-body">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
                        <div><strong>Blood Group:</strong> \${patientData.blood_group}</div>
                        <div><strong>Height:</strong> \${patientData.height}</div>
                        <div><strong>Weight:</strong> \${patientData.weight}</div>
                        <div><strong>BMI:</strong> \${patientData.bmi}</div>
                        <div><strong>Email:</strong> \${patientData.email}</div>
                        <div><strong>Allergies:</strong> \${patientData.allergies.join(', ')}</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Recent Medical Visits</div>
                    <div class="card-subtitle">Last 3 clinical encounters</div>
                </div>
                <div class="card-body">
                    \${visits.map(visit => \`
                        <div style="display: flex; gap: 1rem; justify-content: space-between; align-items: flex-start; padding: 1rem 0; border-bottom: 1px solid var(--border-light);">
                            <div style="flex: 1;">
                                <div style="font-weight: 600; margin-bottom: 0.5rem;">
                                    \${visit.reason} • <span style="color: var(--text-secondary);">\${visit.department}</span>
                                </div>
                                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
                                    \${visit.doctor} • \${new Date(visit.date).toLocaleDateString('en-IN')}
                                </div>
                                <div style="line-height: 1.5;">
                                    \${visit.notes}
                                </div>
                            </div>
                            <div style="white-space: nowrap; color: var(--primary-blue); font-weight: 600; font-size: 0.9rem;">
                                \${visit.cost}
                            </div>
                        </div>
                    \`).join('')}
                </div>
            </div>

            <div style="text-align: center; margin: 2rem 0;">
                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                    📋 Complete medical history available • 🔒 HIPAA Compliant • 📱 Mobile accessible
                </p>
            </div>
        </div>
    \`;
}

// Utility functions
function performHeroSearch() {
    const input = document.getElementById('hero-search');
    if (input && input.value.trim()) {
        alert('Searching for: ' + input.value + '\n\nAdvanced search coming soon!');
        input.value = '';
    }
}

function handleSearchKeyPress(e) {
    if (e.key === 'Enter') performHeroSearch();
}

function handleBookAppointment() {
    if (!currentUser) {
        alert('Please sign in first to book an appointment');
        handleSignIn();
        return;
    }
    alert('Appointment booking system coming soon!\nYou will be able to book with our doctors.');
}

function handleEmergency() {
    if (confirm('Call emergency services: +91-863-123-VITAP?')) {
        window.open('tel:+918631234827');
    }
}

function toggleMobileMenu() {
    alert('Mobile menu coming soon!');
}

// Global function exports
window.showSection = showSection;
window.handleSignIn = handleSignIn;
window.processSignIn = processSignIn;
window.closeModal = closeModal;
window.toggleTheme = toggleTheme;
window.logout = logout;
window.performHeroSearch = performHeroSearch;
window.handleSearchKeyPress = handleSearchKeyPress;
window.handleBookAppointment = handleBookAppointment;
window.handleEmergency = handleEmergency;
window.toggleMobileMenu = toggleMobileMenu;

// Initialize on load
document.addEventListener('DOMContentLoaded', initApp);