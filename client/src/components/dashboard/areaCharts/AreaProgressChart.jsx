import { useRecoilState, useRecoilValue } from "recoil";
import { Colors, Products, salesData } from "../../../Recoil/Data";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useEffect, useState } from "react";

const AreaProgressChart = () => {
  const orders = useRecoilValue(salesData);
  const [products, setProducts] = useRecoilState(Products)
  const [colors, setColors] = useRecoilState(Colors)

  useEffect(() => {
    const renderProducts = () => {
      const productSalesMap = new Map();

      orders&&orders.forEach((order) => {
        const { PRODUCTLINE, SALES } = order;
        if (!productSalesMap.has(PRODUCTLINE)) {
          productSalesMap.set(PRODUCTLINE, 0);
        }
        productSalesMap.set(
          PRODUCTLINE,
          productSalesMap.get(PRODUCTLINE) + SALES
        );
      });

      const sortedProducts = [...productSalesMap.entries()].sort(
        (a, b) => b[1] - a[1]
      );

      const totalSales = sortedProducts.reduce(
        (total, [_, sales]) => total + sales,
        0
      );

      const products = sortedProducts.map(([PRODUCTLINE, sales]) => {
        const percentage = (sales / totalSales) * 100;
        return { PRODUCTLINE, sales, percentage };
      });

      setProducts(products);

      const colors = generateColors(products.length);
      setColors(colors);
    };

    renderProducts();
  }, [orders]);

  return (
    <div className="bg-white p-4 rounded-md shadow-light-shadow1 clear-start text-center">
      <h1 className="text-2xl font-bold mt-5 p-2">Most Sold Items</h1>
      <PieChartComponent outerRadius={150} colors={colors} products={products}/>
    </div>
  );
};

export const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (360 / count) * i;
    const color = `hsl(${hue}, 70%, 50%)`;
    colors.push(color);
  }
  return colors;
};

export default AreaProgressChart;


export const PieChartComponent = ({products,colors,outerRadius})=>{
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${
            payload[0].payload.PRODUCTLINE
          }: ${payload[0].payload.percentage.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };
  return(
    <div className="area-card-chart w-full flex items-center justify-center flex-col">
    <PieChart width={400} height={400}>
      <Pie
        data={products}
        cx={200}
        cy={200}
        innerRadius={80}
        outerRadius={outerRadius}
        paddingAngle={2}
        dataKey="percentage"
        startAngle={-270}
        endAngle={150}
        stroke="none"
      >
        {products.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </div>
  )
}