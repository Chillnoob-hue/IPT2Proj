// Initialize EmailJS
(function() {
    emailjs.init("Ch_buYIHpB0sg-yKm");
})();

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Send to Google Forms
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSdM5RwdZ-2RtVCV2QCgJvum2XyHokvq3OvYtgw0l7Bip8ft7g/formResponse";
    const data = new FormData();
    data.append('entry.1654506017', name); // Change to your form's entry ID for Name
    data.append('entry.1425649245', email); // Change to your form's entry ID for Email

    fetch(formURL, {
        method: 'POST',
        mode: 'no-cors',
        body: data
    })
    .then(() => {
        // Send verification email
        return emailjs.send("service_z3gxw2l", "template_5hd06zk", {
            name: name,
            email: email
        });
    })
    .then(() => {
        alert("Registration successful! A verification email has been sent.");
        document.getElementById('registrationForm').reset(); // Reset form
    })
    .catch(error => {
        console.error('Error!', error);
        alert("There was an error in the registration process.");
    });
});
