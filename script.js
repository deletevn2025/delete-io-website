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