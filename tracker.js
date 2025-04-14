(function() {
  const startTime = new Date();
  const limit = 80;
  let messagesSent = 20;

  const tracker = document.createElement('div');
  tracker.id = 'chatgpt-usage-tracker';
  tracker.innerHTML = `
    <h2>⚙️ ChatGPT Usage Tracker</h2>
    <div class="tracker-info" id="model">Model: GPT-4o</div>
    <div class="tracker-info" id="messages">Messages: 0 / 80</div>
    <div class="tracker-info" id="percent">0% used</div>
    <div class="tracker-info" id="time-remaining">Time Remaining: calculating...</div>
    <div class="tracker-info" id="reset-time">Reset Time: --</div>
  `;
  document.body.appendChild(tracker);

  const percentText = tracker.querySelector('#percent');
  const msgText = tracker.querySelector('#messages');
  const timeRemainText = tracker.querySelector('#time-remaining');
  const resetTimeText = tracker.querySelector('#reset-time');

  function updateDisplay() {
    const now = new Date();
    const resetTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000);
    const timeRemaining = resetTime - now;
    const percent = Math.min(100, (messagesSent / limit) * 100);

    percentText.textContent = \`\${percent.toFixed(0)}% used\`;
    percentText.style.color = percent < 60 ? 'green' : percent < 85 ? 'orange' : 'red';
    msgText.textContent = \`Messages: \${messagesSent} / \${limit}\`;
    timeRemainText.textContent = \`Time Remaining: \${formatTime(timeRemaining)}\`;
    resetTimeText.textContent = \`Reset Time: \${resetTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' })}\`;
  }

  function formatTime(ms) {
    if (ms <= 0) return 'Session reset';
    const min = Math.floor(ms / 60000);
    const hrs = Math.floor(min / 60);
    const remMin = min % 60;
    return \`\${hrs}h \${remMin}m\`;
  }

  window.incrementMessages = function(count = 1) {
    messagesSent = Math.min(limit, messagesSent + count);
    updateDisplay();
  }

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark) tracker.classList.add('dark');

  updateDisplay();
})();