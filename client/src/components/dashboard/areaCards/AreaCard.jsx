import PropTypes from "prop-types";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const AreaCard = ({ blankSpace, name, colors, percentFillValue, cardInfo }) => {
  const filledValue = (percentFillValue / 100) * 360; // 360 degress for a full circle
  const remainedValue = 360 - filledValue;

  const data = [
    { name: blankSpace, value: remainedValue },
    { name: name, value: filledValue },
  ];

  const renderTooltipContent = (value) => {
    return `${(value / 360) * 100} %`;
  };

  return (
    <div className="grid">
      <div className="w-full area-card bg-white flex items-center rounded-lg p-4 justify-between shadow-light-shadow1">
        <div className="area-card-info w-full mr-20">
          <h5 className="info-title text-lg font-bold text-lg-text-color mb-2">
            {cardInfo.title}
          </h5>
          <div className="info-value text-xl font-semibold text-xl-text-color mb-2">
            {cardInfo.value}
          </div>
          <p className="info-text text-base font-medium text-base-text-color">
            {cardInfo.text}
          </p>
        </div>
        <div className="area-card-chart w-full">
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx={50}
              cy={45}
              innerRadius={20}
              fill="#e4e8ef"
              paddingAngle={0}
              dataKey="value"
              startAngle={-270}
              endAngle={150}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={renderTooltipContent} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AreaCard;

AreaCard.propTypes = {
  colors: PropTypes.array.isRequired,
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.object.isRequired,
};
