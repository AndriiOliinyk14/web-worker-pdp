onmessage = function (event) {
  const { imageData, filter } = event.data;
  const data = imageData.data;

  switch (filter) {
    case "invert":
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      break;

    case "sepia":
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        data[i] = red * 0.393 + green * 0.769 + blue * 0.189;
        data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168;
        data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131;
      }
      break;

    default:
      break;
  }

  postMessage(imageData);
};
