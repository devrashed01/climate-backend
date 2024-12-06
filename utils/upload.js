const multer = require("multer");
const storage = multer.memoryStorage(); // You can customize the storage as needed
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (adjust as needed)
  },
}); // Create

exports.upload = upload;
