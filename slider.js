const slides = document.querySelectorAll(".slide");
const slider_btns = document.querySelector(".slider_btns");

for (let i = 0; i < slides.length; i++) {
  let btn = document.createElement("button");
  btn.classList.add("slider_btn");

  if (i === 0) {
    btn.classList.add("active");
  }

  slider_btns.appendChild(btn);
}

const btns = document.querySelectorAll(".slider_btn");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    btns.forEach(function (elem) {
      elem.classList.remove("active");
    });

    slides.forEach(function (elem) {
      elem.classList.remove("next_slide");
      elem.classList.add("none");
    });

    btns[i].classList.add("active");
    slides[i].classList.add("next_slide");
    slides[i].classList.remove("none");
  });
}
