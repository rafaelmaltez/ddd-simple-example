import { Hono } from "hono";

import { Login } from "../../application/features/login/login.usecase";
import { UserRepositoryMemory } from "../../persistence/repositories/memory/user.repository.memory";
import { JWTAdapter } from "../../cryptography/jwt/jwt.adapter";
import { Signup } from "../../application/features/signup/signup.usecase";

const userRepository = UserRepositoryMemory.create();
const tokenGenerator = new JWTAdapter();
const login = new Login(userRepository, tokenGenerator);
const signup = new Signup(userRepository, tokenGenerator);

const app = new Hono();

app.post('/login', async (c) => {
    try {
        const body = await c.req.json();
        const token = await login.execute({
          username: body.username,
          password: body.password,
        });
        return c.json(token)        
    } catch (error) {
        c.status(400);
        return c.json({ message: (error as Error).message })
    }
})

app.post("/signup", async (c) => {
   try {
     const body = await c.req.json();
     const token = await signup.execute({
       username: body.username,
       password: body.password,
     });
     return c.json(token);
   } catch (error) {
     c.status(400);
     return c.json({ message: (error as Error).message });
   }
});

export default app