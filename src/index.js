import { json } from "@polka/parse";
import { apiRoutes } from "api/index";
import cors from "cors";
import polka from "polka";
import "utils/init";
import { onError, supportJson } from "utils/utils";

const app = polka({ onError });
const port = parseInt(process.env.PORT || 8080);

app.use(json());
app.use(cors());
app.use(supportJson);

app.use("/api", apiRoutes);

app.listen(port, () => console.log(`Running on ${port}`));
