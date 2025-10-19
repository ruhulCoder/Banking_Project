import { Card } from "antd";

const Cards = ({
  icon,
  title,
  total,
  amount,
  onClick,
  clickable = false,
}) => {
  const formatAmount = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <Card
      className={`h-full ${
        clickable
          ? "cursor-pointer hover:shadow-lg transition-shadow duration-200"
          : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-gray-600 text-sm font-medium mb-1">{title}</div>
          <div className="text-gray-500 text-xs mb-2">Total {total}</div>
          <div className="text-lg font-semibold text-gray-900">
            ₹ {formatAmount(amount)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Cards;
