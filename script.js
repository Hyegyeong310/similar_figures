const imageUpload = document.getElementById('jsImageUpload');
const faceLength = document.getElementById('jsFaceLength');
const imageView = document.getElementById('jsImageView');

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start);

function start() {
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
    faceLength.innerHTML = detections.length;
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    resizedDetections.forEach(detection => {
      const box = detection.detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, { label: 'Face' });
      drawBox.draw(canvas);
    });
  });
}
