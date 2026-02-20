// JavaScript code for the pre-operational inspection system

// Simulated data for the dashboard
const mockData = {
    inspecciones: 25,
    solicitudesPendientes: 8,
    solicitudesCompletadas: 17,
    visitantesHoy: 156,
    visitantesTotal: 2340,
    combustibleTotal: 847.50
};

// Function to animate numbers on the dashboard
function animateNumber(elementId, finalValue, duration = 2000) {
    const element = document.getElementById(elementId);
    const startValue = 0;
    const increment = finalValue / (duration / 16);
    let currentValue = startValue;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        
        if (elementId === 'combustibleTotal') {
            element.textContent = currentValue.toFixed(2);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// Load dashboard data with animation
function loadDashboardData() {
    setTimeout(() => {
        animateNumber('inspecciones', mockData.inspecciones);
        animateNumber('solicitudesPendientes', mockData.solicitudesPendientes);
        animateNumber('solicitudesCompletadas', mockData.solicitudesCompletadas);
        animateNumber('visitantesHoy', mockData.visitantesHoy);
        animateNumber('visitantesTotal', mockData.visitantesTotal);
        animateNumber('combustibleTotal', mockData.combustibleTotal);
    }, 500);
}

// Toggle theme function
function toggleTheme() {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle.classList.contains('fa-moon')) {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    loadDashboardData();
    
    const cards = document.querySelectorAll('.dashboard-card, .action-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Responsive menu toggle for mobile
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}