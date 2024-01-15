import UserController from "./web/controllers/user.controller";
import { HonoAdapter } from "./web/hono/hono.adapter";
import { ExpressAdapter } from "./web/express/express.adapter";

const httpServer = new ExpressAdapter()
// const httpServer = new HonoAdapter()
const userController = new UserController(httpServer)

httpServer.listen(3000)