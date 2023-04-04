import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductStatSchema = new Schema({
  productId: String,
  yearlySalesTotal: Number,
  yearlyTotalSoldUnits: Number,
  year: Number,
  monthlyData: [
    {
      month: String,
      totalSales: Number,
      totalUnits: Number,
    },
  ],
dailyData : [
    {
        month : String,
        totalSales : Number,
        totalUnits : Number
    }
]
});

export default model("ProductStat", ProductStatSchema);
