// AOS Animation
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 600,
  easing: "ease-out-cubic",
  once: true,
  offset: 30,
});

window.addEventListener("load", () => {
  AOS.refresh();
});