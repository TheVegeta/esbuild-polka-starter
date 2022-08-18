import { Router } from "utils/utils";

const apiRoutes = Router();

apiRoutes.get("/", (req, res) => {
  res.json({
    success: true,
    msg: "The API is working successfully.",
    data: {},
  });
});

export { apiRoutes };
