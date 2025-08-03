//your code here
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedImgs = [];
let selectedElems = [];

const heading = document.getElementById("h");
const container = document.getElementById("container");
const para = document.getElementById("para");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadImages() {
  container.innerHTML = '';
  selectedImgs = [];
  selectedElems = [];
  para.innerText = '';
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
  heading.innerText = "Please click on the identical tiles to verify that you are not a robot.";

  // Create 5 unique images + 1 duplicate
  const images = [...imageClasses];
  const duplicate = images[Math.floor(Math.random() * images.length)];
  images.push(duplicate);
  shuffleArray(images);

  images.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.className = imgClass;
    img.addEventListener("click", () => handleClick(img, imgClass));
    container.appendChild(img);
  });
}

function handleClick(img, className) {
  if (selectedImgs.length >= 2 || selectedElems.includes(img)) return;

  img.classList.add('selected');
  selectedImgs.push(className);
  selectedElems.push(img);
  resetBtn.style.display = 'inline-block';

  if (selectedImgs.length === 2) {
    verifyBtn.style.display = 'inline-block';
  }
}

resetBtn.addEventListener("click", () => {
  selectedImgs = [];
  selectedElems.forEach(img => img.classList.remove('selected'));
  selectedElems = [];
  para.innerText = '';
  heading.innerText = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = 'none';
  verifyBtn.style.display = 'none';
});

verifyBtn.addEventListener("click", () => {
  if (selectedImgs[0] === selectedImgs[1]) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyBtn.style.display = 'none';
});

// Load images on page load
window.onload = loadImages;
