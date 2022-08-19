import upload from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import { fileSize, uploadPath } from "utils/constant";
import { randomId, readFile, Router } from "utils/utils";

const fileUploadRoutes = Router();

fileUploadRoutes.get("/:id", async (req, res) => {
  try {
    const { stream, type } = await readFile(req.params.id);

    res.setHeader("content-type", type);
    res.end(stream);
  } catch (err) {
    res.statusCode = StatusCodes.NOT_FOUND;
    return res.json({
      success: false,
      msg: "The request file could not be found on the server.",
      data: {},
    });
  }
});

fileUploadRoutes.use(upload()).post("/", async (req, res) => {
  const fileId = randomId(6);

  if (req.files.img) {
    if (req.files.img.size > fileSize) {
      res.statusCode = StatusCodes.NOT_ACCEPTABLE;
      return res.json({
        success: false,
        msg: "The upload file size limit has been reached.",
        data: {},
      });
    } else {
      req.files.img.mv(uploadPath + "/" + fileId, (err) => {
        if (err) {
          res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
          return res.json({
            success: false,
            msg: "File uploading error on the server",
            data: {},
          });
        } else {
          return res.json({
            success: true,
            msg: "The file was uploaded successfully to the server.",
            data: fileId,
          });
        }
      });
    }
  } else {
    res.statusCode = StatusCodes.NOT_ACCEPTABLE;
    return res.json({
      success: false,
      msg: "Please send the file",
      data: {},
    });
  }
});

export { fileUploadRoutes };
