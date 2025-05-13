/**
 * StratumHost Countdown Timer
 * This script handles the countdown timer functionality for the StratumHost website
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('StratumHost Countdown Timer Initialized');
    
    // Set the launch date (3 months from now)
    const now = new Date();
    const launchDate = new Date(now);
    launchDate.setMonth(now.getMonth() + 3);
    
    // Get countdown container
    const countdownContainer = document.getElementById('countdown-container');
    
    if (!countdownContainer) {
        console.error('Countdown container not found!');
        return;
    }
    
    console.log('Countdown container found:', countdownContainer);
    
    // Add animation class to countdown boxes
    const countdownBoxes = document.querySelectorAll('.countdown-box');
    countdownBoxes.forEach((box, index) => {
        // Add staggered animation delay
        box.style.animationDelay = `${index * 0.1}s`;
        box.classList.add('fade-in');
    });
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const currentDate = new Date().getTime();
        
        // Find the distance between now and the launch date
        const distance = launchDate.getTime() - currentDate;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display with animation
        updateCountdownValue('countdown-days', formatTime(days));
        updateCountdownValue('countdown-hours', formatTime(hours));
        updateCountdownValue('countdown-minutes', formatTime(minutes));
        updateCountdownValue('countdown-seconds', formatTime(seconds));
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownContainer.innerHTML = "<h2 class='text-gradient'>We've Launched!</h2>";
        }
    }, 1000);
    
    // Format time to always show two digits (e.g., 01 instead of 1)
    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }
    
    // Update countdown value with animation
    function updateCountdownValue(id, newValue) {
        const element = document.getElementById(id);
        if (!element) return;
        
        // Only animate if value has changed
        if (element.innerHTML !== newValue) {
            element.classList.add('pulse');
            element.innerHTML = newValue;
            
            // Remove animation class after animation completes
            setTimeout(() => {
                element.classList.remove('pulse');
            }, 500);
        }
    }
    
    // Handle waitlist form submission
    const waitlistForm = document.getElementById('waitlist-form');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('waitlist-name');
            const emailInput = document.getElementById('waitlist-email');
            
            if (!nameInput || !emailInput) return;
            
            if (!nameInput.value || !emailInput.value) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Add loading state
            const submitButton = waitlistForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerText;
            submitButton.innerHTML = '<span class="spinner"></span> Processing...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real implementation, you would send this data to your server
                showMessage('Thank you for joining our waitlist!', 'success');
                
                // Reset form
                nameInput.value = '';
                emailInput.value = '';
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Show message function
    function showMessage(message, type) {
        const messageContainer = document.getElementById('waitlist-message');
        
        if (!messageContainer) {
            // Create message container if it doesn't exist
            const newMessageContainer = document.createElement('div');
            newMessageContainer.id = 'waitlist-message';
            waitlistForm.parentNode.insertBefore(newMessageContainer, waitlistForm.nextSibling);
            showMessage(message, type); // Call again with the new container
            return;
        }
        
        messageContainer.textContent = message;
        messageContainer.className = 'message ' + type;
        messageContainer.style.display = 'block';
        
        // Add animation
        messageContainer.classList.add('slide-in');
        
        // Hide the message after 5 seconds
        setTimeout(function() {
            messageContainer.classList.add('slide-out');
            
            setTimeout(() => {
                messageContainer.style.display = 'none';
                messageContainer.classList.remove('slide-in', 'slide-out');
            }, 300);
        }, 5000);
    }
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.8s ease forwards;
            opacity: 0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .pulse {
            animation: pulse 0.5s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .slide-in {
            animation: slideIn 0.3s ease forwards;
        }
        
        .slide-out {
            animation: slideOut 0.3s ease forwards;
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s linear infinite;
            vertical-align: middle;
            margin-right: 5px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .message {
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            color: white;
            text-align: center;
        }
        
        .message.success {
            background: linear-gradient(135deg, #10B981 0%, #4ECDC4 100%);
        }
        
        .message.error {
            background: linear-gradient(135deg, #EF4444 0%, #FF6B6B 100%);
        }
        
        .text-gradient {
            background: linear-gradient(to right, #6C63FF, #4ECDC4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `;
    document.head.appendChild(style);
}); 