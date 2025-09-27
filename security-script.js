document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const datePickerBtn = document.getElementById('datePickerBtn');
    const hiddenDatePicker = document.getElementById('hiddenDatePicker');
    const registrationDate = document.getElementById('registrationDate');
    const transactionCount = document.getElementById('transactionCount');
    const accountStatus = document.getElementById('accountStatus');
    const hallCheckboxList = document.getElementById('hallCheckboxList');
    const selectedHalls = document.getElementById('selectedHalls');
    const selectAllBtn = document.getElementById('selectAllBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const receiveCodeBtn = document.getElementById('receiveCodeBtn');
    const sourceCode = document.querySelector('.source-code');
    const verificationInput = document.getElementById('verificationCode');
    const confirmBtn = document.getElementById('confirmBtn');
    const backBtn = document.getElementById('backBtn');

    let generatedCode = '';
    let currentYear = 2025;
    let currentAccount = '';

    // Initialize
    initializePage();

    function initializePage() {
        // Get account name from URL
        const urlParams = new URLSearchParams(window.location.search);
        currentAccount = urlParams.get('account') || 'default';
        
        // Set transaction count based on account name
        updateTransactionCountForAccount(currentAccount);
        
        // Set current date in hidden picker
        const today = new Date();
        hiddenDatePicker.value = today.toISOString().split('T')[0];
        
        // Update halls display
        updateSelectedHalls();
    }

    function updateTransactionCountForAccount(accountName) {
        let transactionNum;
        
        // Special accounts for testing
        const lowerAccountName = accountName.toLowerCase();
        if (lowerAccountName === 'inactive' || lowerAccountName === 'test0' || lowerAccountName === 'demo0') {
            transactionNum = 0; // Force inactive
        } else if (lowerAccountName === 'admin' || lowerAccountName === 'vip' || lowerAccountName === 'active') {
            transactionNum = 50; // Force active with high transactions
        } else {
            // Create a simple hash from account name to generate consistent random number
            let hash = 0;
            for (let i = 0; i < accountName.length; i++) {
                const char = accountName.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            
            // Use hash to generate number between 0-100 (0 = inactive, >0 = active)
            // Adjust probability: 15% chance of inactive (0), 85% chance of active (1-100)
            const randomValue = Math.abs(hash % 100);
            transactionNum = randomValue < 15 ? 0 : Math.abs(hash % 100) + 1;
        }
        
        transactionCount.textContent = transactionNum;
        
        // Update account status based on transaction count
        updateAccountStatus(transactionNum);
        
        // Add animation
        transactionCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            transactionCount.style.transform = 'scale(1)';
        }, 200);
    }

    function updateAccountStatus(transactionNum) {
        // Remove existing classes
        accountStatus.classList.remove('active', 'inactive');
        
        if (transactionNum > 0) {
            // Account has transactions = Active
            accountStatus.textContent = 'Active';
            accountStatus.classList.add('active');
            
            // Apply green styling directly
            accountStatus.style.background = 'rgba(72, 187, 120, 0.25)';
            accountStatus.style.color = '#48bb78';
            accountStatus.style.border = '2px solid rgba(72, 187, 120, 0.5)';
            accountStatus.style.boxShadow = '0 0 12px rgba(72, 187, 120, 0.4)';
            accountStatus.style.textShadow = '0 0 3px rgba(72, 187, 120, 0.8)';
        } else {
            // No transactions = Chưa active
            accountStatus.textContent = 'Chưa Active';
            accountStatus.classList.add('inactive');
            
            // Apply red styling directly
            accountStatus.style.background = 'rgba(229, 62, 62, 0.25)';
            accountStatus.style.color = '#e53e3e';
            accountStatus.style.border = '2px solid rgba(229, 62, 62, 0.5)';
            accountStatus.style.boxShadow = '0 0 12px rgba(229, 62, 62, 0.4)';
            accountStatus.style.textShadow = '0 0 3px rgba(229, 62, 62, 0.8)';
        }
        
        // Add animation
        accountStatus.style.transform = 'scale(1.1)';
        setTimeout(() => {
            accountStatus.style.transform = 'scale(1)';
        }, 200);
    }

    // Date Picker functionality
    datePickerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Date picker button clicked'); // Debug log
        triggerDatePicker();
    });

    // Also allow clicking on the date display
    registrationDate.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Date display clicked'); // Debug log
        triggerDatePicker();
    });

    function triggerDatePicker() {
        // Multiple approaches to ensure it works
        try {
            hiddenDatePicker.focus();
            hiddenDatePicker.click();
            
            // Fallback: trigger manually
            if (hiddenDatePicker.showPicker) {
                hiddenDatePicker.showPicker();
            }
        } catch (error) {
            console.log('Date picker error:', error);
            // Show a manual input as fallback
            const userDate = prompt('Nhập ngày theo định dạng DD/MM/YYYY:', '9/9/2025');
            if (userDate) {
                updateDateFromString(userDate);
            }
        }
    }

    hiddenDatePicker.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        updateDateDisplay(selectedDate);
    });

    function updateDateDisplay(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        currentYear = year;
        
        // Update display with blurred year
        const blurredYear = year.toString().substring(0, 2) + '**';
        registrationDate.innerHTML = `${day}/${month}/<span class="blurred-year">${blurredYear}</span>`;
        
        // Add animation
        registrationDate.style.transform = 'scale(1.05)';
        setTimeout(() => {
            registrationDate.style.transform = 'scale(1)';
        }, 200);
    }

    function updateDateFromString(dateString) {
        try {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                const day = parseInt(parts[0]);
                const month = parseInt(parts[1]) - 1; // Month is 0-based
                const year = parseInt(parts[2]);
                
                const date = new Date(year, month, day);
                updateDateDisplay(date);
                
                // Update hidden input
                hiddenDatePicker.value = date.toISOString().split('T')[0];
            }
        } catch (error) {
            console.log('Error parsing date:', error);
            showMessage('Định dạng ngày không đúng!', 'error');
        }
    }



    // Hall selection functionality
    hallCheckboxList.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            updateSelectedHalls();
        }
    });
    
    // Ensure scroll works on hall checkbox list
    hallCheckboxList.addEventListener('wheel', function(e) {
        e.stopPropagation();
        
        // Scroll the list
        const delta = e.deltaY || e.detail || e.wheelDelta;
        this.scrollTop += delta > 0 ? 30 : -30;
        
        // Prevent page scroll when scrolling in this element
        if ((this.scrollTop > 0 && delta > 0) || 
            (this.scrollTop < this.scrollHeight - this.clientHeight && delta < 0)) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Touch scroll support for mobile
    let isScrolling = false;
    let startY = 0;
    
    hallCheckboxList.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isScrolling = true;
    }, { passive: true });
    
    hallCheckboxList.addEventListener('touchmove', function(e) {
        if (!isScrolling) return;
        
        const currentY = e.touches[0].clientY;
        const deltaY = startY - currentY;
        
        this.scrollTop += deltaY;
        startY = currentY;
        
        e.preventDefault();
    }, { passive: false });
    
    hallCheckboxList.addEventListener('touchend', function(e) {
        isScrolling = false;
    }, { passive: true });

    // Select all halls
    selectAllBtn.addEventListener('click', function() {
        const checkboxes = hallCheckboxList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        updateSelectedHalls();
        
        // Animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });

    // Clear all halls
    clearAllBtn.addEventListener('click', function() {
        const checkboxes = hallCheckboxList.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateSelectedHalls();
        
        // Animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });

    function updateSelectedHalls() {
        const checkedBoxes = hallCheckboxList.querySelectorAll('input[type="checkbox"]:checked');
        selectedHalls.innerHTML = '';
        
        checkedBoxes.forEach(checkbox => {
            const hallName = checkbox.parentElement.querySelector('.hall-name').textContent;
            const hallTag = document.createElement('span');
            hallTag.className = 'hall-tag';
            hallTag.textContent = hallName;
            hallTag.addEventListener('click', () => {
                // Remove from selection
                checkbox.checked = false;
                updateSelectedHalls();
            });
            selectedHalls.appendChild(hallTag);
        });
    }

    // Source code generation
    receiveCodeBtn.addEventListener('click', function() {
        if (generatedCode === '') {
            showLoadingPopup();
            generateSourceCodeWithDelay();
        } else {
            // Regenerate code
            showLoadingPopup();
            generateSourceCodeWithDelay();
        }
    });

    function generateSourceCode() {
        // Generate 8-digit code
        generatedCode = '';
        for (let i = 0; i < 8; i++) {
            generatedCode += Math.floor(Math.random() * 10);
        }
        
        sourceCode.textContent = generatedCode;
        sourceCode.classList.add('generated');
        receiveCodeBtn.textContent = 'Tạo lại mã';
        
        // Add animation
        sourceCode.style.opacity = '0';
        setTimeout(() => {
            sourceCode.style.opacity = '1';
        }, 100);
    }

    function generateSourceCodeWithDelay() {
        // Simulate loading time
        setTimeout(() => {
            hideLoadingPopup();
            generateSourceCode();
            showMessage('Mã nguồn đã được tạo thành công!', 'success');
        }, 2000); // 2 seconds loading
    }

    function showLoadingPopup() {
        // Remove existing popup if any
        hideLoadingPopup();
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease-out;
        `;
        
        // Create popup
        const popup = document.createElement('div');
        popup.style.cssText = `
            background: rgba(45, 55, 72, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            animation: popupSlideIn 0.4s ease-out;
        `;
        
        // Create loading content
        popup.innerHTML = `
            <div class="loading-spinner" style="
                width: 50px;
                height: 50px;
                border: 4px solid rgba(66, 153, 225, 0.3);
                border-top: 4px solid #4299e1;
                border-radius: 50%;
                margin: 0 auto 20px auto;
                animation: spin 1s linear infinite;
            "></div>
            <h3 style="
                color: #ffffff;
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
            ">Đang tạo mã nguồn...</h3>
            <p style="
                color: #a0aec0;
                font-size: 14px;
            ">Vui lòng chờ trong giây lát</p>
        `;
        
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        
        // Disable receive button during loading
        receiveCodeBtn.disabled = true;
        receiveCodeBtn.style.opacity = '0.5';
        receiveCodeBtn.style.cursor = 'not-allowed';
    }

    function hideLoadingPopup() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.remove();
                }
            }, 300);
        }
        
        // Re-enable receive button
        receiveCodeBtn.disabled = false;
        receiveCodeBtn.style.opacity = '1';
        receiveCodeBtn.style.cursor = 'pointer';
    }

    // Simplified input formatting to prevent cursor jumping
    let inputTimeout;
    
    verificationInput.addEventListener('input', function(e) {
        // Clear previous timeout
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
        
        // Detect if this is a delete operation
        const isDeleteOperation = e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward';
        
        inputTimeout = setTimeout(() => {
            const currentValue = this.value;
            const cursorPos = this.selectionStart;
            
            // Remove all non-digits and limit to 8
            const digits = currentValue.replace(/\D/g, '').substring(0, 8);
            
            // Create formatted version
            let formatted = digits;
            if (digits.length > 4) {
                formatted = digits.substring(0, 4) + ' ' + digits.substring(4);
            }
            
            // Only update if the formatted version is different
            if (currentValue !== formatted) {
                // Store where we are in terms of digit count
                const digitsBefore = currentValue.substring(0, cursorPos).replace(/\D/g, '').length;
                
                // Update the value
                this.value = formatted;
                
                // Calculate new cursor position
                let newPos;
                if (digitsBefore <= 4) {
                    newPos = digitsBefore;
                } else {
                    // After space: 4 digits + 1 space + remaining digits
                    newPos = 4 + 1 + (digitsBefore - 4);
                }
                
                // Don't move cursor beyond the end
                newPos = Math.min(newPos, formatted.length);
                
                // For delete operations, be more conservative with cursor positioning
                if (isDeleteOperation && newPos > cursorPos) {
                    newPos = Math.min(cursorPos, formatted.length);
                }
                
                this.setSelectionRange(newPos, newPos);
            }
            
            // Check if matches generated code (moved inside timeout)
            const cleanValue = formatted.replace(/\s/g, '');
            
            // Remove existing classes and reset styles
            verificationInput.classList.remove('valid', 'invalid');
            
            // Debug info
            console.log('Generated code:', generatedCode);
            console.log('Clean value:', cleanValue);
            console.log('Clean value length:', cleanValue.length);
            
            if (cleanValue === generatedCode && cleanValue.length === 8) {
                // Mã đúng - Sáng xanh lá
                console.log('Adding valid class');
                verificationInput.classList.add('valid');
                
                // Force inline style để đảm bảo hiệu ứng
                verificationInput.style.borderColor = '#48bb78';
                verificationInput.style.borderWidth = '3px';
                verificationInput.style.boxShadow = '0 0 0 4px rgba(72, 187, 120, 0.2), 0 0 20px rgba(72, 187, 120, 0.4)';
                verificationInput.style.background = 'rgba(72, 187, 120, 0.05)';
                
                confirmBtn.disabled = false;
                
                // Hiệu ứng thành công
                showMessage('✅ Mã xác nhận chính xác!', 'success');
                playSuccessSound();
            } else if (cleanValue.length === 8 && generatedCode !== '') {
                // Mã sai - Sáng đỏ
                console.log('Adding invalid class');
                verificationInput.classList.add('invalid');
                
                // Force inline style để đảm bảo hiệu ứng
                verificationInput.style.borderColor = '#e53e3e';
                verificationInput.style.borderWidth = '3px';
                verificationInput.style.boxShadow = '0 0 0 4px rgba(229, 62, 62, 0.2), 0 0 20px rgba(229, 62, 62, 0.4)';
                verificationInput.style.background = 'rgba(229, 62, 62, 0.05)';
                
                confirmBtn.disabled = true;
                
                // Hiệu ứng lỗi
                showMessage('❌ Mã xác nhận không đúng!', 'error');
                playErrorSound();
            } else {
                // Reset về trạng thái bình thường
                verificationInput.style.borderColor = 'rgba(66, 153, 225, 0.3)';
                verificationInput.style.borderWidth = '2px';
                verificationInput.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                verificationInput.style.background = 'rgba(26, 32, 44, 0.8)';
                confirmBtn.disabled = generatedCode === '' || cleanValue.length !== 8;
            }
        }, delay);
    });

    // Simple immediate validation check
    verificationInput.addEventListener('keyup', function() {
        setTimeout(() => {
            const currentValue = this.value.replace(/\D/g, '');
            console.log('KEYUP CHECK - Generated:', generatedCode, 'Input:', currentValue);
            
            if (currentValue.length === 8 && generatedCode !== '') {
                if (currentValue === generatedCode) {
                    console.log('MATCH! Adding green glow');
                    this.style.borderColor = '#48bb78';
                    this.style.boxShadow = '0 0 20px rgba(72, 187, 120, 0.6)';
                    this.style.background = 'rgba(72, 187, 120, 0.1)';
                    showMessage('✅ Đúng rồi!', 'success');
                } else {
                    console.log('NO MATCH! Adding red glow');
                    this.style.borderColor = '#e53e3e';
                    this.style.boxShadow = '0 0 20px rgba(229, 62, 62, 0.6)';
                    this.style.background = 'rgba(229, 62, 62, 0.1)';
                    showMessage('❌ Sai rồi!', 'error');
                }
            }
        }, 100);
    });

    // Handle keydown with special attention to delete operations
    verificationInput.addEventListener('keydown', function(e) {
        // Handle Delete and Backspace specially to prevent weird behavior
        if (e.key === 'Delete' || e.key === 'Backspace') {
            // Clear any pending timeout to prevent interference
            if (inputTimeout) {
                clearTimeout(inputTimeout);
            }
            return; // Allow the default delete behavior
        }
        
        // Only prevent problematic key combinations
        if (e.altKey && e.key !== 'Backspace' && e.key !== 'Delete') {
            // Block Alt combinations except Backspace/Delete
            if (![8, 46].includes(e.keyCode)) {
                e.preventDefault();
            }
        }
    });

    // Enhanced composition handling for telex
    let isComposing = false;
    
    verificationInput.addEventListener('compositionstart', function() {
        isComposing = true;
        // Clear any pending input timeout during composition
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }
    });
    
    verificationInput.addEventListener('compositionend', function() {
        isComposing = false;
        // Force input processing after composition
        setTimeout(() => {
            this.dispatchEvent(new Event('input', { bubbles: true }));
        }, 50);
    });

    // Handle paste event to ensure only numbers
    verificationInput.addEventListener('paste', function(e) {
        e.preventDefault();
        
        // Get pasted data
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        
        // Extract only numbers
        const numbersOnly = paste.replace(/\D/g, '');
        
        // Limit to 8 characters
        const limitedNumbers = numbersOnly.substring(0, 8);
        
        // Set the value and trigger input event
        this.value = limitedNumbers;
        this.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // Confirm button
    confirmBtn.addEventListener('click', function() {
        executeAccountDeletion();
    });

    // Function to handle account deletion
    function executeAccountDeletion() {
        const cleanCode = verificationInput.value.replace(/\s/g, '');
        
        if (generatedCode === '') {
            showMessage('Vui lòng nhận mã nguồn trước!', 'error');
            return;
        }
        
        if (cleanCode !== generatedCode) {
            showMessage('Mã xác nhận không đúng!', 'error');
            return;
        }

        // Success
        showMessage('Xác nhận thành công! Đang xóa tài khoản...', 'success');
        
        // Simulate processing
        confirmBtn.textContent = 'Đang xóa tài khoản...';
        confirmBtn.disabled = true;
        
        setTimeout(() => {
            // Get current account name to pass to success page
            const urlParams = new URLSearchParams(window.location.search);
            const accountName = urlParams.get('account') || 'default';
            
            // Redirect to success page
            window.location.href = `success.html?account=${encodeURIComponent(accountName)}`;
        }, 2000);
    }    // Back button
    backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key to delete account (only when verification input is focused or form is ready)
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Check if we have a generated code and valid input
            const cleanCode = verificationInput.value.replace(/\s/g, '');
            if (generatedCode !== '' && cleanCode.length === 8) {
                executeAccountDeletion();
            } else if (generatedCode === '') {
                // Focus on receive code button if no code generated yet
                receiveCodeBtn.focus();
                showMessage('Vui lòng nhận mã nguồn trước khi bấm Enter!', 'error');
            } else {
                // Focus on verification input if code exists but input incomplete
                verificationInput.focus();
                showMessage('Vui lòng nhập đầy đủ 8 số mã xác nhận!', 'error');
            }
        }
        
        // Escape key to go back
        if (e.key === 'Escape') {
            backBtn.click();
        }
    });

    // Enter key specifically on verification input
    verificationInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cleanCode = this.value.replace(/\s/g, '');
            
            if (cleanCode.length === 8 && generatedCode !== '') {
                executeAccountDeletion();
            } else if (cleanCode.length < 8) {
                showMessage('Vui lòng nhập đầy đủ 8 số mã xác nhận!', 'error');
            }
        }
    });

    // Utility functions
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        const colors = {
            success: { bg: 'rgba(72, 187, 120, 0.1)', border: 'rgba(72, 187, 120, 0.3)', text: '#48bb78' },
            error: { bg: 'rgba(229, 62, 62, 0.1)', border: 'rgba(229, 62, 62, 0.3)', text: '#e53e3e' }
        };
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type].bg};
            border: 1px solid ${colors[type].border};
            color: ${colors[type].text};
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    messageDiv.remove();
                }, 300);
            }
        }, 3000);
    }

    function resetForm() {
        generatedCode = '';
        sourceCode.textContent = '(chưa nhận)';
        sourceCode.classList.remove('generated');
        receiveCodeBtn.textContent = 'Nhận mã';
        verificationInput.value = '';
        verificationInput.style.borderColor = 'rgba(66, 153, 225, 0.3)';
        confirmBtn.textContent = 'Xóa tài khoản';
        confirmBtn.disabled = false;
    }

    // Audio feedback functions
    function playSuccessSound() {
        try {
            // Tạo âm thanh thành công bằng Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Âm thanh success: C5 -> E5 -> G5
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        } catch (error) {
            console.log('Audio not supported');
        }
    }
    
    function playErrorSound() {
        try {
            // Tạo âm thanh lỗi bằng Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Âm thanh error: Low buzz
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
            
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        @keyframes popupSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .refresh-btn {
            transition: transform 0.3s ease;
        }
        
        .transaction-count {
            transition: transform 0.2s ease;
        }
        
        .source-code {
            transition: opacity 0.2s ease;
        }
    `;
    document.head.appendChild(style);
});
    matrixContainer.className = 'matrix-bg';
    
