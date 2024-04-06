import React, { useEffect, useState } from "react";
import AreaTop from "../dashboard/areaTop/AreaTop";
import {
  generateColors,
  PieChartComponent,
} from "../dashboard/areaCharts/AreaProgressChart";
import { useRecoilState, useRecoilValue } from "recoil";
import { salesData } from "../../Recoil/Data";
import AreaBarChart from "./AreaChart";
import { Tables } from "../dashboard/areaTable/AreaTable";
import { MdOutlineAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import axios from "axios";
import { AddOrderApi } from "../../assets/Api/Api";
import { getSalesData } from "../../layout/BaseLayout";

function Orders() {
  const [orders, setSalesData] = useRecoilState(salesData);
  const token = useState(localStorage.getItem("token"));
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [color, setColors] = useState([]);
  const [repeatOrder, setRepeatOrder] = useState(0);
  const [NewOrderDetails, setNewOrderDetails] = useState({
    QUANTITYORDERED: 1,
    STATUS: "Pending",
    DEALSIZE: "Small",
    PRICEEACH: undefined,
    PRODUCTLINE: "",
    MSRP: undefined,
    PRODUCTCODE: "",
    CUSTOMERNAME: "",
    PHONE: undefined,
    ADDRESSLINE1: "",
    CITY: "",
    STATE: "",
    POSTALCODE: "",
    COUNTRY: "",
    TERRITORY: "",
  });

  const getrepeatOrder = async () => {
    // Count the number of unique order numbers
    const uniqueOrderNumbers = new Set();
    orders.forEach((order) => {
      uniqueOrderNumbers.add(order.ORDERNUMBER);
    });
    const totalOrders = orders.length;
    const uniqueOrderCount = uniqueOrderNumbers.size;

    // Calculate the percentage of repeat orders
    const repeatOrderCount = totalOrders - uniqueOrderCount;
    const percentage = (repeatOrderCount / totalOrders) * 100;
    setRepeatOrder([
      { PRODUCTLINE: "New Orders", percentage: 100 - Math.round(percentage) },
      { PRODUCTLINE: "Repeated Orders", percentage: Math.round(percentage) },
    ]);

    const colors = await generateColors(2);
    setColors(colors);
  };

  const PlaceOrder = async () => {
    // calculate total = SALES and add as SALES
    if (!token[0]) {
      setShowNewOrder(false);
      return alert("Login to Perform this Action");
    } else {
      try {
        const SALES = Math.round(
          NewOrderDetails.QUANTITYORDERED * NewOrderDetails.PRICEEACH
        );
        const { data } = await axios.post(
          AddOrderApi,
          {
            QUANTITYORDERED: NewOrderDetails.QUANTITYORDERED,
            DEALSIZE: NewOrderDetails.DEALSIZE,
            PRICEEACH: NewOrderDetails.PRICEEACH,
            PRODUCTLINE: NewOrderDetails.PRODUCTLINE,
            MSRP: NewOrderDetails.MSRP,
            PRODUCTCODE: NewOrderDetails.PRODUCTCODE,
            STATUS: NewOrderDetails.STATUS,
            CUSTOMERNAME: NewOrderDetails.CUSTOMERNAME,
            PHONE: NewOrderDetails.PHONE,
            ADDRESSLINE1: NewOrderDetails.ADDRESSLINE1,
            CITY: NewOrderDetails.CITY,
            STATE: NewOrderDetails.STATE,
            POSTALCODE: NewOrderDetails.POSTALCODE,
            COUNTRY: NewOrderDetails.COUNTRY,
            TERRITORY: NewOrderDetails.TERRITORY,
            SALES,
          },
          {
            headers: {
              Authorization: `Bearer ${token[0]}`,
            },
          }
        );
        if (data.success) {
          alert("Order Placed Successfully");
          setShowNewOrder(false);
          const data = await getSalesData();
          setSalesData(data);
        } else {
          alert("Error Occurred! Please Try Again Later");
          console.log(data);
        }
      } catch (err) {
        console.log("Something Went Wrong", err);
      }
    }
  };

  useEffect(() => {
    getrepeatOrder();
  }, []);
  return (
    <div>
      <AreaTop Heading={"Orders"} />
      <h1 className="flex text-right items-end justify-end">
        <button
          onClick={() =>  {!token[0] ? alert('Login to Perform this Action') :  setShowNewOrder(true)}}
          className="bg-blue-500 p-2 text-white border-2 rounded-lg"
        >
          Add New Orders
        </button>
      </h1>
      {showNewOrder && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-30 bg-gray-400 bg-opacity-50">
          <form
            className="bg-white lg:min-w-[40vw] lg:max-h-[80vh] md:max-h-[80vh] max-h-full overflow-y-auto md:min-w-[50vw] min-w-full flex flex-col p-8 rounded-lg shadow-lg"
            style={{
              scrollbarColor: "transparent transparent",
              scrollbarWidth: "thin",
            }}
          >
            <label className="text-2xl mb-1 p-2" htmlFor="OrderStatus">
              Edit Order Details
            </label>
            <label className="text-1xl p-2" htmlFor="OrderStatus">
              Order Status
            </label>
            <select
              className="p-2 mb-2 border-2 border-black outline-none"
              id="OrderStatus"
              value={NewOrderDetails.STATUS}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  STATUS: e.target.value,
                })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <label className="text-1xl p-2" htmlFor="DealSize">
              Deal Size
            </label>
            <select
              className="p-2 mb-2 border-2 border-black outline-none"
              id="DealSize"
              value={NewOrderDetails.DEALSIZE}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  DEALSIZE: e.target.value,
                })
              }
            >
              <option value="Big">Big</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
            </select>
            <label className="text-1xl p-2" htmlFor="PRODUCTLINE">
              Product Line
            </label>
            <select
              className="p-2 mb-5 border-2 border-black outline-none"
              id="PRODUCTLINE"
              value={NewOrderDetails.PRODUCTLINE}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  PRODUCTLINE: e.target.value,
                })
              }
            >
              <option value="Planes">Classic Cars</option>
              <option value="Vintage Cars">Vintage Cars</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Trucks and Buses">Trucks and Buses</option>
              <option value="Planes">Planes</option>
              <option value="Ships">Ships</option>
              <option value="Trains">Trains</option>
            </select>
            <div className="flex mb-5 items-center justify-between">
              <label htmlFor="Quantity">Quantity</label>
              <br />
              <div className="flex items-center">
                <button
                  type="button"
                  className="px-2 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 mr-2"
                  onClick={() =>
                    setNewOrderDetails({
                      ...NewOrderDetails,
                      QUANTITYORDERED: NewOrderDetails.QUANTITYORDERED + 1,
                    })
                  }
                >
                  <MdOutlineAdd />
                </button>
                <span>{NewOrderDetails.QUANTITYORDERED}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 ml-2"
                  onClick={() =>
                    setNewOrderDetails({
                      ...NewOrderDetails,
                      QUANTITYORDERED: NewOrderDetails.QUANTITYORDERED - 1,
                    })
                  }
                >
                  <FaMinus />
                </button>
              </div>
            </div>
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="text"
              placeholder="CUSTOMERNAME"
              value={NewOrderDetails.CUSTOMERNAME}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  CUSTOMERNAME: e.target.value,
                })
              }
            />
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="number"
              placeholder="PRICEEACH"
              value={NewOrderDetails.PRICEEACH}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  PRICEEACH: e.target.value,
                })
              }
            />{" "}
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="number"
              placeholder="MSRP"
              value={NewOrderDetails.MSRP}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  MSRP: e.target.value,
                })
              }
            />{" "}
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="text"
              placeholder="PRODUCTCODE"
              value={NewOrderDetails.PRODUCTCODE}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  PRODUCTCODE: e.target.value,
                })
              }
            />
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="number"
              placeholder="PHONE"
              value={NewOrderDetails.PHONE}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  PHONE: e.target.value,
                })
              }
            />
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="text"
              placeholder="ADDRESSLINE1"
              value={NewOrderDetails.ADDRESSLINE1}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  ADDRESSLINE1: e.target.value,
                })
              }
            />
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="text"
              placeholder="CITY"
              value={NewOrderDetails.CITY}
              onChange={(e) =>
                setNewOrderDetails({ ...NewOrderDetails, CITY: e.target.value })
              }
            />
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="text"
              placeholder="STATE"
              value={NewOrderDetails.STATE}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  STATE: e.target.value,
                })
              }
            />
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="number"
              placeholder="POSTALCODE"
              value={NewOrderDetails.POSTALCODE}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  POSTALCODE: e.target.value,
                })
              }
            />
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="text"
              placeholder="COUNTRY"
              value={NewOrderDetails.COUNTRY}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  COUNTRY: e.target.value,
                })
              }
            />
            <input
              className="p-2 w-full mb-5 border-2  outline-none"
              type="text"
              placeholder="TERRITORY"
              value={NewOrderDetails.TERRITORY}
              onChange={(e) =>
                setNewOrderDetails({
                  ...NewOrderDetails,
                  TERRITORY: e.target.value,
                })
              }
            />
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600"
                onClick={PlaceOrder}
              >
                Place Order
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setShowNewOrder(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Orders Pie Chart*/}
      <div className="flex lg:flex-row md:flex-col flex-col items-center justify-center w-full p-2">
        <div className="bg-white lg:w-full md:w-full w-[100vw] lg:mr-10 mr-0">
          <h1 className="text-center mt-5 text-2xl">Order Statistics</h1>
          {repeatOrder.length > 0 && (
            <PieChartComponent
              outerRadius={150}
              products={repeatOrder}
              colors={color}
            />
          )}
        </div>
        {/* Orders bar Chart */}
        <div className="bg-white w-full mt-5 mb-2">
          <AreaBarChart />
        </div>
      </div>
      {/*  Order Table */}
      <Tables orders={orders} Pagination={Pagination} />
    </div>
  );
}

export default Orders;

export const Pagination = ({ ordersPerPage, totalOrders, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4 w-full flex justify-center items-center">
      <div
        className=" overflow-x-auto w-[50%]"
        style={{ scrollbarWidth: "thin" }}
      >
        <ul className="flex space-x-2">
          {pageNumbers.map((number, index) => (
            <button
              key={index}
              onClick={() => paginate(number)}
              className="px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {number}
            </button>
          ))}
        </ul>
      </div>
    </nav>
  );
};
