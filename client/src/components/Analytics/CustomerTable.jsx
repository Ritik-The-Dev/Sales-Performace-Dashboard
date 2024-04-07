import { useRecoilValue } from "recoil";
import { DarkMode, salesData } from "../../Recoil/Data";
import {Paginations} from '../dashboard/areaTable/AreaTable'
import { useEffect, useState } from "react";

const TABLE_HEADS = [
  "CUSTOMERNAME",
  "PHONE",
  "CITY",
  "POSTALCODE",
  "ADDRESSLINE1",
  "COUNTRY",
  "DEALSIZE",
];

const CustomerTables = () => {
  const order = useRecoilValue(salesData);
  const [customers, setCustomers] = useState([]);

  const getUniqueCustomers = () => {
    const uniqueCustomersMap = {};

    // Iterate through each order to populate unique customers map
    order.forEach((order) => {
      const {
        CUSTOMERNAME,
        PHONE,
        CITY,
        POSTALCODE,
        ADDRESSLINE1,
        COUNTRY,
        DEALSIZE,
        _id,
      } = order;

      if (!uniqueCustomersMap[CUSTOMERNAME]) {
        uniqueCustomersMap[CUSTOMERNAME] = {
          CUSTOMERNAME,
          PHONE,
          CITY,
          POSTALCODE,
          ADDRESSLINE1,
          COUNTRY,
          DEALSIZE,
          _id,
          orders: [order], // Create an array for orders and add the current order
        };
      } else {
        uniqueCustomersMap[CUSTOMERNAME].orders.push(order); // Add the current order to existing customer's orders
      }
    });

    // Convert unique customers map to an array and sort it alphabetically by customer name
    const uniqueCustomersArray = Object.values(uniqueCustomersMap).sort(
      (a, b) => a.CUSTOMERNAME.localeCompare(b.CUSTOMERNAME)
    );

    setCustomers(uniqueCustomersArray);
  };

  useEffect(() => {
    getUniqueCustomers();
  }, [order]);

  return <Tables orders={customers} />;
};

export default CustomerTables;

export const Tables = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const darkMode = useRecoilValue(DarkMode)
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className={`${darkMode ? 'bg-slate-700 text-white':'bg-white text-black'} rounded-md shadow-md lg:px-3 lg:py-4 md:px-3 md:py-4 px-3 py-3 `}>
      <div className="data-table-info">
        <h4 className="text-2xl mb-4">All Customers</h4>
      </div>
      <div className="rounded-md border-2 overflow-x-auto">
        <table className="min-w-[900px] w-full ">
          <thead className="text-left text-[1.2rem] bg-blue-100">
            <tr className="text-black">
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
                  {dataItem.CUSTOMERNAME || "Mock Data"}
                </td>
                <td className="text-center p-3 text-1xl">
                  {dataItem.PHONE || "9999999999"}
                </td>
                <td className="text-center p-3 text-1xl">
                  {dataItem.CITY || "Mock City"}
                </td>
                <td className="text-center p-3 text-1xl">
                  {dataItem.POSTALCODE || "123456"}
                </td>
                <td className="flex items-center justify-center text-center p-3 text-1xl">
                  <div className="flex items-center justify-start gap-x-6">
                    <span className="capitalize">
                      {(dataItem.ADDRESSLINE1 || "Mock Address")
                        .split(" ")
                        .slice(0, 10)
                        .join(" ") +
                        (dataItem.ADDRESSLINE1.split(" ").length > 10
                          ? " ..."
                          : "")}
                    </span>
                  </div>
                </td>
                <td className="text-center p-3 text-1xl">
                  {dataItem.COUNTRY || "India"}
                </td>
                <td className="text-center p-3 text-1xl">
                  {dataItem.DEALSIZE || "Small"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center w-full">
        <Paginations
          ordersPerPage={ordersPerPage}
          totalOrders={orders.length}
          paginate={paginate}
        />
      </div>
    </section>
  );
};