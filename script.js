
console.log("JavaScript is working!");

document.addEventListener('DOMContentLoaded', function() {
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
