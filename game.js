document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.scratch-card');

    cards.forEach(card => {
        const canvas = card.querySelector('.scratch-canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const messageDiv = card.querySelector('.love-message');
        const message = card.getAttribute('data-message');
        
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        // Set canvas size to match card size
        canvas.width = card.offsetWidth;
        canvas.height = card.offsetHeight;

        // Fill canvas with "scratchable" layer
        ctx.fillStyle = '#ffccd5'; // Rosa claro
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some decoration to the cover
        ctx.fillStyle = '#ff4b5c';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('♥ Raspa Aquí ♥', canvas.width / 2, canvas.height / 2);

        // Drawing logic
        function scratch(e) {
            if (!isDrawing) return;

            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.lineWidth = 40;
            ctx.lineCap = 'round';
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();

            lastX = x;
            lastY = y;

            checkReveal();
        }

        function checkReveal() {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let transparentPixels = 0;

            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i + 3] < 128) {
                    transparentPixels++;
                }
            }

            const percent = (transparentPixels / (canvas.width * canvas.height)) * 100;

            if (percent > 40 && !card.classList.contains('revealed')) {
                revealCard();
            }
        }

        function revealCard() {
            card.classList.add('revealed');
            canvas.style.transition = 'opacity 1s';
            canvas.style.opacity = '0';
            messageDiv.textContent = message;
            setTimeout(() => {
                canvas.remove();
            }, 1000);
            createConfetti();
        }

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
        });

        canvas.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', () => isDrawing = false);

        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            lastX = e.touches[0].clientX - rect.left;
            lastY = e.touches[0].clientY - rect.top;
            e.preventDefault();
        }, { passive: false });

        canvas.addEventListener('touchmove', scratch, { passive: false });
        window.addEventListener('touchend', () => isDrawing = false);
    });

    function createConfetti() {
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${(Math.random() - 0.5) * 100}px, 100vh, 0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }
});
