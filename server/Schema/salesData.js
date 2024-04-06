const mongoose = require("mongoose");

const salesData = mongoose.Schema({
  ORDERNUMBER: { type: Number,default: () => Math.floor(Date.now() / 100000) % 100000 },
  QUANTITYORDERED: { type: Number },
  PRICEEACH: { type: Number },
  ORDERLINENUMBER: { type: Number, default: Date.now() },
  SALES: { type: Number },
  ORDERDATE: { type: Date, default: new Date() },
  STATUS: { type: String },
  QTR_ID: { type: Number, default: new Date().getDay() },
  MONTH_ID: { type: Number, default: new Date().getMonth() },
  YEAR_ID: { type: Number, default: new Date().getFullYear() },
  PRODUCTLINE: { type: String },
  MSRP: { type: Number },
  PRODUCTCODE: { type: String },
  CUSTOMERNAME: { type: String },
  PHONE: { type: Number },
  ADDRESSLINE1: { type: String },
  CITY: { type: String },
  STATE: { type: String },
  POSTALCODE: { type: Number },
  COUNTRY: { type: String },
  TERRITORY: { type: String },
  CONTACTLASTNAME: { type: String, default: "No Data" },
  CONTACTFIRSTNAME: { type: String, default: "No Data" },
  DEALSIZE: { type: String },
});

const SalesModal = mongoose.model("salesData", salesData);
module.exports = SalesModal;
