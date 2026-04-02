document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const content = document.getElementById('content');
    const heartsContainer = document.getElementById('hearts-container');
    const envelope = document.getElementById('envelope');
    const typewriterElement = document.getElementById('typewriter-bday');

    const bdayText = `Mi amor, Diana.

    En este día tan especial quiero agradecerte por permitirme compartir otro momento hermoso a tu lado. Gracias por todo el cariño que me das y por ser esa persona increíble que llegó a mi vida para llenarla de amor, felicidad y tranquilidad. Desde que te conocí, todo es más bonito contigo.

    Eres alguien única, y cada día me haces sentir amado, feliz y completo. Gracias por ser mi compañera, por confiar en mí, por compartir tus sueños y por hacerme sentir tan especial siempre.

    En este nuevo año estoy seguro de que lograrás todo lo que te propongas. No lo dudo ni un segundo, porque eres muy inteligentey fuerte, y me siento muy orgulloso de ti. Sé que alcanzarás tus metas, y quiero que recuerdes que siempre estaré a tu lado apoyándote.

    Te amo mucho, Feliz cumpleaños mi vida .
    `;

    // Floating Hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '&#10084;';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heart.style.opacity = Math.random();
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    setInterval(createHeart, 300);

    // Start Button
    startBtn.addEventListener('click', () => {
        content.classList.remove('hidden');
        startBtn.parentElement.parentElement.style.display = 'none';
        startTypewriter();
    });

    // Typewriter Effect
    function startTypewriter() {
        let i = 0;
        typewriterElement.innerHTML = "";
        function type() {
            if (i < bdayText.length) {
                typewriterElement.innerHTML += bdayText.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    // Envelope Logic
    envelope.addEventListener('click', () => {
        if (envelope.classList.contains('close')) {
            envelope.classList.remove('close');
            envelope.classList.add('open');
        } else {
            envelope.classList.remove('open');
            envelope.classList.add('close');
        }
    });

    // Intersection Observer for Gallery
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.collage-card').forEach(card => {
        observer.observe(card);
    });
});
