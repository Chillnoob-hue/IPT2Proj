// Add an event listener to the registration form to handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  // Prevent the default form submission behavior (which would refresh the page)
  event.preventDefault();

  // Get the values of the name and email input fields
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // URL of the Google Form where the data will be submitted
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdM5RwdZ-2RtVCV2QCgJvum2XyHokvq3OvYtgw0l7Bip8ft7g/formResponse";

  // Create a FormData object to hold the form data
  let formData = new FormData();
  // Append name and email to the FormData object using the entry IDs from the Google Form
  formData.append("entry.1654506017", name); // Replace with your actual entry ID for name
  formData.append("entry.1425649245", email); // Replace with your actual entry ID for email

  // Send the form data to the Google Form using the Fetch API
  fetch(googleFormURL, {
    method: "POST", // Specify the request method
    mode: "no-cors", // Set mode to no-cors to avoid CORS issues (you won't get a response)
    body: formData // Attach the FormData object as the request body
  }).then(() => {
    // Log success message to the console
    console.log("Form submitted to Google Forms!");

    // Initialize EmailJS with your user ID
    emailjs.init("Ch_buYIHpB0sg-yKm");

    // Prepare parameters for the email to be sent
    const templateParams = {
      to_name: name, // Recipient's name
      to_email: email, // Recipient's email
      message: "You are now registered. Welcome to the event!", // Message content
    };

    // Send the email using EmailJS
    emailjs.send("service_z3gxw2l", "template_e2p2d9a", templateParams)
      .then((response) => {
        // Show success alert and log response
        alert("Registration Successful! Email sent.");
        console.log("SUCCESS!", response.status, response.text);
      }, (error) => {
        // Show error alert if email sending fails
        alert("Failed to send email. Please try again.");
        console.log("FAILED...", error); // Log error details
      });
  });
});

// Function to start the countdown timer for the event
function startCountdown(eventDate) {
  // Get the countdown element where the countdown will be displayed
  const countdownElement = document.getElementById('countdown');

  // Function to update the countdown display
  function updateCountdown() {
    // Get the current time
    const now = new Date().getTime();
    // Calculate the distance between now and the event date
    const distance = eventDate - now;

    // If the event date has passed, clear the interval and update the message
    if (distance < 0) {
      clearInterval(interval); // Stop the countdown
      countdownElement.innerHTML = "The event has started!"; // Update message
    } else {
      // Calculate the time components (days, hours, minutes, seconds)
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Update the countdown element with the remaining time
      countdownElement.innerHTML = `Event starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  // Set an interval to update the countdown every second (1000 milliseconds)
  const interval = setInterval(updateCountdown, 1000);
}

// Set the event date and start the countdown
const eventDate = new Date("November 15, 2024 09:00:00").getTime(); // Specify the event date and time
startCountdown(eventDate); // Call the countdown function
