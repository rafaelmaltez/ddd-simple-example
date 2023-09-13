import { Router } from 'express';
import { Login } from '../../application/features/login/login.usecase';
import { UserRepositoryMemory } from '../../persistence/repositories/memory/user.repository.memory';
import { JWTAdapter } from '../../cryptography/jwt/jwt.adapter';
import { Signup } from '../../application/features/signup/signup.usecase';


const userRepository = new UserRepositoryMemory()
const tokenGenerator = new JWTAdapter()
const login = new Login(userRepository, tokenGenerator);

const signup = new Signup(userRepository, tokenGenerator);
const router = Router();

router.post('/login', async (req, res) => {
    const token = await login.execute({ 
        username: req.body.username,
        password: req.body.password
    })
    if (!token) {
        return res.status(404).json({ message: "Invalid credentials"})
    }
    return res.status(200).json(token);
})

router.post('/signup', async (req, res) => {
    const token = await signup.execute({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(200).json(token);
})

export default router;