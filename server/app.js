import express from "express";
import bodyParser from "body-parser";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { CONNECTDB } from "./config/db.js";
import morgan from "morgan";
import generalRoutes from "./api/routes/general.js";
import clientRoutes from "./api/routes/client.js";
import salesRoutes from "./api/routes/sales.js";
import managementRoute from "./api/routes/management.js";
// data imports
import User from "./api/models/User.js";
import Product from "./api/models/Product.js";
import ProductStat from "./api/models/ProductStat.js";
import Transaction from "./api/models/Transaction.js";
import OverallStat from "./api/models/OverallStat.js";
import AffiliateStat from "./api/models/AffiliateStat.js";

import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat
} from "./data/index.js";
dotenv.config();
CONNECTDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoute);
/**** Only Add Data One Times ***/
// const user = await User.insertMany(dataUser)
// await Product.insertMany(dataProduct)
// await ProductStat.insertMany(dataProductStat)
//  await Transaction.insertMany(dataTransaction)

// await OverallStat.insertMany(dataOverallStat)

// await AffiliateStat.insertMany(dataAffiliateStat)

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
