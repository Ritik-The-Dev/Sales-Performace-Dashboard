const express = require("express");
const SalesRoute = express();
const {
  GetSalesData,
  AddSalesData,
  DeleteSalesData,
  EditSalesData
} = require("../Controllers/SalesController");
const { verifyToken } = require("../config/verifyToken");

SalesRoute.get("/GetSalesData", GetSalesData);
SalesRoute.post("/AddSalesData", verifyToken, AddSalesData);
SalesRoute.put("/EditSalesData", verifyToken, EditSalesData);
SalesRoute.post("/DeleteSalesData", verifyToken, DeleteSalesData);

module.exports = SalesRoute;
