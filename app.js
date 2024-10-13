document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Step 1: Submit data to Google Forms
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSc0zScyiFo90UQtuG-5YEniPfzlEVghB1VZbhNzPdegikgpdw/formResponse";  
  let formData = new FormData();
  formData.append("entry.2092238618", name); // Google Form field ID for 'name'
  formData.append("entry.1556369182", email); // Google Form field ID for 'email'

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
  .then(() => {
    console.log("Form submitted to Google Forms!");

    // Step 2: Send confirmation email using EmailJS
    emailjs.init("Ch_buYIHpB0sg-yKm");  // Your EmailJS user ID

    const templateParams = {
      to_name: name,
      to_email: email,
      from_name: "Your Organization Name", // Optional: Sender's name
      message: "You've been registered for the BLABLA Event!" // Optional: Custom message
    };

    return emailjs.send("service_m4w667c", "template_kszgnsk", templateParams);
  })
  .then((response) => {
    alert("Registration Successful! Email sent.");
    console.log("SUCCESS!", response.status, response.text);
  })
  .catch((error) => {
    alert("Failed to send email or submit form. Please try again.");
    console.log("FAILED...", error);
  });
});
