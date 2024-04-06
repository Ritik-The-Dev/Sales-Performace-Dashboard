import { useRecoilState, useRecoilValue } from "recoil";
import AreaTableAction from "./AreaTableAction";
import { RecentOrderList, salesData } from "../../../Recoil/Data";
import { useEffect, useState } from "react";

const TABLE_HEADS = [
  "Products",
  "Order ID",
  "Date",
  "Customer name",
  "Status",
  "Amount",
  "Action",
];

const AreaTable = () => {
  const order = useRecoilValue(salesData);
  const [orders, setOrders] = useRecoilState(RecentOrderList);

  const RecentOrders = () => {
    // Sort orders by order date in descending order
    const sortedOrders = order.slice().sort((a, b) => {
      // Convert date strings to Date objects for comparison
      const dateA = new Date(a.ORDERDATE);
      const dateB = new Date(b.ORDERDATE);
      return dateB - dateA;
    });

    // Filter unique orders by order number
    const uniqueOrdersMap = new Map();
    sortedOrders.forEach((order) => {
      uniqueOrdersMap.set(order.ORDERNUMBER, order);
    });

    // Get the 5 most recent unique orders
    const latestUniqueOrders = Array.from(uniqueOrdersMap.values()).slice(0, 5);
    // Update state with the recent unique orders
    setOrders(latestUniqueOrders);
  };

  useEffect(() => {
    RecentOrders();
  }, [order]);

  return <Tables orders={orders} />;
};

export default AreaTable;

export const Tables = ({ orders ,Pagination}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bg-white rounded-md 0 shadow-md lg:px-3 lg:py-4 md:px-3 md:py-4 px-3 py-3">
      <div className="data-table-info">
        <h4 className="text-2xl text-black mb-4">Latest Orders</h4>
      </div>
      <div className="rounded-md border-2 overflow-x-auto">
        <table className="min-w-[900px] w-full text-black">
          <thead className="text-left text-[1.2rem] bg-blue-100">
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th className="text-center p-3 text-1xl" key={index}>
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((dataItem) => (
              <tr key={dataItem._id}>
                <td className="text-center p-3 text-1xl">
                  {dataItem.PRODUCTLINE}
                </td>
                <td className="text-center p-3 text-1xl">
                  {dataItem.ORDERNUMBER}
                </td>
                <td className="text-center p-3 text-1xl">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="text-center p-3 text-1xl">
                  {dataItem.CUSTOMERNAME}
                </td>
                <td className="text-center p-3 text-1xl">
                  <div className="flex items-center justify-start gap-x-6">
                    <span
                      className={`dt-status-dot w-2 h-2 rounded-full ${
                        dataItem.STATUS.toLowerCase() === "shipped" ? "bg-orange-500" : ""
                      }
                      ${dataItem.STATUS.toLowerCase() === "in process" ? "bg-red-500" : ""}
                      ${dataItem.STATUS.toLowerCase() === "pending" ? "bg-yellow-500" : ""}
                      ${dataItem.STATUS.toLowerCase() === "cancelled" ? "bg-red-500" : ""}
                      ${dataItem.STATUS.toLowerCase() === "resolved" ? "bg-green-500" : ""}
                      ${dataItem.STATUS.toLowerCase() === "disputed" ? "bg-blue-500" : ""}
                      ${dataItem.STATUS.toLowerCase() === "on hold" ? " bg-blue-950" : ""}
                      ${dataItem.STATUS.toLowerCase() === "delivered" ? "bg-green-500" : ""}`}
                    ></span>
                    <span className="capitalize">{dataItem.STATUS}</span>
                  </div>
                </td>
                <td className="text-center p-3 text-1xl">
                  ${dataItem.SALES.toFixed(2)}
                </td>
                <td className="text-center p-3 text-1xl">
                  <AreaTableAction orderDetails={dataItem}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
       {
        Pagination ? <Pagination
        ordersPerPage={ordersPerPage}
        totalOrders={orders.length}
        paginate={paginate}/>  :  <Paginations
        ordersPerPage={ordersPerPage}
        totalOrders={orders.length}
        paginate={paginate}
      /> 
       }
      </div>
    </section>
  );
};


export const Paginations = ({ ordersPerPage, totalOrders, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4 w-full flex justify-center items-center">
      <div
        className=" overflow-x-auto w-[50%] flex items-center justify-center"
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
