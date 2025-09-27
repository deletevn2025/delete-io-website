document.addEventListener('DOMContentLoaded', function() {
    const retryBtn = document.getElementById('retryBtn');
    const homeBtn = document.getElementById('homeBtn');

    // Retry button - back to main page (start over)
    retryBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);

        // Redirect back to main page to start over
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 200);
    });

    // Home button - back to main page
    homeBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);

        // Redirect to main page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 200);
    });

    // Add some celebration particles on load
    createCelebrationEffect();

    function createCelebrationEffect() {
        const colors = ['#48bb78', '#4299e1', '#ed8936', '#9f7aea'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createParticle(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 100);
        }
    }

    function createParticle(color) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        const duration = 1000 + Math.random() * 1000;
        
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        particle.animate([
            {
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 1
            },
            {
                transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1)`,
                opacity: 1,
                offset: 0.7
            },
            {
                transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            if (particle.parentNode) {
                particle.remove();
            }
        };
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            retryBtn.click();
        } else if (e.key === 'Escape') {
            homeBtn.click();
        }
    });

    // Auto-focus on retry button for better UX
    setTimeout(() => {
        retryBtn.focus();
    }, 1000);
});