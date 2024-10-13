document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Step 1: Submit data to Google Forms
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSc0zScyiFo90UQtuG-5YEniPfzlEVghB1VZbhNzPdegikgpdw/formResponse";  // Replace YOUR_FORM_ID
  let formData = new FormData();
  formData.append("entry.2092238618", name); // Replace with your Google Form field ID for 'name'
  formData.append("entry.1556369182", email); // Replace with your Google Form field ID for 'email'

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    console.log("Form submitted to Google Forms!");

    // Step 2: Send confirmation email using EmailJS
    emailjs.init("service_1fguzfs");  // Replace with your EmailJS user ID

    const templateParams = {
      to_name: name,
      to_email: email,
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
      .then((response) => {
        alert("Registration Successful! Email sent.");
        console.log("SUCCESS!", response.status, response.text);
      }, (error) => {
        alert("Failed to send email. Please try again.");
        console.log("FAILED...", error);
      });
  });
});
