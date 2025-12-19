(function ($) {
    "use strict";

    if ($(".wow").length) {
        var wow = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        mobile: true, 
        live: true,
        });
        wow.init();
    }

    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function () {
            let anchor = $(this).find("a");
            if ($(anchor).attr("href") == FileName) {
                $(this).addClass("current");
            }
        });
        selector.children("li").each(function () {
            if ($(this).find(".current").length) {
                $(this).addClass("current");
            }
        });
        if ("" == FileName) {
            selector.find("li").eq(0).addClass("current");
        }
    }

    if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
    }

    if ($(".main-menu").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(".mobile-nav__container");
        mobileNavContainer.innerHTML = navContent;
    }

    if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
            ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
            let self = $(this);
            let toggleBtn = document.createElement("BUTTON");
            toggleBtn.setAttribute("aria-label", "dropdown toggler");
            toggleBtn.innerHTML = "<i class='icon-angle-down'></i>";
            self.append(function () {
                return toggleBtn;
            });
            self.find("button").on("click", function (e) {
                e.preventDefault();
                let self = $(this);
                self.toggleClass("expanded");
                self.parent().toggleClass("expanded");
                self.parent().parent().children("ul").slideToggle();
            });
        });
    }

    if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
            e.preventDefault();
            $(".mobile-nav__wrapper").toggleClass("expanded");
            $("body").toggleClass("locked");
        });
    }

    if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function (e) {
            e.preventDefault();
            $(".search-popup").toggleClass("active");
            $(".mobile-nav__wrapper").removeClass("expanded");
            $("body").toggleClass("locked");
        });
    }

    if ($(".sidebar-nav__toggler").length) {
        $(".sidebar-nav__toggler").on("click", function (e) {
            e.preventDefault();
            $(".main-header-sidebar").toggleClass("isActive");
            $("body").toggleClass("locked");
        });
    }
    if ($(".main-header-sidebar__toggler").length) {
        $(".main-header-sidebar__toggler").on("click", function (e) {
            e.preventDefault();
            $(".main-header-sidebar").removeClass("isActive");
            $("body").toggleClass("locked");
        });
    }

    if ($(".video-popup").length) {
        $(".video-popup").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: true,

            fixedContentPos: false,
        });
    }

    function counterUp() {
        if (!$(".odometer").length) return;

        $(".odometer").each(function () {
            var $this = $(this);

            $this.appear(function () {
            if ($this.hasClass("counted")) return;

            window.odometerOptions = {
                duration: $this.data("duration") || 2000,
                animation: 'count'
            };

            $this.html($this.data("count"));
            $this.addClass("counted");
            });
        });
    }

    function rbSlickInit() {
        let rbslickCarousel = $(".rb-slick__carousel");
        if (rbslickCarousel.length) {
            rbslickCarousel.each(function () {
                let elm = $(this);
                let options = elm.data("slick-options");
                let rbslickCarousel = elm.slick(
                    "object" === typeof options ? options : JSON.parse(options)
                );
            });
        }
    }

    $(document).ready(function () {
        counterUp();
    });

    $(window).on("load", function () {
        rbSlickInit();
    });

})(jQuery);