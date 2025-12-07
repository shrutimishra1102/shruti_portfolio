(function(){
  emailjs.init("KBkEl5ByF4hCC3-gi"); 
})();

document.getElementById("field").addEventListener("submit", function(e){
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const subject = this.subject.value.trim();
  const message = this.message.value.trim();

  if(!name || !email || !subject || !message){
    alert("Please fill in all fields before sending!");
    return;
  }
  emailjs.sendForm("service_msrlivg", "template_3m4489n", this)
    .then(function() {
      alert("Message sent successfully!");
      document.getElementById("field").reset();
    }, function(error) {
      alert("Failed to send message. Please try again!");
      console.log(error);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Cursor background
    const cursor = document.querySelector("#circl");
    document.addEventListener("mousemove", function(event){
        cursor.style.left = event.pageX + "px";
        cursor.style.top = event.pageY + "px";
    });

    // Particle animation for each section with .background-container class
    document.querySelectorAll(".background-container").forEach(section => {
        const canvas = section.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        
        let particlesArray = [];
        const numberOfParticles = 100;
        const maxDistance = 100;

        function setCanvasSize() {
            canvas.width = section.clientWidth;
            canvas.height = section.clientHeight;
        }
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < maxDistance) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / maxDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            connect();
        }

        init();
        animate();
    });
});