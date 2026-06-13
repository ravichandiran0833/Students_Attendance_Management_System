import upload from "./upload.js";
export const uploadImage = (req, res, next) => {
  upload.single("profile")(req, res, (err) => {
    if (err) {

      console.log("err:",err);
      

      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size must be less than 2 MB",
        });
      }

      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next();
  });
};
