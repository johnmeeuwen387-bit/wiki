// 1. GAME LABS SCREENSHOT DISPLAY CODE
// ==========================================
// Replace these with the exact names of your 4 files from your game labs folder
const screenshots = [
  "questions.png", 
  "jeremy.png",
  "shadow.png",
  "_____.png"
];

function loadScreenshots(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  screenshots.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Game Labs Screenshot ${index + 1}`;
    img.className = 'screenshot-img';
    container.appendChild(img);
  });
}

// Kick off screenshot loading as soon as the page opens
document.addEventListener('DOMContentLoaded', () => {
  loadScreenshots('screenshotGrid'); // Matches the ID in your HTML
});

/**
 * Generic & Reusable Web Poll Script
 * Works on any website by matching HTML element IDs.
 */

// 1. Select all necessary HTML elements by their IDs
const form = document.getElementById('storyPoll');
const resultDiv = document.getElementById('pollResult');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

// Define a unique storage key name for this specific poll's browser memory
const STORAGE_KEY = 'userStoryVote';

// 2. CHECK MEMORY ON PAGE LOAD: See if the user has already voted
const savedVote = localStorage.getItem(STORAGE_KEY);

if (savedVote && form && resultDiv && submitBtn) {
    // Lock down the interface immediately
    resultDiv.textContent = `You have already voted for: ${savedVote}!`;
    submitBtn.disabled = true;
    
    // Find all radio options inside this form and lock them
    const inputs = form.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
        input.disabled = true;
        // Visually re-check the option they previously voted for
        if (input.value === savedVote) {
            input.checked = true; 
        }
    });
}

// 3. HANDLE NEW SUBMISSIONS: Intercept and process the vote
if (form) {
    form.addEventListener('submit', function(event) {
        // Crucial: Stops Microsoft Edge/browsers from reloading the page
        event.preventDefault(); 
        
        // Dynamically find whichever radio button is checked right now
        // It checks for the 'name' attribute of the chosen option automatically
        const checkedInput = form.querySelector('input[type="radio"]:checked');
        
        if (checkedInput && resultDiv && submitBtn) {
            const voteValue = checkedInput.value;
            
            // Save the value safely into the browser's persistent memory
            localStorage.setItem(STORAGE_KEY, voteValue);
            
            // Print the immediate feedback on screen
            resultDiv.textContent = `Vote recorded for: ${voteValue}!`;
            
            // Lock down the submit button and all radio inputs instantly
            submitBtn.disabled = true;
            const inputs = form.querySelectorAll('input[type="radio"]');
            inputs.forEach(input => input.disabled = true);
        }
    });
}

// 4. TESTING & ADMIN TOOL: Handle the manual memory reset feature
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        // Erase the specific vote token from this browser's memory
        localStorage.removeItem(STORAGE_KEY);
        
        // Provide feedback and refresh the page to completely unlock the inputs
        alert("Memory cleared! Refreshing the page to unlock the poll options...");
        location.reload(); 
    });
}

