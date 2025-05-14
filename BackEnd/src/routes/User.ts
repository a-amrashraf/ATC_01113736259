import { Router } from "express";
import { loginuser, registeruser } from "../controllers/UserController";



const router = Router();


router.post("/register", registeruser)
router.post("/login", loginuser)


export default router;