// Existing function to open tabs
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  Array.from(tabcontent).forEach(tab => {
    tab.style.display = "none";
  });

  const tablinks = document.getElementsByClassName("tablinks");
  Array.from(tablinks).forEach(link => {
    link.className = link.className.replace(" active", "");
  });

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  // Emit a custom event to notify that the tab has been switched
  const tabSwitchEvent = new Event('tabSwitched');
  document.dispatchEvent(tabSwitchEvent);
}

// Existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  // Set initial active tab
  const initialTabName = 'Colors';
  document.getElementById(initialTabName).style.display = 'block';

  // Attach event listeners to the tab buttons
  document.getElementById('colorsTab').addEventListener('click', function(event) {
    openTab(event, 'Colors');
  });

  document.getElementById('alarmsTab').addEventListener('click', function(event) {
    openTab(event, 'Alarms');
  });

  document.getElementById('googleAccountTab').addEventListener('click', function(event) {
    openTab(event, 'GoogleAccount');
  });

  // New: Update Google Account button
  updateGoogleAccountButton();
});

// New: Variable to keep track of login status
let isLoggedIn = false;

// New: Function to check if user is logged in
function checkLoginStatus() {
  // Your logic to check login status
  return isLoggedIn;
}

// New: Function to update button based on login status
function updateGoogleAccountButton() {
  const button = document.getElementById('googleAccountButton');

  if (!button) {
    console.error("googleAccountButton is null");
    return;
  }

  isLoggedIn = checkLoginStatus();

  if (isLoggedIn) {
    button.textContent = 'Disconnect from Google Account';
    button.onclick = function() {
      isLoggedIn = false;
      updateGoogleAccountButton();
    };
  } else {
    button.textContent = 'Connect to Google Account';
    button.onclick = function() {
      isLoggedIn = true;
      updateGoogleAccountButton();
    };
  }
}

// New: Listen for the custom tabSwitched event to update the button
document.addEventListener('tabSwitched', function() {
  updateGoogleAccountButton();
});
