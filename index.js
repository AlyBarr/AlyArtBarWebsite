const bootLines = [
  "Initializing alyartbar OS...",
  "Loading modules...",
  "Checking signal from deep space...",
  "Connection established.",
  "",
  "SYSTEM READY.",
  "",
  "Press any key to enter."
];

const bootText = document.getElementById("boot-text");
const inputLine = document.getElementById("input-line");

let index = 0;

function typeLine() {
  if (index < bootLines.length) {
    bootText.innerHTML += bootLines[index] + "\n";
    index++;
    setTimeout(typeLine, 500);
  } else {
    inputLine.classList.remove("hidden");
  }
}

typeLine();

document.addEventListener("keydown", () => {
  window.location.href = "main.html";
});
