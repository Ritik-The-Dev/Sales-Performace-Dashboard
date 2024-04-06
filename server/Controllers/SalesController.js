const SalesModal = require("../Schema/salesData");
const mongoose = require("mongoose");

exports.GetSalesData = async (req, res) => {
  try {
    const salesData = await SalesModal.find();
    return res.status(200).json({ success: true, data: salesData });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: `Something Went Wrong  ${err}` });
  }
};

exports.AddSalesData = async (req, res) => {
  try {
    const {
      QUANTITYORDERED,
      STATUS,
      PRICEEACH,
      SALES,
      PRODUCTLINE,
      MSRP,
      DEALSIZE,
      PRODUCTCODE,
      CUSTOMERNAME,
      PHONE,
      ADDRESSLINE1,
      CITY,
      STATE,
      POSTALCODE,
      COUNTRY,
      TERRITORY,
    } = req.body;

    // Check if all required fields are provided
    if (
      !QUANTITYORDERED ||
      !STATUS ||
      !CUSTOMERNAME ||
      !PHONE ||
      !ADDRESSLINE1 ||
      !CITY ||
      !STATE ||
      !POSTALCODE ||
      !COUNTRY ||
      !TERRITORY ||
      !PRICEEACH ||
      !SALES ||
      !PRODUCTLINE ||
      !MSRP ||
      !DEALSIZE ||
      !PRODUCTCODE
    ) {
      return res
        .status(400)
        .json({ msg: "All fields are required", success: false });
    }

    // Create the product information
    await SalesModal.create({
      QUANTITYORDERED,
      STATUS,
      CUSTOMERNAME,
      PHONE,
      ADDRESSLINE1,
      CITY,
      STATE,
      POSTALCODE,
      COUNTRY,
      TERRITORY,
      PRICEEACH,
      SALES,
      PRODUCTLINE,
      MSRP,
      DEALSIZE,
      PRODUCTCODE,
    });

    return res
      .status(200)
      .json({ msg: "Order Created successfully", success: true });
  } catch (err) {
    return res.status(400).json({ msg: `Something Went Wrong  ${err}` });
  }
};

exports.EditSalesData = async (req, res) => {
  try {
    const {
      id,
      QUANTITYORDERED,
      STATUS,
      CUSTOMERNAME,
      PHONE,
      ADDRESSLINE1,
      CITY,
      STATE,
      POSTALCODE,
      COUNTRY,
      TERRITORY,
    } = req.body;

    // Check if all required fields are provided
    if (!id) {
      return res.status(400).json({ msg: "Id is Required", success: false });
    }

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ msg: "Invalid product ID format", success: false });
    }

    // Find the product to be updated
    const productInfo = await SalesModal.findById(id);
    if (!productInfo) {
      return res.status(404).json({ msg: "Product not found", success: false });
    }

    // Update the product information
    await SalesModal.findByIdAndUpdate(id, {
      QUANTITYORDERED,
      STATUS,
      CUSTOMERNAME,
      PHONE,
      ADDRESSLINE1,
      CITY,
      STATE,
      POSTALCODE,
      COUNTRY,
      TERRITORY,
    });

    return res
      .status(200)
      .json({ msg: "Order updated successfully", success: true });
  } catch (err) {
    console.error(`Error updating order: ${err}`);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

exports.DeleteSalesData = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ msg: "Product ID is missing" });
    }
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid product ID format" });
    }
    // Attempt to delete the sales data
    const deletedData = await SalesModal.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ msg: "Sales data not found" });
    }
    return res
      .status(200)
      .json({ msg: "Sales data deleted successfully", success: true });
  } catch (err) {
    console.error(`Error deleting sales data: ${err}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
