document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdM5RwdZ-2RtVCV2QCgJvum2XyHokvq3OvYtgw0l7Bip8ft7g/formResponse";
  let formData = new FormData();
  formData.append("entry.1654506017", name);
  formData.append("entry.1425649245", email);

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    console.log("Form submitted to Google Forms!");
    emailjs.init("Ch_buYIHpB0sg-yKm");

    const templateParams = {
      to_name: name,
      to_email: email,
      message: "You are now registered. Welcome to the event!",
    };

    emailjs.send("service_z3gxw2l", "template_e2p2d9a", templateParams)
      .then((response) => {
        alert("Registration Successful! Email sent.");
        console.log("SUCCESS!", response.status, response.text);
      }, (error) => {
        alert("Failed to send email. Please try again.");
        console.log("FAILED...", error);
      });
  });
});

// Countdown Timer
function startCountdown(eventDate) {
  const countdownElement = document.getElementById('countdown');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(interval);
      countdownElement.innerHTML = "The event has started!";
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      countdownElement.innerHTML = `Event starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  const interval = setInterval(updateCountdown, 1000);
}

// Set the event date and start the countdown
const eventDate = new Date("November 15, 2024 09:00:00").getTime();
startCountdown(eventDate);
