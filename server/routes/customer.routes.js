import express from "express";
import { getCustomer, loginCustomer, registerCustomer, logoutCustomer } from "../controllers/customer.controller.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const customerRouter = express.Router();

customerRouter.get('/',(req,res)=>{
    res.send('Hey, im under the water')
})

customerRouter.post('/register', registerCustomer);

customerRouter.post('/login', loginCustomer)

customerRouter.get('/me', isAuthenticated,getCustomer)

customerRouter.post('/logout', logoutCustomer)

export default customerRouter