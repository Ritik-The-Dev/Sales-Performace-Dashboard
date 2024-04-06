import React, { useEffect, useState } from "react";
import AreaTop from "../dashboard/areaTop/AreaTop";
import {
  generateColors,
  PieChartComponent,
} from "../dashboard/areaCharts/AreaProgressChart";
import { useRecoilState, useRecoilValue } from "recoil";
import { salesData, Traffic } from "../../Recoil/Data";
import AnalyticsChart from "./AnalyticsChart";
import CustomerTables from "./CustomerTable";

function Analytics() {
  const orders = useRecoilValue(salesData);
  const [traffic, setTraffic] = useRecoilState(Traffic);
  const [color, setColors] = useState([]);

  const customerLocation = () => {
    // Count the number of customers in each location
    const locationCounts = {};

    orders.forEach((order) => {
      const location = order.COUNTRY; // Assuming COUNTRY contains the location name
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });

    // Calculate the total number of customers
    const totalCustomers = orders.length;

    // Calculate the percentage of customers in each location
    const locationPercentages = Object.entries(locationCounts).map(
      ([location, count]) => {
        const percentage = (count / totalCustomers) * 100;
        return { PRODUCTLINE: location, percentage, count };
      }
    );

    // Sort locations by percentage in descending order
    locationPercentages.sort((a, b) => b.percentage - a.percentage);
    setTraffic(locationPercentages);

    const colors = generateColors(locationPercentages.length);
    setColors(colors);
  };

  useEffect(() => {
    customerLocation();
  }, []);
  return (
    <div>
      <AreaTop Heading={"Analytics"} />
      {/* Traffic Pie Chart*/}
      <div className="lg:flex-row md:flex-col flex-col flex  items-center justify-center w-full p-2">
        <div className="bg-white lg:w-full md:w-full w-[100vw] lg:mr-10 mr-0">
          <h1 className="text-center mt-5 text-2xl">Traffic Statistics</h1>
          {traffic.length > 0 && (
            <PieChartComponent
              outerRadius={150}
              products={traffic}
              colors={color}
            />
          )}
        </div>
        {/* Traffic bar Chart */}
        <div className="bg-white lg:w-full md:w-full w-[100vw] mt-5">
          <AnalyticsChart />
        </div>
      </div>
      {/* Customer Table */}
      <CustomerTables />
    </div>
  );
}

export default Analytics;
