// Snow Effect Script
class SnowEffect {
    constructor() {
        this.container = document.getElementById('snow-container');
        this.snowflakes = [];
        this.maxSnowflakes = 50;
        this.animationTypes = ['snow-fall-1', 'snow-fall-2', 'snow-fall-3'];
        this.snowflakeSymbols = ['❅', '❆', '✱', '✲', '❊'];
        
        this.init();
    }
    
    init() {
        this.createSnowflakes();
        this.startAnimation();
    }
    
    createSnowflakes() {
        for (let i = 0; i < this.maxSnowflakes; i++) {
            this.createSnowflake();
        }
    }
    
    createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Random snowflake symbol
        const symbol = this.snowflakeSymbols[Math.floor(Math.random() * this.snowflakeSymbols.length)];
        snowflake.textContent = symbol;
        
        // Random properties
        const size = Math.random() * 15 + 10; // 10-25px
        const left = Math.random() * 100; // 0-100%
        const animationDuration = Math.random() * 8 + 8; // 8-16s
        const animationDelay = 2.5; // 0-20s delay
        const animationType = this.animationTypes[Math.floor(Math.random() * this.animationTypes.length)];
        
        // Apply styles
        snowflake.style.left = `${left}%`;
        snowflake.style.fontSize = `${size}px`;
        snowflake.style.animationName = animationType;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationDelay = `${animationDelay}s`;
        
        // Add opacity variation
        snowflake.style.opacity = Math.random() * 0.3 + 0.2; // 0.4-0.5
        
        this.container.appendChild(snowflake);
        this.snowflakes.push({
            element: snowflake,
            duration: animationDuration,
            delay: animationDelay
        });
    }
    
    startAnimation() {
        // Continuously recreate snowflakes to maintain the effect
        setInterval(() => {
            this.recycleSnowflakes();
        }, 1000);
    }
    
    recycleSnowflakes() {
        // Remove old snowflakes and create new ones occasionally
        if (this.snowflakes.length > this.maxSnowflakes * 1.5) {
            const oldFlakes = this.snowflakes.splice(0, 10);
            oldFlakes.forEach(flake => {
                if (flake.element.parentNode) {
                    flake.element.parentNode.removeChild(flake.element);
                }
            });
            
            // Create new snowflakes
            for (let i = 0; i < 10; i++) {
                this.createSnowflake();
            }
        }
    }
}

// Initialize snow effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SnowEffect();
    
    // Add some interactive effects
    addInteractiveEffects();
});

function addInteractiveEffects() {
    // Glow effect on title
    const title = document.querySelector('.main-title');
    if (title) {
        title.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 40px rgba(255, 255, 255, 0.9), 0 0 60px rgba(255, 255, 255, 0.7)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
        });
    }
    
    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.25)';
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add some dynamic snow intensity based on time
function adjustSnowIntensity() {
    const hour = new Date().getHours();
    const snowContainer = document.getElementById('snow-container');
    
    // More snow at night (18-6), less during day
    if (hour >= 18 || hour <= 6) {
        snowContainer.style.opacity = '1';
    } else {
        snowContainer.style.opacity = '0.7';
    }
}

// Call intensity adjustment
adjustSnowIntensity();
setInterval(adjustSnowIntensity, 3600000); // Check every hour