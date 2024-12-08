document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signatureForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Collect form values
        const arabicName = document.getElementById('arabicName').value;
        const arabicPosition = document.getElementById('arabicPosition').value;
        const arabicDepartment = document.getElementById('arabicDepartment').value;

        const englishName = document.getElementById('englishName').value;
        const englishPosition = document.getElementById('englishPosition').value;
        const englishDepartment = document.getElementById('englishDepartment').value;

        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const telephone = document.getElementById('telephone').value;
        const external = document.getElementById('external').value;

        // Build signature HTML with custom icons
        let signature = `
            <strong class="name" style="color: rgba(79,170,216,255); font-weight: bold; font-size: 20px;">${arabicName}</strong><br>
            <span class="position" style="color: rgba(144,126,102,255); font-weight: bold;">${arabicPosition}</span><br>
            <span class="department" style="color: rgba(144,126,102,255);">${arabicDepartment}</span><br>

            <strong class="name" style="color: rgba(79,170,216,255);">${englishName}</strong><br>
            <span class="position" style="color: rgba(144,126,102,255); font-weight: bold;">${englishPosition}</span><br>
            <span class="department" style="color: rgba(144,126,102,255);">${englishDepartment ? englishDepartment + '<br>' : ''}</span>
        `;

        // Add contact info only if fields are filled
        if (email) {
            signature += `
                <img src="email.jpg" alt="Email Icon" class="icon"> 
                <a class="email" href="mailto:${email}" style="color: rgba(25,111,198,255);">${email}</a><br>
            `;
        }

        // Add phone number on its own line, and telephone and external on the next line
        if (phone || telephone || external) {
            if (phone) {
                signature += `
                    <img src="phone.jpg" alt="Phone Icon" class="icon"> 
                    <span class="contact-info" style="color: rgba(144,126,102,255);">${phone}</span><br>
                `;
            }

            signature += `
                <div style="display: flex; align-items: center;">
                    ${telephone ? `
                        <img src="tel.jpg" alt="Telephone Icon" class="icon"> 
                        <span class="contact-info" style="color: rgba(144,126,102,255);">${telephone}</span>
                    ` : ''}
                    ${external ? `
                        <span class="contact-info" style="color: rgba(144,126,102,255); margin-right: 15px;">External: ${external}</span>
                    ` : ''}
                </div>
            `;
        }

        // Update the signature content in the template
        document.getElementById('signatureContent').innerHTML = signature;

        // Show the signature output section
        document.getElementById('signatureOutput').style.display = 'block';
    });

    // Download signature image functionality
    document.getElementById('downloadSignatureButton').addEventListener('click', function() {
        html2canvas(document.getElementById('signatureTemplate')).then(function(canvas) {
            // Create an anchor element and trigger a download
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'signature.png';
            link.click();
        }).catch(function(error) {
            console.error('Error capturing the signature:', error);
        });
    });
});
