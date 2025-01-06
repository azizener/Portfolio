import initScrollReveal from "./src/scripts/scrollReveal";
import initTiltEffect from "./src/scripts/tiltAnimation";
import { targetElements, defaultProps } from "./src/data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    
    let currentSlide = 0;
    const totalSlides = slides.length;
  
    // Helper function to update slides
    function updateSlides(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
      });
  
      const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }
  
    // Create pagination dots
    function createDots() {
      slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          currentSlide = index;
          updateSlides(currentSlide);
        });
        dotsContainer.appendChild(dot);
      });
    }
  
    // Navigation buttons
    function goToPreviousSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlides(currentSlide);
    }
  
    function goToNextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlides(currentSlide);
    }
  
    // Event listeners
    prevButton.addEventListener("click", goToPreviousSlide);
    nextButton.addEventListener("click", goToNextSlide);
  
    let TxtRotate = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = false;
    };
    
    TxtRotate.prototype.tick = function () {
      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];
    
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
    
      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
    
      let that = this;
      let delta = 300 - Math.random() * 100;
    
      if (this.isDeleting) {
        delta /= 2;
      }
    
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
    
      setTimeout(function () {
        that.tick();
      }, delta);
    };
    
    window.onload = function () {
      let elements = document.getElementsByClassName("txt-rotate");
      for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute("data-rotate");
        let period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
    };
    
    // Initialize slideshow
    createDots();
    updateSlides(currentSlide);
  });
  