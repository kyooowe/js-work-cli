import mongoose from "mongoose";

interface IProducts {
    _id: mongoose.Types.ObjectId;
    name: string;
    quantity: number;
}

export type { IProducts }