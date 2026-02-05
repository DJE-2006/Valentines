// ========================================
// VALENTINE'S DAY WEBSITE - MAIN SCRIPT
// ========================================

// ========================================
// CONFIGURATION - UPDATE THESE VALUES!
// ========================================

// Formspree Configuration
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqdwerd'; // Replace with your Formspree endpoint
// Example: 'https://formspree.io/f/xwpegdry'

// Google Forms Configuration
const GOOGLE_FORM_ID = 'YOUR_GOOGLE_FORM_ID'; // Replace with your Google Form ID
const ENTRY_RESPONSE = 'entry.123456789'; // Replace with your entry ID for "Response"
const ENTRY_ANSWER = 'entry.987654321'; // Replace with your entry ID for "Answer"
const ENTRY_TIMESTAMP = 'entry.111111111'; // Replace with your entry ID for "Timestamp"
const ENTRY_DATE = 'entry.222222222'; // Replace with your entry ID for "Date"

// ========================================
// ANIMATION FUNCTIONS
// ========================================

// Generate Floating Hearts
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartSymbols = ['💕', '💖', '💗', '💝', '💓', '💞'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
    }
}

// Generate Falling Petals
function createFallingPetals() {
    const container = document.getElementById('petalsContainer');
    
    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(petal);
    }
}

// Create Animated Roses
function createRose(x, y, delay = 0) {
    const rose = document.createElement('div');
    rose.className = 'rose';
    rose.style.left = x + 'px';
    rose.style.top = y + 'px';
    rose.style.animationDelay = delay + 's';
    
    const rosePetals = document.createElement('div');
    rosePetals.className = 'rose-petals';
    
    for (let i = 0; i < 5; i++) {
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        rosePetals.appendChild(petal);
    }
    
    const center = document.createElement('div');
    center.className = 'rose-center';
    rosePetals.appendChild(center);
    
    const stem = document.createElement('div');
    stem.className = 'rose-stem';
    
    rose.appendChild(rosePetals);
    rose.appendChild(stem);
    
    return rose;
}

// Create Firework Effect
function createFirework(x, y, color) {
    const fireworksContainer = document.getElementById('fireworks');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        fireworksContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
}

// Ambient Fireworks
function createAmbientFireworks() {
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FFA500'];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);
    const color = colors[Math.floor(Math.random() * colors.length)];
    createFirework(x, y, color);
}

// Enhanced Fireworks on Yes
function celebrateWithFireworks() {
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FFA500', '#FF6B9D'];
    let count = 0;
    const interval = setInterval(() => {
        if (count >= 20) {
            clearInterval(interval);
            return;
        }
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const color = colors[Math.floor(Math.random() * colors.length)];
        createFirework(x, y, color);
        count++;
    }, 200);
}

// ========================================
// NOTIFICATION FUNCTIONS
// ========================================

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Play Sound
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio play failed:', e));
}

// Send Notification Function
function sendNotification(response) {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    const message = response === 'yes' 
        ? '💖 SHE SAID YES! She clicked the Yes button! 🎉'
        : '💔 She clicked No. Better luck next time.';
    
    // Show phone notification
    const phoneNotif = document.getElementById('phoneNotification');
    const notifMessage = document.getElementById('notifMessage');
    const notifTime = document.getElementById('notifTime');
    
    notifMessage.textContent = message;
    notifTime.textContent = timestamp;
    
    phoneNotif.classList.add('show');
    
    // Auto hide after 8 seconds
    setTimeout(() => {
        phoneNotif.classList.remove('show');
    }, 8000);
    
    // Vibrate if supported
    if ('vibrate' in navigator) {
        navigator.vibrate(response === 'yes' ? [200, 100, 200] : [300]);
    }
    
    // Browser notification (requires permission)
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Valentine Response', {
            body: message,
            icon: '💖',
            badge: '💖'
        });
    }
    
    // Send to external services
    sendToFormspree(response, timestamp);
    sendToGoogleForms(response, timestamp);
}

// ========================================
// EXTERNAL SERVICE INTEGRATIONS
// ========================================

