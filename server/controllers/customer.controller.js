import express from "express";
import CustomerModel from "../models/customer.model.js";
import bcrypt from 'bcrypt'
import genToken from "../utils/generateToken.js";

const cookiesOption = {
    httpOnly: true,
    secure: true
}

export const registerCustomer = async (req, res) => {
    try {
        const { fullname, email, password, phone } = req.body;
        if (!phone || !fullname || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 7 character long" })
        }

        const emailExists = await CustomerModel.findOne({ email })

        if (emailExists) {
            return res.status(409).json({ message: "The email already exists, try using another" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)


        const newCustomer = await CustomerModel.create({
            fullname,
            email,
            phone,
            password: hashedPassword
        })

        //tokns
        const jwtToken = genToken(newCustomer._id)

        res.cookie('token', jwtToken, cookiesOption)

        res.status(201).json({
            "success": true,
            message: "Customer registered successfully",
            customer: newCustomer
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error })
    }

}
export const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }
        const customer = await CustomerModel.findOne({ email })
        if (!customer) {
            return res.status(404).json({ message: "Customer not found, please register" })
        }
        const passwordCheck = await bcrypt.compare(password, customer.password)

        if (!passwordCheck) {
            return res.status(400).json({ message: "Wrong Password" })
        }

        const jwtToken = genToken(customer._id);
        res.cookie('token', jwtToken, cookiesOption)

        return res.status(200).json({
            "success": true,
            "message": "Login successful"
        })

    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err })
    }
}
export const getCustomer = async (req, res) => {
    const customer = req.customer
    const obj = customer.toObject();
    delete obj.password
    res.status(200).json({ message: "Customer Authenticated", customerData: obj })
}

export const logoutCustomer = async (req, res) => {
    res.clearCookie("token", cookiesOption);
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
}