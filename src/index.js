import { json } from "@polka/parse";
import { apiRoutes } from "api";
import compression from "compression";
import cors from "cors";
import polka from "polka";
import { handleErr, handleJson } from "utils/utils";

const app = polka();
const port = parseInt(process.env.PORT || 8080);

app.use(cors());
app.use(json());
app.use(handleJson);
app.use(compression());

app.use("/api", apiRoutes);

app.handler = handleErr;
app.listen(port, () => console.log(`Running on ${port}`));
