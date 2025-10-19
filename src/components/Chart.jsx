import { ResponsivePie } from "@nivo/pie";

const Chart = ({ data, title }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsivePie
          data={data}
          margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
          innerRadius={0.6}
          padAngle={1}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: "data.color" }}
          borderWidth={0}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#ffffff"
          legends={[
            {
              anchor: "right",
              direction: "column",
              justify: false,
              translateX: 50,
              translateY: 0,
              itemsSpacing: 8,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Chart;
