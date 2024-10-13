document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Step 1: Submit data to Google Forms
  const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdM5RwdZ-2RtVCV2QCgJvum2XyHokvq3OvYtgw0l7Bip8ft7g/formResponse";  // Replace YOUR_FORM_ID
  let formData = new FormData();
  formData.append("entry.1654506017", name); // Replace with your Google Form field ID for 'name'
  formData.append("entry.1425649245", email); // Replace with your Google Form field ID for 'email'

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    console.log("Form submitted to Google Forms!");

    // Step 2: Send confirmation email using EmailJS
    emailjs.init("Ch_buYIHpB0sg-yKm");  // Replace with your EmailJS user ID

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
