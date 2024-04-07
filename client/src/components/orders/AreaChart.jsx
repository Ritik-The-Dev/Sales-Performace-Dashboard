import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRecoilValue } from "recoil";
import { DarkMode, salesData } from "../../Recoil/Data";

const AreaBarChart = () => {
  const darkMode = useRecoilValue(DarkMode)
  const orders = useRecoilValue(salesData);
  const [ordersData, setOrdersData] = useState([]);

  const formatTooltipValue = (value) => {
    return `${value}`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const setProducts = () => {
    const initialMonthlyOrders = [
      { month: "Jan", Orders: 0 },
      { month: "Feb", Orders: 0 },
      { month: "Mar", Orders: 0 },
      { month: "Apr", Orders: 0 },
      { month: "May", Orders: 0 },
      { month: "Jun", Orders: 0 },
      { month: "Jul", Orders: 0 },
      { month: "Aug", Orders: 0 },
      { month: "Sep", Orders: 0 },
      { month: "Oct", Orders: 0 },
      { month: "Nov", Orders: 0 },
      { month: "Dec", Orders: 0 },
    ];

    // Iterate through orders and update monthly orders data
    orders.forEach((order) => {
      let orderDate;
      if (order.ORDERDATE.includes("/")) {
        // Format is like 12/17/2004 0:00
        orderDate = new Date(order.ORDERDATE);
      } else {
        // Format is like 2003-02-23T18:30:00.000Z
        orderDate = new Date(order.ORDERDATE);
      }
      const monthIndex = orderDate.getMonth(); // Get the month index (0-based)
      initialMonthlyOrders[monthIndex].Orders += 1; // Increment the count of orders for the corresponding month
    });

    setOrdersData(initialMonthlyOrders);
  };

  useEffect(() => {
    setProducts();
  }, [orders]);

  return (
    <div className={`${darkMode ? 'bg-slate-700 text-white':'bg-white text-black'} p-6 rounded-md shadow-light-shadow1`}>
      <div className="bar-chart-info mb-8">
        <h5 className="text-xl font-bold text-text-color-inverted mb-4">
          Total Orders
        </h5>
        <div className="chart-info-data flex items-center gap-3">
          <div className="text-2xl font-bold text-xl-text-color">
            {orders.length}
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            width={500}
            height={200}
            data={ordersData}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 10 }}
              dataKey="month"
              tickSize={0}
              axisLine={false}
              tick={{
                color:'white',
                fill: "#000000",
                fontSize: 14,
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="Orders"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
