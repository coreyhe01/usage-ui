function getNextResetTime() {
  const now = new Date();
  const remainder = now.getHours() % 3;
  const next = new Date(now);
  next.setHours(now.getHours() - remainder + 3, 0, 0, 0);
  if (next <= now) next.setHours(next.getHours() + 3);
  return next;
}

function updateCountdown() {
  const now = new Date();
  const reset = getNextResetTime();
  const diff = reset - now;

  if (diff <= 0) {
    document.getElementById("countdown").textContent = "Reset now";
    return;
  }

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("countdown").textContent = `${hours}h ${minutes}m ${seconds}s`;
  document.getElementById("timezone-label").textContent = `Your Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
