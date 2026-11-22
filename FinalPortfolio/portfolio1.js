
            document.addEventListener("DOMContentLoaded", () => {
                const background = document.querySelector(".background");
                const particleSources = [
                    document.querySelector(".particle1").src,
                    document.querySelector(".particle2").src
                ];
                const cursor = { x: 0, y: 0 };
                const particles = [];

                for (let i = 0; i < 6; i++) {
                    const particle = document.createElement("img");
                    particle.className = "particle";
                    particle.src = particleSources[Math.floor(Math.random() * particleSources.length)];
                    particle.alt = "";

                    const size = 70 + Math.random() * 40;
                    particle.style.width = `${size}px`;
                    background.appendChild(particle);

                    particles.push({
                        element: particle,
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        vx: (Math.random() - 0.5) * 0.8,
                        vy: (Math.random() - 0.5) * 0.8,
                        size,
                        phase: Math.random() * Math.PI * 2,
                        depth: 4 + Math.random() * 10
                    });
                }

                window.addEventListener("pointermove", (event) => {
                    cursor.x = event.clientX / window.innerWidth - 0.5;
                    cursor.y = event.clientY / window.innerHeight - 0.5;
                    const moveX = cursor.x * 10;
                    const moveY = cursor.y * 10;
                    background.style.setProperty(
                        "--background-transform",
                        `translate(${moveX}px, ${moveY}px)`
                    );
                });

                let time = 0;
                function animate() {
                    time += 0.012;

                    particles.forEach((particle) => {
                        particle.vx *= 0.985;
                        particle.vy *= 0.985;
                        particle.x += particle.vx;
                        particle.y += particle.vy;

                        if (particle.x < -particle.size) particle.x = window.innerWidth;
                        if (particle.x > window.innerWidth) particle.x = -particle.size;
                        if (particle.y < -particle.size) particle.y = window.innerHeight;
                        if (particle.y > window.innerHeight) particle.y = -particle.size;

                        const naturalX = Math.sin(time + particle.phase) * 3;
                        const naturalY = Math.cos(time * 0.8 + particle.phase) * 3;
                        const cursorX = cursor.x * particle.depth;
                        const cursorY = cursor.y * particle.depth;

                        particle.element.style.transform =
                            `translate3d(${particle.x + naturalX + cursorX}px, ${particle.y + naturalY + cursorY}px, 0)`;
                    });

                    requestAnimationFrame(animate);
                }

                animate();
            });