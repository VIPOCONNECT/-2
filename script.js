
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("mousemove", e => {
  const layers = document.querySelectorAll('.layer');
  layers.forEach(layer => {
    const speed = layer.getAttribute('data-speed') || 0.05;
    const x = (window.innerWidth / 2 - e.pageX) * speed;
    const y = (window.innerHeight / 2 - e.pageY) * speed;
    layer.style.transform = `translate(${x}px, ${y}px) scale(${layer.classList.contains('layer-back') ? 3 : layer.classList.contains('layer-mid') ? 2 : 1})`;
  });
});

const textArray = [
  "המסע שלך מתחיל כאן",
  "לשנות את הגוף ואת החיים",
  "להרגיש חזק ובריא בכל יום",
  "הבריאות שלך - המשימה שלנו",
  "מגיע לך להצליח!"
];
let textIndex = 0;
const dynamicTextElement = document.getElementById("dynamic-text");

function changeDynamicText() {
  dynamicTextElement.textContent = textArray[textIndex];
  textIndex = (textIndex + 1) % textArray.length;
}

setInterval(changeDynamicText, 4000);
