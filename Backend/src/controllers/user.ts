import { Request, Response } from "express";
import { prisma } from "../connections/client";
import { signToken } from "../utils/jwt";
import bcrypt from "bcrypt";

const sendResponse = (res: Response, status: number, message: string, data?: any) => {
    return res.status(status).json({
        status: status < 400 ? "success" : "error",
        message,
        data
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const { username, fullname, email, password } = req.body;

    // Validasi sederhana (Idealnya pakai Zod Middleware)
    if (!username || !fullname || !email || !password) {
        return sendResponse(res, 400, "Semua field harus diisi");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                full_name: fullname,
                email,
                password: hashedPassword,
            },
        });

        const token = signToken({ id: newUser.id, email: newUser.email });

        return sendResponse(res, 201, "Register berhasil", {
            user_id: newUser.id,
            username: newUser.username,
            fullname: newUser.full_name,
            email: newUser.email,
            token
        });

    } catch (error: any) {
        console.error("ERROR REGISTER:", error);
        
        // P2002 adalah kode error Unique Constraint Prisma (Email/Username duplikat)
        if (error.code === "P2002") {
            return sendResponse(res, 409, "Email atau username sudah digunakan");
        }

        return sendResponse(res, 500, "Terjadi kesalahan pada server");
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendResponse(res, 400, "Email dan password wajib diisi");
    }

    try {
        const user = await prisma.user.findFirst({ where: { email } });

        // Security tip: Jangan spesifik bilang "user tidak ditemukan"
        if (!user) {
            return sendResponse(res, 401, "Email atau password salah");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(res, 401, "Email atau password salah");
        }

        const token = signToken({ id: user.id, email: user.email });

        return sendResponse(res, 200, "Login berhasil", {
            user_id: user.id,
            username: user.username,
            fullname: user.full_name,
            email: user.email,
            token,
        });

    } catch (error) {
        console.error("ERROR LOGIN:", error);
        return sendResponse(res, 500, "Internal server error");
    }
};