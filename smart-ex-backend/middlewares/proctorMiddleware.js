const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');
const tf = require('@tensorflow/tfjs-node');

// Bind Canvas API for face-api
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

exports.detectSuspiciousActivity = async (req, res) => {
  try {
    const { image } = req.body; // Webcam frame sent as base64
    const decodedImage = Buffer.from(image, 'base64');

    const img = new Canvas.Image();
    img.src = decodedImage;

    // Load face detection model
    await faceapi.nets.tinyFaceDetector.loadFromDisk('./models');
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());

    if (detections.length === 0) {
      return res.status(200).json({ suspicious: true, reason: 'No face detected' });
    }

    if (detections.length > 1) {
      return res.status(200).json({ suspicious: true, reason: 'Multiple faces detected' });
    }

    return res.status(200).json({ suspicious: false, reason: 'All clear' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Proctoring system error' });
  }
};
