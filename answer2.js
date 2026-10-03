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

// Helper function to freeze all form controls (inputs, textareas, selects)
function lockAllInputs() {
  if (!form) return;
  const controls = form.querySelectorAll('input, textarea, select');
  controls.forEach(control => {
    control.disabled = true;
  });
}

// 2. CHECK MEMORY ON PAGE LOAD
if (savedVote && form && resultDiv && submitBtn) {
    resultDiv.textContent = `You have already submitted your answers! Choice: ${savedVote}`;
    submitBtn.disabled = true;
    lockAllInputs();
    
    // Attempt to visually re-check the radio option or fill the text field
    const radioInput = form.querySelector(`input[value="${CSS.escape(savedVote)}"]`);
    if (radioInput) {
        radioInput.checked = true;
    } else {
        const textInput = form.querySelector('input[type="text"], textarea');
        if (textInput) {
            textInput.value = savedVote;
        }
    }
}

// 3. HANDLE NEW SUBMISSIONS
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const checkedInput = form.querySelector('input[type="radio"]:checked');
        const textInput = form.querySelector('input[type="text"], textarea');
        
        // Grab either the checked radio value, the typed text value, or a fallback default
        let voteValue = "Submitted";
        if (checkedInput && checkedInput.value) {
            voteValue = checkedInput.value;
        } else if (textInput && textInput.value.trim() !== "") {
            voteValue = textInput.value.trim();
        }
        
        if (resultDiv && submitBtn) {
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
