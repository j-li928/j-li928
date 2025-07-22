
console.log("JavaScript is working!");

// Check if CSS animations are supported and working
function checkAnimationSupport() {
    const testElement = document.createElement('div');
    testElement.style.animation = 'none';
    const animationSupported = testElement.style.animation !== '';
    console.log('CSS Animation supported:', animationSupported);
    return animationSupported;
}

// Check if elements exist and are styled correctly
function debugElements() {
    console.log('=== Debugging Elements ===');
    
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollContent = document.querySelector('.scroll-content');
    const navText = document.querySelector('.nav-text');
    const charactersDiv = document.querySelector('.characters-div');
    const characterTexts = document.querySelectorAll('.character-text');
    
    console.log('Scroll container exists:', !!scrollContainer);
    console.log('Scroll content exists:', !!scrollContent);
    console.log('Nav text exists:', !!navText);
    console.log('Characters div exists:', !!charactersDiv);
    console.log('Character texts count:', characterTexts.length);
    
    if (scrollContent) {
        const computedStyle = window.getComputedStyle(scrollContent);
        console.log('Scroll content width:', scrollContent.offsetWidth);
        console.log('Scroll content animation:', computedStyle.getPropertyValue('animation'));
        console.log('Scroll content transform:', computedStyle.getPropertyValue('transform'));
    }
    
    if (charactersDiv) {
        const computedStyle = window.getComputedStyle(charactersDiv);
        console.log('Characters div display:', computedStyle.getPropertyValue('display'));
        console.log('Characters div flex-direction:', computedStyle.getPropertyValue('flex-direction'));
    }
    
    characterTexts.forEach((text, index) => {
        const computedStyle = window.getComputedStyle(text);
        console.log(`Character ${index + 1} display:`, computedStyle.getPropertyValue('display'));
        console.log(`Character ${index + 1} writing-mode:`, computedStyle.getPropertyValue('writing-mode'));
    });
}

// JavaScript fallback for scrolling animation
function createJSAnimation() {
    const scrollContent = document.querySelector('.scroll-content');
    if (!scrollContent) return;
    
    console.log('Creating JavaScript fallback animation');
    
    let position = 0;
    const speed = 1; // pixels per frame
    const maxPosition = scrollContent.offsetWidth / 2;
    
    function animate() {
        position -= speed;
        if (position <= -maxPosition) {
            position = 0;
        }
        scrollContent.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    
    // Pause on hover
    const container = document.querySelector('.scroll-container');
    let isPaused = false;
    
    container.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    container.addEventListener('mouseleave', () => {
        isPaused = false;
        animate();
    });
    
    animate();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Debug all elements
    debugElements();
    
    // Check if animations are working
    const animationSupported = checkAnimationSupport();
    
    // If CSS animations aren't working, use JavaScript fallback
    if (!animationSupported) {
        createJSAnimation();
    }
    
    // Test the scrolling animation after a delay
    setTimeout(() => {
        const scrollContent = document.querySelector('.scroll-content');
        if (scrollContent) {
            const computedStyle = window.getComputedStyle(scrollContent);
            const animation = computedStyle.getPropertyValue('animation');
            console.log('Animation CSS:', animation);
            
            if (!animation || animation === 'none') {
                console.log('CSS animation not working, using JS fallback');
                createJSAnimation();
            }
        }
    }, 1000);

    const parallaxElement = document.querySelector('.parallax-collage');
    
    if (parallaxElement && window.innerWidth <= 768) {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('https://j-li928.github.io/j-li928/collage.jpg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            z-index: -1;
        `;
        
        parallaxElement.style.position = 'relative';
        parallaxElement.appendChild(backgroundDiv);
        
        parallaxElement.style.backgroundImage = 'none';
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            backgroundDiv.style.transform = `translateY(${rate}px)`;
        });
    }
});
