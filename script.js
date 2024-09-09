const imageInput = document.getElementById("image");
const filterInput = document.getElementById("filter");
const applyButton = document.getElementById("applyButton");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const worker = new Worker("worker.js");

let imageData;

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      worker.postMessage(imageData);
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

applyButton.addEventListener("click", () => {
  const filter = filterInput.value;
  worker.postMessage({ imageData, filter });
});

worker.addEventListener("message", (e) => {
  ctx.putImageData(e.data, 0, 0);
});
