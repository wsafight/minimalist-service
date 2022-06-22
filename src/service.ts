import {
    bootstrapApp,
} from "./bootstrap/index";
import { HelloController } from "./controllers/hello";
import { handleErrorMiddleware, handleLogMiddleware, bodyParser } from "./middleware";

bootstrapApp(
    [handleErrorMiddleware, handleLogMiddleware, bodyParser],
    [HelloController],
    { logLevel: 'debug' }
)
