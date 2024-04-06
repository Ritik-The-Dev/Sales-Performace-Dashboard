import { useRecoilState, useRecoilValue } from "recoil";
import AreaCard from "./AreaCard";
import { Products, salesData, Traffic } from "../../../Recoil/Data";
import { useEffect, useState } from "react";

const AreaCards = () => {
  const orders = useRecoilValue(salesData);
  const products = useRecoilValue(Products);
  const [traffic, setTraffic] = useRecoilState(Traffic);
  const [repeatOrder, setRepeatOrder] = useState(0);

  const getrepeatOrder = () => {
    // Count the number of unique order numbers
    const uniqueOrderNumbers = new Set();
    orders&&orders.forEach((order) => {
      uniqueOrderNumbers.add(order.ORDERNUMBER);
    });
    const totalOrders = orders&&orders.length;
    const uniqueOrderCount = uniqueOrderNumbers.size;

    // Calculate the percentage of repeat orders
    const repeatOrderCount = totalOrders - uniqueOrderCount;
    const percentage = (repeatOrderCount / totalOrders) * 100;
    setRepeatOrder(Math.round(percentage));
  };

  const customerLocation = () => {
    // Count the number of customers in each location
    const locationCounts = {};

    orders&&orders.forEach((order) => {
      const location = order.COUNTRY; // Assuming COUNTRY contains the location name
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    });

    // Calculate the total number of customers
    const totalCustomers = orders&&orders.length;

    // Calculate the percentage of customers in each location
    const locationPercentages = Object.entries(locationCounts).map(
      ([location, count]) => {
        const percentage = (count / totalCustomers) * 100;
        return { location, percentage };
      }
    );

    // Sort locations by percentage in descending order
    locationPercentages.sort((a, b) => b.percentage - a.percentage);
    setTraffic(locationPercentages);
  };

  useEffect(() => {
    getrepeatOrder();
    customerLocation();
  }, [orders]);

  return (
    <section className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 md:gap-10 gap-5 mt-12">
      <AreaCard
        name={"Repeat Orders"}
        blankSpace={"New Orders"}
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={Math.round(repeatOrder)}
        cardInfo={{
          title: "Repeat Orders",
          value: `${Math.round(repeatOrder)}%`,
          text: "Highest Repeat Orders.",
        }}
      />
      {traffic.length > 0 && (
        <AreaCard
          name={"USA"}
          blankSpace={"Others"}
          colors={["#e4e8ef", "#4ce13f"]}
          percentFillValue={Math.round(traffic[0].percentage)}
          cardInfo={{
            title: "Most Traffic",
            value: `${traffic[0].location}`,
            text: "Highest Traffic Location.",
          }}
        />
      )}
      {products.length > 0 && (
        <AreaCard
          name={products[0].PRODUCTLINE}
          blankSpace={"Others"}
          colors={["#e4e8ef", "#f29a2e"]}
          percentFillValue={Math.round(products[0].percentage)}
          cardInfo={{
            title: "Most Selling Product",
            value: `$${Math.round(products[0].sales)}`,
            text: "Available in Stock",
          }}
        />
      )}
    </section>
  );
};

export default AreaCards;
