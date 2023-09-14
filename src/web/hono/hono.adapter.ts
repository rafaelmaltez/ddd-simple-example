import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { HttpServer } from "../interfaces/http-server.interface";

export class HonoAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = new Hono();
  }

  on(method: string, url: string, callback: Function): void {
    console.log("method", method)
    console.log("url", url);
    this.app[method](url, async (c: any) => {
      try {
        const body = await c.req.json();
        const result = await callback(null, body);
        c.status(200)
        return c.json(result);
      } catch (error: any) {
        console.log("ciu no catch", error)
        c.status(422)
        return c.json({ message: error.message });
      }
    });
  }

  listen(port: number): void {
    serve({
        fetch: this.app.fetch,
        port: port
    }, (info) => console.log(`Hono: Running on port ${info.port}`))
  }
}
