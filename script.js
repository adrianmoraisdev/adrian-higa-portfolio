const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

AOS.init({
  duration: 900,
  easing: "ease-out-cubic",
  once: false,
  mirror: true,
  offset: 80,
});

if (window.tsParticles) {
  tsParticles.load({
    id: "tsparticles",
    options: {
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 70, density: { enable: true, area: 900 } },
        color: { value: ["#20e7ff", "#adff3f", "#ffbd55"] },
        shape: { type: "circle" },
        opacity: { value: { min: 0.18, max: 0.55 } },
        size: { value: { min: 1, max: 4 } },
        links: {
          enable: true,
          color: "#20e7ff",
          distance: 150,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: !prefersReducedMotion,
          speed: 0.55,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: !prefersReducedMotion, mode: "grab" },
          onClick: { enable: !prefersReducedMotion, mode: "push" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.4 } },
          push: { quantity: 2 },
        },
      },
    },
  });
}

if (window.gsap && !prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".split-title", {
    y: 42,
    duration: 1.1,
    ease: "power4.out",
    delay: 0.2,
  });

  gsap.from(".holo-card", {
    rotateY: -14,
    rotateX: 8,
    y: 48,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.35,
  });

  gsap.to(".holo-card", {
    y: -22,
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.utils.toArray(".capability-card, .project-card, .impact-tile").forEach((card) => {
    gsap.to(card, {
      y: -12,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 25%",
        scrub: true,
      },
    });
  });

  gsap.to(".quote-line", {
    backgroundPositionX: "0%",
    scrollTrigger: {
      trigger: ".quote-section",
      start: "top 80%",
      end: "bottom 30%",
      scrub: true,
    },
  });
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion || window.innerWidth < 992) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