// Send to Formspree
function sendToFormspree(response, timestamp) {
    // SETUP INSTRUCTIONS:
    // 1. Go to https://formspree.io/
    // 2. Sign up for free
    // 3. Create a new form
    // 4. Copy your form endpoint (looks like: https://formspree.io/f/YOUR_FORM_ID)
    // 5. Replace FORMSPREE_ENDPOINT at the top of this file with your actual endpoint
    
    if (FORMSPREE_ENDPOINT === 'YOUR_FORMSPREE_ENDPOINT') {
        console.log('Formspree: Please set up your endpoint first!');
        return;
    }
    
    const formData = new FormData();
    formData.append('response', response);
    formData.append('answer', response === 'yes' ? 'She said YES! 💖' : 'She said No 💔');
    formData.append('timestamp', timestamp);
    formData.append('date', new Date().toLocaleDateString());
    
    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Formspree: Response sent successfully!', data);
    })
    .catch(error => {
        console.error('Formspree error:', error);
    });
}

// Send to Google Forms
function sendToGoogleForms(response, timestamp) {
    // SETUP INSTRUCTIONS:
    // 1. Go to https://forms.google.com/
    // 2. Create a new form with these fields:
    //    - "Response" (Short answer)
    //    - "Answer" (Short answer)
    //    - "Timestamp" (Short answer)
    //    - "Date" (Short answer)
    // 3. Click "Send" > Click the link icon to get the pre-filled link
    // 4. Fill in dummy data and click "Get Link"
    // 5. From the URL, extract the form ID and entry IDs
    // 6. Replace the values at the top of this file
    
    if (GOOGLE_FORM_ID === 'YOUR_GOOGLE_FORM_ID') {
        console.log('Google Forms: Please set up your form first!');
        return;
    }
    
    const formData = new URLSearchParams();
    formData.append(ENTRY_RESPONSE, response);
    formData.append(ENTRY_ANSWER, response === 'yes' ? 'She said YES! 💖' : 'She said No 💔');
    formData.append(ENTRY_TIMESTAMP, timestamp);
    formData.append(ENTRY_DATE, new Date().toLocaleDateString());
    
    const googleFormUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    
    // Use fetch with no-cors mode (won't get response but will submit)
    fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
    })
    .then(() => {
        console.log('Google Forms: Response sent successfully!');
    })
    .catch(error => {
        console.error('Google Forms error:', error);
    });
}

// ========================================
// BUTTON EVENT LISTENERS
// ========================================

// "Yes" Button Handler
document.getElementById('btnYes').addEventListener('click', function() {
    // Play sound
    playSound('yesSound');
    
    // Show success content
    document.getElementById('mainContent').style.display = 'none';
    const successContent = document.getElementById('successContent');
    successContent.classList.add('show');
    
    // Create roses around the screen
    const container = document.querySelector('.container');
    const positions = [
        {x: 50, y: 100}, {x: window.innerWidth - 150, y: 100},
        {x: 100, y: window.innerHeight - 200}, {x: window.innerWidth - 200, y: window.innerHeight - 200}
    ];
    
    positions.forEach((pos, index) => {
        setTimeout(() => {
            const rose = createRose(pos.x, pos.y);
            container.appendChild(rose);
        }, index * 200);
    });
    
    // Trigger celebration fireworks
    celebrateWithFireworks();
    
    // Show toast
    showToast('🎉 Yayyy! You said YES! 💖');
    
    // Change background to brighter
    document.body.style.background = 'linear-gradient(135deg, #FFE4E9 0%, #FFB6C1 50%, #FF69B4 100%)';
    
    // Send notification (simulated)
    sendNotification('yes');
});

// "No" Button Handler
document.getElementById('btnNo').addEventListener('click', function() {
    // Play sound
    playSound('noSound');
    
    // Show modal
    document.getElementById('noModal').classList.add('show');
    
    // Mute colors
    document.body.style.filter = 'grayscale(30%)';
    
    // Show toast
    showToast('💗 Your honesty is appreciated');
    
    // Send notification (simulated)
    sendNotification('no');
});

// Close Modal
document.getElementById('modalClose').addEventListener('click', function() {
    document.getElementById('noModal').classList.remove('show');
    document.body.style.filter = 'none';
});

// Close modal on outside click
document.getElementById('noModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('show');
        document.body.style.filter = 'none';
    }
});

// ========================================
// INITIALIZATION
// ========================================

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize animations
createFloatingHearts();
createFallingPetals();

// Ambient fireworks every 3 seconds
setInterval(createAmbientFireworks, 3000);

// Initial firework burst
setTimeout(() => {
    createAmbientFireworks();
}, 1000);

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c💕 Valentine\'s Day Website Loaded! 💕', 'color: #FF69B4; font-size: 20px; font-weight: bold;');
console.log('%cDon\'t forget to configure your Formspree and Google Forms endpoints!', 'color: #FF1493; font-size: 14px;');