// Tab switching functionality
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {
    // Convert HTMLCollections to arrays for safer iteration
    Array.from(tablinks).forEach(tablink => {
        tablink.classList.remove("active-link");
    });

    Array.from(tabcontents).forEach(tabcontent => {
        tabcontent.classList.remove("active-tab");
    });

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname)?.classList.add("active-tab");
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
});

const typingElement = document.querySelector('.typing-text');
const text = typingElement.textContent;
typingElement.textContent = '';

// Typing animation
function typeText(index = 0) {
    if (index < text.length) {
        typingElement.textContent += text[index];
        setTimeout(() => typeText(index + 1), 150); // Typing speed
    } else {
        setTimeout(() => {
            typingElement.textContent = ""; 
            typeText(0); // Restart typing
        }, 3000); // Wait 3 seconds before restarting
    }
}

// Start typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeText();
});

const sidemenu = document.getElementById("sidemenu");

// Mobile menu functionality
function openmenu() {
    if (sidemenu) {
        sidemenu.style.right = "0";
        sidemenu.setAttribute('aria-expanded', 'true');
    }
}

function closemenu() {
    if (sidemenu) {
        sidemenu.style.right = "-200px";
        sidemenu.setAttribute('aria-expanded', 'false');
    }
}

// Form submission handling
const handleFormSubmit = async (form, scriptURL) => {
    const msg = document.getElementById('msg');
    const name = form.elements["Name"].value.trim();
    const email = form.elements["Email"].value.trim();
    const message = form.elements["Message"].value.trim();

    // Validation
    if (!name || !email || !message) {
        showMessage("Please fill out all fields!", "error");
        return;
    }

    // Disable submit button
    form.querySelector('button[type="submit"]').disabled = true;

    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        showMessage("Message sent successfully!", "success");
        form.reset();
    } catch (error) {
        console.error('Error!', error.message);
        showMessage("Failed to send message!", "error");
    } finally {
        // Re-enable submit button
        form.querySelector('button[type="submit"]').disabled = false;
    }
};

// Email validation utility
const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Message display utility
const showMessage = (text, type = 'success') => {
    const msg = document.getElementById('msg');
    if (!msg) return;
    
    msg.innerHTML = text;
    msg.style.color = type === 'error' ? 'red' : 'green';
    setTimeout(() => { msg.innerHTML = ""; }, type === 'error' ? 3000 : 5000);
};

const scriptURL = 'https://script.google.com/macros/s/AKfycbxIT6NDdE2lQe1KvjvjX5lFdsPmnCUBpee58xc4jb1L81buCf5HFNw-G-ZG_8sPgL7ZAA/exec'
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
    e.preventDefault();
    handleFormSubmit(form, scriptURL);
});

// Smooth scroll implementation
const initSmoothScroll = () => {
    const MOBILE_BREAKPOINT = 768;
    
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const section = document.querySelector(targetId);
            
            if (!section) {
                console.warn(`Section ${targetId} not found`);
                return;
            }

            section.scrollIntoView({ behavior: 'smooth' });
            
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                closemenu();
            }
        });
    });
};

// Initialize smooth scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', initSmoothScroll);