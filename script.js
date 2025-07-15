console.log("JavaScript is working!");


document.addEventListener('DOMContentLoaded', function() {
    const img = new Image();
    img.onload = function() {
        console.log('Image loaded successfully:', img.src);
    };
    img.onerror = function() {
        console.error('Failed to load image:', img.src);
        const alternativePaths = [
            './collage.jpg',
            'collage.jpg',
            '/collage.jpg',
            '../collage.jpg'
        ];
        
        for (let i = 0; i < alternativePaths.length; i++) {
            const testImg = new Image();
            testImg.onload = function() {
                console.log('Alternative path worked:', testImg.src);
                document.querySelector('.parallax-collage').style.backgroundImage = `url('${testImg.src}')`;
            };
            testImg.src = alternativePaths[i];
        }
    };
    img.src = 'collage.jpg';
});