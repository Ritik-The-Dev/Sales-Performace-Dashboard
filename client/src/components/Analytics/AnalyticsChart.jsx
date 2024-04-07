import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRecoilValue } from "recoil";
import { DarkMode, salesData, Traffic } from "../../Recoil/Data";


const AnalyticsChart = () => {
  const traffic = useRecoilValue(Traffic)
  const darkMode = useRecoilValue(DarkMode)
  const [ordersData, setOrdersData] = useState([]);

  const formatTooltipValue = (value) => {
    return `${value}`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const setProducts = () => {
    let transformedData = [{}]
      transformedData = traffic
      .slice(0,10).map(({ PRODUCTLINE, percentage, count }) => ({
        month: PRODUCTLINE,
        Countries_Orders: count,
      }));
    setOrdersData(transformedData)
  };

  useEffect(() => {
    setProducts();
  }, [traffic]);

  return (
    <div className={`${darkMode ? 'bg-slate-700 text-white':'bg-white text-black'} p-6 rounded-md shadow-light-shadow1 relative`}>
      <div className="bar-chart-info mb-8">
        <h5 className="text-xl font-bold text-text-color-inverted mb-4">
          Top Countries
        </h5>
        <div className="chart-info-data flex items-center gap-3">
          <div className="text-2xl font-bold text-xl-text-color">
            {ordersData.length}
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
              dataKey="Countries_Orders"
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

export default AnalyticsChart;
