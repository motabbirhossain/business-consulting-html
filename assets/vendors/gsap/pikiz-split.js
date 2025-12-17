(function ($) {
    "use strict";

    $(window).on("load", function () {
        // bwsplit_text();
        video_image();
        initImageParallax();
        setTimeout(() => {
            image_animation();
            error_animation();
        }, 500);
        setTimeout(() => {
            bwsplit_title();
        });
        if (document.querySelector(".main-footer__big-text")) {
            initFooterBigTextAnim();
            ScrollTrigger.refresh();
        }
    });

    gsap.registerPlugin(
        ScrollTrigger, 
        ScrollSmoother, 
        CustomEase, 
        ScrollToPlugin
    );

    // Split Text
    function bwsplit_text() {
        setTimeout(function () {
            var splitTextElements = $(
                ".sec-title__title, .sec-title__tagline, .page-header__title, .bw-split-in-fade, .bw-split-in-scale"
            );
            if (splitTextElements.length === 0) return;
            gsap.registerPlugin(SplitText);
            splitTextElements.each(function (index, element) {
                var splitElement = new SplitText(element, {
                    type: "chars, words", // "chars, words, lines"
                });

                gsap.set(element, {
                    perspective: 400,
                });

                if ($(element).hasClass("bw-split-in-fade")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        ease: "Back.easeOut",
                    });
                }
                if ($(element).hasClass("bw-split-in-right")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        x: "20",
                        ease: "Back.easeOut",
                    });
                }
                if ($(element).hasClass("bw-split-in-left")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        x: "-20",
                        ease: "Back.easeOut",
                    });
                }
                if ($(element).hasClass("bw-split-in-up")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        y: "80",
                        duration: 0.6,
                        scale: 1,
                        stagger: 0.01,
                        transformOrigin: "0% 50% -50",
                        ease: "Back.back",
                    });
                }
                if ($(element).hasClass("bw-split-in-up-fast")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        y: "-10",
                        duration: 0.4,
                        scale: 1,
                        stagger: 0.01,
                        transformOrigin: "0% 50% -50",
                        ease: "Back.back",
                    });
                }
                if ($(element).hasClass("bw-split-in-down")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        y: "-20",
                        ease: "circ.out",
                    });
                }
                if ($(element).hasClass("bw-split-in-rotate")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        rotateX: "50deg",
                        ease: "circ.out",
                    });
                }
                if ($(element).hasClass("bw-split-in-scale")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        rotateX: "50deg",
                        ease: "circ.out",
                    });
                }
                element.anim = gsap.to(splitElement.chars, {
                    scrollTrigger: {
                        trigger: element,
                        toggleActions: "restart pause resume reverse",
                        start: "top 90%",
                    },
                    x: "0",
                    y: "0",
                    rotateX: "0",
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.02,
                });
            });
        }, 200);
    }

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

    function initFooterBigTextAnim() {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".main-footer__big-text",
                start: "top 80%", 
                toggleActions: "play none none none",
                once: true
            }
        });

        tl.from(".main-footer__big-text", {
            x: 300,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });

        tl.fromTo(
            ".main-footer__big-text span",
            { scaleY: 1 },
            {
                scaleY: 1.6,
                duration: 0.35,
                yoyo: true,
                repeat: 1,
                stagger: 0.12,
                ease: "power2.out"
            },
            "-=0.3"
        );
    }


    function video_image() {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            ease: "none",
        });
        tl.from(".video img", {
            scale: 0.8,
            duration: 1,
            transformOrigin: "center center",
        }).to({}, {
            duration: 1,
        });
        ScrollTrigger.create({
            trigger: ".video",
            start: "center center",
            end: "+=100%",
            pin: true,
            animation: tl,
            scrub: 0.88,
            pinSpacing: false,
        });
    }

    function image_animation() {
        gsap.registerPlugin(ScrollTrigger);

        // Select all elements with `.bw-img-anim-left`
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

        // Select all elements with `.bw-img-anim-right`
        gsap.utils.toArray(".bw-img-anim-right").forEach((img) => {
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

    function error_animation() {
        const bwtl = gsap.timeline({
            delay: 1
        });

        bwtl.from(".error-404__title > span", {
                duration: 1.5,
                y: "-100vh",
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            })
            .from(".error-404__subtitle", {
                duration: 1,
                y: 40,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.3")
            .from(".error-404__shape img", {
                duration: 1,
                x: 40,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.3")
            .from(".error-404__text", {
                duration: 1,
                y: 40,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.6");
    }

    if (document.querySelectorAll(".footer__cta").length > 0) {
        var tl = gsap.timeline({
            ease: "none",
            scrollTrigger: {
                trigger: ".footer__cta",
                pin: true,
                pinSpacing: true,
                scrub: 2,
                start: 'bottom 100%',
                end: "200%",
            }
        });
        tl.to(".footer__cta .footer__cta__bg", {
            scale: "10",
            delay: 0.1,
            ease: "power2.in"
        });
        tl.to(".footer__cta .footer__cta__title", {
            fontSize: "12vw",
            ease: "power2.in"
        }, "<");
        tl.to(".footer__cta .footer__cta__link", {
            fontSize: "2.5vw",
            ease: "power2.in"
        }, "<");
    }

    function initImageParallax() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.img-container').forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;

        gsap.fromTo(img,
            { yPercent: -20 },
            { 
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                scrub: true,
                start: 'top bottom',
                end: 'bottom top'
            }
            }
        );
        });
    }


})(jQuery);