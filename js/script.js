const dynamicText = document.getElementById('dynamicText');
const circles = document.querySelectorAll('.circle');
let timeoutId; // To manage the delay

circles.forEach(circle => {
    circle.addEventListener('mouseover', () => {
        clearTimeout(timeoutId); // Clear any existing timeout
        timeoutId = setTimeout(() => {
            dynamicText.textContent = circle.getAttribute('data-name');
        }, 300); // Delay in milliseconds
    });

    circle.addEventListener('mouseout', () => {
        clearTimeout(timeoutId); // Clear timeout to avoid conflict
        timeoutId = setTimeout(() => {
            dynamicText.textContent = "TOP XYZ";
        }, 20); // Delay in milliseconds
    });
});




const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["unique platform", "innovative approach", "services"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    
    // If the current text is the one you want to style differently
    if (textArray[textArrayIndex] === "innovative approach") {
      typedTextSpan.innerHTML += `<span class="colored-text">${textArray[textArrayIndex].charAt(charIndex)}</span>`;
    } else {
      typedTextSpan.innerHTML += textArray[textArrayIndex].charAt(charIndex);
    }
    
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    
    // Check if the last character is part of a colored span
    const currentText = typedTextSpan.innerHTML;
    const lastChar = currentText.charAt(currentText.length - 1);

    // If it's the colored text, erase the entire span
    if (lastChar === '>') {
      let endIdx = currentText.lastIndexOf('</span>');
      let startIdx = currentText.lastIndexOf('<span class="colored-text">');
      typedTextSpan.innerHTML = currentText.substring(0, startIdx) + currentText.substring(endIdx + 7);
    } else {
      typedTextSpan.innerHTML = currentText.substring(0, currentText.length - 1);
    }

    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
