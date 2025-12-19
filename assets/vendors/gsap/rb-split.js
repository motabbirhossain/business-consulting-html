(function ($) {
    "use strict";

    $(window).on("load", function () {
        stackedStickyAllPinned();
        setTimeout(() => {
            bwsplit_title();
            image_animation();
        });
    });

    function bwsplit_title() {
        document.querySelectorAll(".bw-spilt-title-one").forEach((atEl) => {
            const atSplit = new SplitText(atEl, {
                type: "words,chars",
                wordsClass: "word",
                charsClass: "char",
            });

            let atDuration =
                parseFloat(atEl.getAttribute("data-speed")) || 1;
            let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

            if (window.innerWidth <= 768) {
                atDuration = atDuration * 0.3;
            }

            gsap.set(atSplit.words, {
                willChange: "transform",
                perspective: 1000,
                transformStyle: "preserve-3d",
            });

            gsap.set(atSplit.chars, {
                willChange: "transform",
                opacity: 0,
                rotateX: -80,
                transformOrigin: "center center -10px",
            });

            gsap.set(atEl, {
                perspective: 1000,
                transformStyle: "preserve-3d",
            });

            gsap.to(atSplit.chars, {
                scrollTrigger: {
                    trigger: atEl,
                    start: "top 80%",
                },
                opacity: 1,
                rotateX: 0,
                duration: atDuration,
                delay: atDelay,
                ease: "power3.out",
                stagger: {
                    each: 0.05,
                    from: "center",
                    grid: "auto",
                },
            });
        });

        document.querySelectorAll(".bw-spilt-title-two").forEach((twbEl) => {
            twbEl.style.display = "block";

            const twbSplit = new SplitText(twbEl, {
                type: "words",
            });
            const twbWords = twbSplit.words;

            const twbY = parseFloat(twbEl.getAttribute("data-y")) || 20;
            const twbRotation =
                parseFloat(twbEl.getAttribute("data-rotation")) || 0;
            const twbBlur =
                parseFloat(twbEl.getAttribute("data-blur")) || 5;
            const twbDuration =
                parseFloat(twbEl.getAttribute("data-duration")) || 0.75;
            const twbStagger =
                parseFloat(twbEl.getAttribute("data-stagger")) || 0.02;
            const twbOpacity = twbBlur > 0 ? 0 : 1;

            if (twbBlur > 0) {
                twbWords.forEach((twbWord) => {
                    twbWord.style.opacity = 1;
                });
            }

            let atDelay = parseFloat(twbEl.getAttribute("data-delay")) || 0;

            gsap.from(twbWords, {
                y: twbY,
                rotation: twbRotation,
                filter: `blur(${twbBlur}px)`,
                opacity: twbOpacity,
                duration: twbDuration,
                delay: atDelay,
                stagger: twbStagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: twbEl,
                    start: "top 100%",
                    once: true,
                },
            });
        });
    }

    function image_animation() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray(".bw-img-anim-left").forEach((img) => {
            gsap.to(img, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        });
    }

    function stackedStickyAllPinned() {
        gsap.registerPlugin(ScrollTrigger);

        const items = $(".service-area__item");
        const btn = $(".service-area__btn");
        const headerOffset = 50;
        const gap = 50;

        items.each(function (index) {
            const el = this;
            ScrollTrigger.create({
                trigger: el,
                start: "top top+=" + (headerOffset + gap * index),
                endTrigger: btn[0],
                end: "top top",
                pin: true,
                pinSpacing: false,
                onUpdate: self => {
                    const progress = self.progress;

                    items.each(function (i) {
                        if (i <= index) {
                            const scaleValue = 1 - 0.1 * (index - i + 1) * progress;
                            const blurValue = 0 + 3 * (index - i + 1) * progress;

                            gsap.to(items[i], {
                                scale: scaleValue,
                                filter: `blur(${blurValue}px)`,
                                transformOrigin: "top center",
                                overwrite: "auto",
                                duration: 0.2
                            });
                        }
                    });
                }
            });

            $(el).css({
                position: "relative",
                top: gap * index + "px"
            });
        });
    }
    
})(jQuery);