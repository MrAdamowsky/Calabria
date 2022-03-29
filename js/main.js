class Slider {
    constructor(elemSelector) {
        this.currentSlide = 0; //aktualny slide
        this.sliderSelector = elemSelector; //selektor elementu który zamienimy na slider
        this.elem = null; //tutaj pobierzemy element który zamienimy na slider
        this.slider = null; //tutaj wygenerujemy slider
        this.slides = null; //tutaj pobierzemy slajdy
        this.time = null;
        this.dots = []; //przyciski kropek
        
        this.generateSlider();
        this.changeSlide(this.currentSlide);
    }
    generateSlider() {
        this.slider = document.querySelector(this.sliderSelector);
        this.slider.classList.add("slider");

        const slidesCnt = document.createElement("div");
        slidesCnt.classList.add("slider-slides-cnt");

        this.slides = this.slider.children;

        while (this.slides.length) {
            this.slides[0].classList.add("slider-slide");
            slidesCnt.append(this.slides[0]);
        }

        this.slides = slidesCnt.querySelectorAll(".slider-slide");

        this.slider.append(slidesCnt);

        this.createPagination();
    }

    createPagination() {
        const ulDots = document.createElement("ul");
        ulDots.classList.add("slider-pagination");

        for (let i=0; i<this.slides.length; i++) {

            const li = document.createElement("li");
            li.classList.add("slider-pagination-element");

            const btn = document.createElement("button");
            btn.classList.add("slider-pagination-button");
            btn.type = "button";
            btn.innerText = i+1;
            btn.setAttribute("aria-label", `Ustaw slajd ${i+1}`);

            btn.addEventListener("click", () => this.changeSlide(i));

            li.appendChild(btn);

            ulDots.appendChild(li);
            this.dots.push(li);
        }

        this.slider.appendChild(ulDots);
    }

    changeSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove("slider-slide-active");
            slide.setAttribute("aria-hidden", true);
        });

        this.slides[index].classList.add("slider-slide-active");
        this.slides[index].setAttribute("aria-hidden", false);

        this.dots.forEach(dot => {
            dot.classList.remove("slider-pagination-element-active");
        });
        this.dots[index].classList.add("slider-pagination-element-active");


        this.currentSlide = index;

        clearInterval(this.time);
        this.time = setTimeout(() => this.slideNext(), 6000);
    }

    slidePrev() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        }
        this.changeSlide(this.currentSlide);
    }

    slideNext() {
        this.currentSlide++;
        if (this.currentSlide > this.slides.length - 1) {
            this.currentSlide = 0;
        }
        this.changeSlide(this.currentSlide);
    }
}
const slide = new Slider("#slider1");

// Data w stopce

let today = new Date();
let yr = today.getFullYear();
document.getElementById('year').innerHTML = yr;