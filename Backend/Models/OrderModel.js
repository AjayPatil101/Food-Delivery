import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: String, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type:Date, default: Date.now() },
    payment:{ type: Boolean, default:false },
    couponCode :{type: String},
    couponAmount :{type: String},
})
const orderModel = mongoose.models.order || mongoose.model("order", OrderSchema);
 
export default orderModel;