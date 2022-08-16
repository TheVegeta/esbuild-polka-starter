import { Router } from "utils/utils";

const apiRoutes = Router();

apiRoutes.get("/", async (req, res) => {
  return res.json({
    success: true,
    msg: "api started successfully",
    data: {},
  });
});

export { apiRoutes };
