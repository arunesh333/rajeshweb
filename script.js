// Optional: Blinking cursor handled via CSS
// Add glitch effect for buttons (optional)
document.querySelectorAll('.btn-terminal').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.textShadow = '0 0 5px #00FF00, 0 0 10px #00FF00';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.textShadow = 'none';
  });
});
const elements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
elements.forEach(el => observer.observe(el));

document.addEventListener('DOMContentLoaded', () => {

  // --- Fade-in animation on scroll ---
  const fadeInElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  fadeInElements.forEach(el => observer.observe(el));


  // --- Interactive Terminal Logic ---
  const terminal = document.getElementById('terminal');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');

  const helpMessage = `
    Available commands:
    'help'         - Show this list of commands
    'about'       - Display summary about me
    'projects'     - Scroll to my projects
    'certs'        - Show my certifications
    'skills'       - List my technical skills
    'contact'      - Display contact information
    'resume'       - Open my resume in a new tab
    'clear'        - Clear the terminal screen
  `;

  // Function to add content to the terminal output
  function printToTerminal(text, isInputLog = false) {
    const p = document.createElement('p');
    p.innerHTML = text; // Using innerHTML to render line breaks from template literals
    p.className = isInputLog ? 'command-input-log' : 'command-output';
    terminalOutput.appendChild(p);
    // Auto-scroll to the bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
  
  // Initial welcome message
  printToTerminal("Welcome to Rajesh's interactive portfolio.\nType 'help' for a list of commands.");

  // Process commands on "Enter"
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      
      if (command) {
        // Log the command user typed
        printToTerminal(`> Rajesh_R.portfolio $ ${command}`, true);
        
        // Command processing
        switch (command) {
          case 'help':
            printToTerminal(helpMessage);
            break;
          case 'about':
            document.getElementById('01_about').scrollIntoView({ behavior: 'smooth' });
            printToTerminal("Scrolling to the About Me section...");
            break;
          case 'projects':
            document.getElementById('02_PROJECTS').scrollIntoView({ behavior: 'smooth' });
            printToTerminal("Executing... navigating to Projects...");
            break;
          case 'certs':
            document.getElementById('03_CERTS').scrollIntoView({ behavior: 'smooth' });
            printToTerminal("Accessing credentials... scrolling to Certifications...");
            break;
          case 'skills':
            document.getElementById('04_SKILLS').scrollIntoView({ behavior: 'smooth' });
            printToTerminal("Loading skill matrix...");
            break;
          case 'contact':
            document.getElementById('05_CONNECT').scrollIntoView({ behavior: 'smooth' });
            printToTerminal("Opening communication channels...");
            break;
          case 'resume':
            printToTerminal("Accessing resume.pdf...");
            window.open('assets/resume.pdf', '_blank');
            break;
          case 'clear':
            terminalOutput.innerHTML = '';
            break;
          default:
            printToTerminal(`Command not found: ${command}. Type 'help' for assistance.`);
        }

        // Clear the input field
        terminalInput.value = '';
      }
    }
  });

  // Make the whole terminal clickable to focus the input
  terminal.addEventListener('click', () => {
    terminalInput.focus();
  });
});