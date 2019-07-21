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

    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();
    faceLength.innerHTML = detections.length;
  });
}
