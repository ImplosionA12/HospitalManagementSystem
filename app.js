// VIT-AP University Hospital - Complete Application Logic

let currentTheme = localStorage.getItem('vitap-theme') || 'light';
let currentSection = 'home';
let currentUser = null;

// Ruthvik's data
const ruthvikData = {
    personal_info: {
        student_name: 'Ruthvik',
        student_id: '24MIC7198',
        email: 'ruthvik.24mic7198@vitap.ac.in',
        phone: '+91-9876543210',
        course: 'B.Tech Computer Science',
        batch: '2024-2028'
    },
    medical_records: {
        basic_info: {
            blood_group: 'B+',
            height: '175 cm',
            weight: '68 kg',
            bmi: '22.2',
            allergies: ['Dust', 'Pollen']
        },
        recent_visits: [
            {
                date: '2025-09-15',
                doctor: 'Dr. Priya Sharma',
                department: 'Student Health Center',
                reason: 'Annual Health Checkup',
                diagnosis: 'Overall healthy condition. Maintain current routine.',
                notes: 'Recommended Vitamin D3 supplement weekly. Continue regular exercise.',
                cost: 'Free (Student Coverage)'
            },
            {
                date: '2025-08-22',
                doctor: 'Dr. Anitha Reddy',
                department: 'Mental Health Services',
                reason: 'Academic Stress Counseling',
                diagnosis: 'Mild anxiety symptoms related to academic pressure.',
                notes: 'Stress management techniques discussed. Sleep hygiene recommendations provided. Follow-up in 4 weeks.',
                cost: 'Free (Student Coverage)'
            },
            {
                date: '2025-07-10',
                doctor: 'Dr. Vikram Singh',
                department: 'Sports Medicine',
                reason: 'Knee strain from basketball',
                diagnosis: 'Minor strain in left knee - Grade 1 sprain.',
                notes: 'Prescribed rest for 2 weeks, ice therapy, and physiotherapy sessions. Full recovery achieved.',
                cost: '₹300 (Student Discount Applied)'
            }
        ]
    }
};

// Initialize application
function initApp() {
    console.log('🏥 Initializing VIT-AP University Hospital...');

    // Load saved theme
    setTheme(currentTheme);

    // Set up event listeners
    setupEventListeners();

    console.log('✅ VIT-AP University Hospital initialized successfully!');
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

    // Visual feedback - rotate the toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }

    console.log(`🎨 Switched to ${newTheme} theme`);
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
        'support': 'Contact Support'
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
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Use your VIT-AP Student ID</div>
                </div>

                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" placeholder="Enter your password" id="password" required>
                    <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Demo password: vitap123</div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn btn--primary">Sign In</button>
                </div>
            </form>

            <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
                <small style="color: var(--text-secondary);">
                    <strong>Demo Credentials:</strong><br>
                    Student: 24MIC7198 / vitap123<br>
                    <em>💡 Tip: Use Ctrl+Shift+T to toggle theme!</em>
                </small>
            </div>
        </div>
    `);
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

        // Show success message (you can replace with toast if you have one)
        console.log('✅ User signed in:', currentUser);

        // If on records page, re-render with user data
        if (currentSection === 'records') {
            renderRecords();
        }
    } else {
        alert('Invalid credentials. Please try:\nStudent ID: 24MIC7198\nPassword: vitap123');
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
            ...ruthvikData.personal_info
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

    console.log('👋 User signed out');
}

function renderRecords() {
    const recordsContent = document.getElementById('records-content');
    if (!recordsContent) return;

    if (!currentUser) {
        recordsContent.innerHTML = `
            <div class="coming-soon">
                <h3>🔐 Sign In Required</h3>
                <p>Please sign in with your student ID to access your medical records.</p>
                <button class="btn btn--primary" onclick="handleSignIn()">Sign In</button>
            </div>
        `;
        return;
    }

    // Show records for Ruthvik
    const data = ruthvikData.medical_records;
    const visits = ruthvikData.medical_records.recent_visits;

    recordsContent.innerHTML = `
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
                    <div><strong>Allergies:</strong> ${data.basic_info.allergies.join(', ')}</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="card-title">Recent Medical Visits</div>
                <div class="card-subtitle">Last ${visits.length} clinical encounters</div>
            </div>
            <div class="card-body">
                ${visits.map(visit => `
                    <div style="display: flex; gap: 1rem; justify-content: space-between; align-items: flex-start; padding: 1.5rem 0; border-bottom: 1px solid var(--border-light); last-child:border-bottom: none;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-primary);">
                                ${visit.reason}
                            </div>
                            <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">
                                <strong>${visit.doctor}</strong> • ${visit.department} • ${new Date(visit.date).toLocaleDateString('en-IN')}
                            </div>
                            <div style="margin-bottom: 0.75rem; line-height: 1.5;">
                                <strong>Diagnosis:</strong> ${visit.diagnosis}
                            </div>
                            <div style="line-height: 1.5; color: var(--text-secondary);">
                                <strong>Notes:</strong> ${visit.notes}
                            </div>
                        </div>
                        <div style="white-space: nowrap; color: var(--primary-blue); font-weight: 600; font-size: 0.9rem; text-align: right; min-width: 120px;">
                            ${visit.cost}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div style="text-align: center; margin: 2rem 0; padding: 1.5rem; background: var(--bg-secondary); border-radius: 0.75rem;">
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">
                📋 Complete medical history available • 🔒 HIPAA Compliant • 📱 Mobile accessible
            </p>
        </div>
    `;
}

function handleBookAppointment() {
    if (!currentUser) {
        alert('Please sign in first to book an appointment.');
        handleSignIn();
        return;
    }

    alert(`Hello ${currentUser.name}!\n\nAppointment booking system is coming soon.\nYou'll be able to book appointments with our doctors directly through this portal.`);
}

function performHeroSearch() {
    const searchInput = document.getElementById('hero-search');
    const query = searchInput?.value.trim() || '';

    if (query) {
        console.log('🔍 Searching for:', query);
        alert(`Searching for: "${query}"\n\nAdvanced search functionality coming soon!`);

        // Clear search input
        if (searchInput) searchInput.value = '';
    }
}

function handleEmergency() {
    const confirmed = confirm('📞 Emergency Contact\n\nCall VIT-AP Hospital Emergency Services:\n+91-863-123-VITAP\n\nThis will attempt to make a phone call.\n\nProceed?');

    if (confirmed) {
        window.open('tel:+918631234827');
    }
}

function toggleMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (toggle) {
        toggle.classList.toggle('active');
    }

    // For now, just show an alert - mobile menu implementation can be added later
    alert('Mobile navigation menu coming soon!\nFor now, please use the desktop navigation or scroll to access different sections.');
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

// Global function exports for onclick handlers
window.showSection = showSection;
window.handleSignIn = handleSignIn;
window.processSignIn = processSignIn;
window.handleBookAppointment = handleBookAppointment;
window.performHeroSearch = performHeroSearch;
window.handleEmergency = handleEmergency;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.closeModal = closeModal;
window.logout = logout;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    console.log('🎉 VIT-AP University Hospital ready!');
});