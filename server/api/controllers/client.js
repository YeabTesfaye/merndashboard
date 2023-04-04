import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";
export const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    const productWithStats = await Promise.all(
      product.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    return res.status(200).json(productWithStats);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort should like this {"field" : "userId" , "sort" : "asc"
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formated Sort should look like {userId : -1}
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormated = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormated;
    };
    const sortFormated = Boolean(sort) ? generateSort() : {};
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormated)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    return res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mapedLocations = users.reduce((acc, { country }) => {
      const countryIso3 = getCountryIso3(country);
      if (!acc[countryIso3]) {
        acc[countryIso3] = 0;
      }
      acc[countryIso3] += 1;
      return acc;
    }, {});
    const formattedLocation = Object.entries(mapedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    return res.status(200).json(formattedLocation);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
