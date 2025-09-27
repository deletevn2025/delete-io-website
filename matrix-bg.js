/**
 * Enhanced Matrix Background Effect
 * Creates beautiful animated code rain with multiple character sets and effects
 */

class MatrixBackground {
    constructor() {
        this.matrixContainer = null;
        this.encryptedBg = null;
        this.intervals = [];
        this.isActive = false;
        
        // Character sets for different effects
        this.characterSets = {
            binary: '01010011010010110110100001110101011001110110000101110010011000010110111001100111010101110110111101101110011001110010000001101110011001110111010101111001011001010110111001101000011101100110000101110100011000010110111101101011011010000110111101100001011011100010000001100011011010000111010101110101011011100110011101110100011101010110111100100000011001110110111101110100011000100110000101110100011000010110100001100001011010010111010001110110011000010111010001100001011000010110000101101110011010000110111100100000011011100110011101110101011110010110010101101110011010000110111101100001011100010000011100000001100001110010011001010110111001100111011010000111010101110101',
            hex: '0123456789ABCDEFabcdef',
            crypto: '₿ΞΘΩΨΦΧΥΤΣΡΠΞΝΜΛΚΙΗΖΕΔΓΒΑ♦♣♠♥←↑→↓↔↕⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏',
            security: '🔐🔑🔒🔓🛡️🔏⚠️⚡⭐🌟✨💎🔺🔻◆◇○●◎◉⬟⬠⬡⬢⬣⬤⬥⬦⬧⬨⬩⬪⬫⬬⬭⬮⬯',
            special: 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ∀∂∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑−∓∔∕∖∗∘∙√∛∜∝∞∟∠∡∢∣∤∥∦∧∨∩∪∫∬∭∮∯∰∱∲∳∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅≆≇≈≉≊≋≌≍≎≏≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≠≡≢≣≤≥≦≧≨≩≪≫≬≭≮≯≰≱≲≳≴≵≶≷≸≹≺≻≼≽≾≿⊀⊁⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⊏⊐⊑⊒⊓⊔⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿',
            code: 'function(){}[]();=><+-*/%&|^~!?:;,."\'`\\/@#$',
            japanese: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ'
        };
        
        // Code fragments that occasionally appear
        this.codeFragments = [
            'function encrypt(data) { return btoa(data); }',
            'const hash = sha256(password + salt);',
            'if (authenticated) { grant_access(); }',
            'decrypt(cipher_text, private_key)',
            'verify_signature(message, signature)',
            'generate_token(user_id, expires_in)',
            'validate_input(user_data)',
            'secure_random_bytes(32)',
            'pbkdf2(password, salt, iterations)',
            'aes_encrypt(plaintext, key, iv)',
            'rsa_sign(message, private_key)',
            'hmac_sha256(data, secret)',
            'x509_verify_certificate(cert)',
            'tls_handshake_complete()',
            'oauth2_refresh_token()',
            'jwt_decode_verify(token)'
        ];
    }

    init() {
        if (this.isActive) return;
        
        this.createContainers();
        this.startEffects();
        this.isActive = true;
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => this.cleanup());
    }

    createContainers() {
        // Create encrypted background
        this.encryptedBg = document.createElement('div');
        this.encryptedBg.className = 'encrypted-bg';
        
        // Create matrix container
        this.matrixContainer = document.createElement('div');
        this.matrixContainer.className = 'matrix-bg';
        
        document.body.appendChild(this.encryptedBg);
        document.body.appendChild(this.matrixContainer);
    }

    startEffects() {
        // Start matrix columns (more frequent)
        this.intervals.push(setInterval(() => this.createMatrixColumn(), 150));
        
        // Start particles (more frequent)
        this.intervals.push(setInterval(() => this.createParticle(), 1500));
        
        // Start code fragments
        this.intervals.push(setInterval(() => this.createCodeFragment(), 6000));
        
        // Create initial burst (more columns)
        for (let i = 0; i < 35; i++) {
            setTimeout(() => this.createMatrixColumn(), i * 60);
        }
        
        // Create initial particles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.createParticle(), i * 800);
        }
        
        // Add secondary layer of columns with different timing
        this.intervals.push(setInterval(() => this.createMatrixColumn(), 300));
    }

    createMatrixColumn() {
        if (!this.matrixContainer) return;
        
        const column = document.createElement('div');
        column.className = 'matrix-column';
        
        // Random position
        column.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration (6-20 seconds)
        const duration = Math.random() * 14 + 6;
        column.style.animationDuration = duration + 's';
        
        // Random delay
        column.style.animationDelay = Math.random() * 3 + 's';
        
        // Choose character set and style
        const types = ['binary', 'hex', 'crypto', 'security', 'special', 'code', 'japanese'];
        const weights = [0.35, 0.25, 0.15, 0.10, 0.08, 0.05, 0.02]; // Probability weights
        const type = this.weightedRandom(types, weights);
        column.classList.add(type);
        
        // Generate content (longer columns)
        const charSet = this.characterSets[type];
        let text = '';
        const length = Math.random() * 25 + 12;
        
        for (let i = 0; i < length; i++) {
            const char = charSet[Math.floor(Math.random() * charSet.length)];
            text += char;
            if (type !== 'security' && Math.random() < 0.8) {
                text += '\n';
            } else if (type === 'security' && i % 2 === 0) {
                text += '\n';
            }
        }
        
        column.textContent = text;
        
        // Random opacity (higher values for denser look)
        column.style.opacity = Math.random() * 0.8 + 0.3;
        
        // Add slight random transform
        column.style.transform = `skewX(${Math.random() * 4 - 2}deg)`;
        
        this.matrixContainer.appendChild(column);
        
        // Remove after animation
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, (duration + 3) * 1000);
    }

    createParticle() {
        if (!this.matrixContainer) return;
        
        const particle = document.createElement('div');
        particle.className = 'matrix-particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.bottom = '0px';
        
        // Random animation duration
        const duration = Math.random() * 8 + 5;
        particle.style.animationDuration = duration + 's';
        
        // Random color
        const colors = ['#00ff41', '#4299e1', '#ed8936', '#e53e3e', '#9f7aea'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        this.matrixContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + 1) * 1000);
    }

    createCodeFragment() {
        if (!this.matrixContainer) return;
        
        const fragment = document.createElement('div');
        fragment.className = 'code-fragment';
        
        // Random position
        fragment.style.top = Math.random() * 80 + 10 + '%';
        fragment.style.left = '-200px';
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        fragment.style.animationDuration = duration + 's';
        
        // Random code fragment
        const code = this.codeFragments[Math.floor(Math.random() * this.codeFragments.length)];
        fragment.textContent = code;
        
        this.matrixContainer.appendChild(fragment);
        
        setTimeout(() => {
            if (fragment.parentNode) {
                fragment.parentNode.removeChild(fragment);
            }
        }, (duration + 1) * 1000);
    }

    weightedRandom(items, weights) {
        let totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < items.length; i++) {
            if (random < weights[i]) {
                return items[i];
            }
            random -= weights[i];
        }
        
        return items[0]; // fallback
    }

    cleanup() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        
        if (this.matrixContainer && this.matrixContainer.parentNode) {
            this.matrixContainer.parentNode.removeChild(this.matrixContainer);
        }
        
        if (this.encryptedBg && this.encryptedBg.parentNode) {
            this.encryptedBg.parentNode.removeChild(this.encryptedBg);
        }
        
        this.isActive = false;
    }
}

// Global matrix background instance
window.matrixBackground = new MatrixBackground();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.matrixBackground.init();
    });
} else {
    window.matrixBackground.init();
}