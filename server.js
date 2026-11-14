import { app } from "./app.js";
import "dotenv/config";
import { Config } from "./config/index.js";
import { checkENV } from "./utils/index.js";

app.listen(Config.PORT, () => {
  try {
    checkENV(Config);
    console.log(`server is running at http://localhost:${Config.PORT}/`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
});
