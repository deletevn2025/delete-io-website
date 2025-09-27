document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('verificationForm');
    const accountNameInput = document.getElementById('accountName');
    const verifyButton = document.querySelector('.verify-button');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const accountName = accountNameInput.value.trim();
        
        if (accountName === '') {
            showError('Vui lòng nhập tên tài khoản');
            return;
        }

        if (!validateAccountName(accountName)) {
            const errorMsg = getAccountValidationError(accountName);
            showError(errorMsg);
            return;
        }

        // Simulate verification process
        verifyButton.textContent = 'Đang xác minh...';
        verifyButton.disabled = true;
        
        setTimeout(() => {
            // Reset button
            verifyButton.textContent = 'Tiến hành xác minh';
            verifyButton.disabled = false;
            
            // Show success message and redirect
            showSuccess(`Xác minh thành công! Đang chuyển trang...`);
            
            // Redirect to security info page with account name
            setTimeout(() => {
                window.location.href = `security-info.html?account=${encodeURIComponent(accountName)}`;
            }, 1500);
        }, 2000);
    });

    // Input validation
    accountNameInput.addEventListener('input', function() {
        clearMessages();
        
        const value = this.value;
        const isValid = validateAccountName(value);
        const helperText = document.getElementById('helperText');
        const characterCount = document.getElementById('characterCount');
        const currentCount = document.getElementById('currentCount');
        
        // Update character count
        currentCount.textContent = value.length;
        
        if (value === '') {
            // Empty input - neutral styling, hide helper and counter
            this.style.borderColor = 'rgba(66, 153, 225, 0.3)';
            helperText.style.display = 'none';
            characterCount.style.display = 'none';
        } else {
            // Show character count when typing
            characterCount.style.display = 'block';
            
            // Color code the counter based on length
            characterCount.className = 'character-count';
            if (value.length < 6) {
                characterCount.classList.add('warning');
            } else if (value.length === 10) {
                characterCount.classList.add('error');
            }
            
            if (isValid) {
                // Valid input - green border, hide helper
                this.style.borderColor = '#48bb78';
                helperText.style.display = 'none';
            } else {
                // Invalid input - red border, show helper
                this.style.borderColor = '#e53e3e';
                helperText.style.display = 'block';
                helperText.style.color = '#e53e3e';
            }
        }
    });

    // Validation functions
    function validateAccountName(accountName) {
        // Check length (6-10 characters)
        if (accountName.length < 6 || accountName.length > 10) {
            return false;
        }
        
        // Check for special characters (only allow letters, numbers, and underscore)
        const validPattern = /^[a-zA-Z0-9_]+$/;
        return validPattern.test(accountName);
    }

    function getAccountValidationError(accountName) {
        if (accountName.length < 6) {
            return 'Tên tài khoản phải có ít nhất 6 ký tự';
        }
        
        if (accountName.length > 10) {
            return 'Tên tài khoản không được vượt quá 10 ký tự';
        }
        
        const validPattern = /^[a-zA-Z0-9_]+$/;
        if (!validPattern.test(accountName)) {
            return 'Tên tài khoản chỉ được chứa chữ cái, số và dấu gạch dưới (_)';
        }
        
        return 'Tên tài khoản không hợp lệ';
    }

    // Utility functions
    function showError(message) {
        clearMessages();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e53e3e;
            background: rgba(229, 62, 62, 0.1);
            border: 1px solid rgba(229, 62, 62, 0.3);
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 14px;
        `;
        
        form.insertBefore(errorDiv, form.firstChild);
        accountNameInput.style.borderColor = '#e53e3e';
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    function showSuccess(message) {
        clearMessages();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            color: #38a169;
            background: rgba(56, 161, 105, 0.1);
            border: 1px solid rgba(56, 161, 105, 0.3);
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 14px;
        `;
        
        form.insertBefore(successDiv, form.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }

    function clearMessages() {
        const existingMessages = form.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
    }

    // Placeholder for actual account verification API call
    function verifyAccount(accountName) {
        // This would typically make an AJAX request to your backend
        console.log('Verifying account:', accountName);
        
        // Example API call structure:
        /*
        fetch('/api/verify-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountName: accountName })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to next page or show success
                window.location.href = '/verification-success';
            } else {
                showError(data.message || 'Xác minh không thành công');
            }
        })
        .catch(error => {
            showError('Có lỗi xảy ra. Vui lòng thử lại.');
        });
        */
    }
});
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-bg';
    
    const encryptedBg = document.createElement('div');
    encryptedBg.className = 'encrypted-bg';
    
    document.body.appendChild(encryptedBg);
    document.body.appendChild(matrixContainer);
    
    // Characters for matrix effect (binary, hex, crypto symbols)
    const matrixChars = '01010011010010110110100001110101011001110110000101110010011000010110111001100111010101110110111101101110011001110010000001101110011001110111010101111001011001010110111001101000011101100110000101110100011000010110111101101011011010000110111101100001011011100010000001100011011010000111010101110101011011100110011101110100011101010110111100100000011001110110111101110100011000100110000101110100011010000110000101101001011101100110000101110100011000010110000101101110011010000110111100100000011011100110011101110101011110010110010101101110011010000110111101100001011100010000011100000001100001110010011001010110111001100111011010000111010101110101';
    const hexChars = '0123456789ABCDEF';
    const cryptoChars = '₿Ξ◊∆∇√∞≈≠≡±÷×∫∑∏∂∀∃∅∈∉⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⊏⊐⊑⊒⊓⊔⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿';
    
    function createMatrixColumn() {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        
        // Random position
        column.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration (4-12 seconds)
        const duration = Math.random() * 8 + 4;
        column.style.animationDuration = duration + 's';
        
        // Random delay
        column.style.animationDelay = Math.random() * 3 + 's';
        
        // Choose character set randomly
        let charSet = matrixChars;
        const rand = Math.random();
        if (rand < 0.3) {
            charSet = hexChars;
        } else if (rand < 0.5) {
            charSet = cryptoChars;
        }
        
        // Create random string of characters
        let text = '';
        const length = Math.random() * 15 + 8;
        for (let i = 0; i < length; i++) {
            text += charSet[Math.floor(Math.random() * charSet.length)] + '\n';
        }
        column.textContent = text;
        
        // Random opacity
        column.style.opacity = Math.random() * 0.6 + 0.2;
        
        matrixContainer.appendChild(column);
        
        // Remove column after animation
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, (duration + 3) * 1000);
    }
    
    // Create columns periodically
    const intervalId = setInterval(createMatrixColumn, 300);
    
    // Create initial burst of columns
    for (let i = 0; i < 15; i++) {
        setTimeout(createMatrixColumn, i * 100);
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });
}

// Start matrix effect when page loads
document.addEventListener('DOMContentLoaded', createMatrixBackground);