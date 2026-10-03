// ==========================================
// GAME LABS SCREENSHOT DISPLAY CODE
// ==========================================
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

document.addEventListener('DOMContentLoaded', () => {
  loadScreenshots('screenshotGrid'); 
});


// ==========================================
// GENERIC & REUSABLE WEB POLL SCRIPT
// ==========================================
const form = document.getElementById('storyPoll');
const resultDiv = document.getElementById('pollResult');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

const STORAGE_KEY = 'userStoryVote';
const savedVote = localStorage.getItem(STORAGE_KEY);

// Helper function to freeze all text and radio inputs once voted
function lockAllInputs() {
  if (!form) return;
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.disabled = true;
  });
}

// 2. CHECK MEMORY ON PAGE LOAD
if (savedVote && form && resultDiv && submitBtn) {
    resultDiv.textContent = `You have already submitted your answers! Choice: ${savedVote}`;
    submitBtn.disabled = true;
    lockAllInputs();
    
    // Attempt to visually re-check the radio option they picked
    const radioInput = form.querySelector(`input[value="${savedVote}"]`);
    if (radioInput) {
        radioInput.checked = true;
    }
}

// 3. HANDLE NEW SUBMISSIONS
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const checkedInput = form.querySelector('input[type="radio"]:checked');
        const artInput = document.getElementById('art');
        
        if (resultDiv && submitBtn) {
            // Save whatever radio button or text answer was given
            const voteValue = checkedInput ? checkedInput.value : (artInput ? artInput.value : "Submitted");
            
            localStorage.setItem(STORAGE_KEY, voteValue);
            resultDiv.textContent = `Answers recorded successfully!`;
            
            submitBtn.disabled = true;
            lockAllInputs();
        }
    });
}

// 4. TESTING & ADMIN TOOL: Clear memory
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        localStorage.removeItem(STORAGE_KEY);
        alert("Memory cleared! Refreshing the page to unlock the poll options...");
        location.reload(); 
    });
}
