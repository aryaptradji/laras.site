import { ScrollSmoother } from "gsap/ScrollSmoother";

export const scrollToSection = (id) => {
    const smoother = ScrollSmoother.get();
    const el = document.getElementById(id);

    if (smoother && el) {
        smoother.scrollTo(el, true, "top top");
    } else if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.dispatchEvent(new CustomEvent("showNavbar"));
};