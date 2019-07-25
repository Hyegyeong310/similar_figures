const imageUpload = document.getElementById('jsImageUpload');
const loaded = document.getElementById('jsLoaded');
const faceLength = document.getElementById('jsFaceLength');
const imageView = document.getElementById('jsImageView');

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start);

async function start() {
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.0003);
  // loaded.innerHTML = '';
  loaded.classList.add('hidden');
  imageUpload.addEventListener('change', async () => {
    const image = await faceapi.bufferToImage(imageUpload.files[0]);
    imageView.innerHTML = '';
    imageView.append(image);
    const canvas = faceapi.createCanvasFromMedia(image);
    imageView.append(canvas);
    const displaySize = { width: image.width, height: image.height };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();
    faceLength.innerHTML = `Face: ${detections.length}`;
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map(d => {
      console.log(d);
      return faceMatcher.findBestMatch(d.descriptor);
    });
    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString()
      });
      drawBox.draw(canvas);
    });
  });
}

function loadLabeledImages() {
  const labels = ['Cat', 'Dog', 'Fox', 'Rabbit'];
  return Promise.all(
    labels.map(async label => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          `https://raw.githubusercontent.com/Hyegyeong310/similar_figures/master/labeled_images/${label}/${i}.jpg`
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detections) {
          descriptions.push(detections.descriptor);
        }
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
