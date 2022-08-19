import { Router } from "utils/utils";
import { fileUploadRoutes } from "./fileUpload";

const apiRoutes = Router();

apiRoutes.get("/", (req, res) => {
  res.json({
    success: true,
    msg: "The API is working successfully.",
    data: {},
  });
});
apiRoutes.use("/upload", fileUploadRoutes);

export { apiRoutes };
