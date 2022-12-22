import { Application, Session, oakCors } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { userMiddleware } from "./middlewares/userMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
app.use(oakCors());  
const session = new Session();
app.use(session.initMiddleware());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(userMiddleware);
app.use(serveStaticMiddleware);
app.use(renderMiddleware);

app.use(router.routes());

export { app };
