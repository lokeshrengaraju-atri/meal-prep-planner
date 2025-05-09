import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { useEffect, useState } from "react";

type BarDatum = {
  [key: string]: string | number;
};

const transformBarData = (meals: {
  filter: (arg0: { (meal: any): boolean; (meal: any): boolean }) => {
    (): any;
    new (): any;
    length: any;
  };
}) => {
  const preparedCount = meals.filter(
    (meal) => meal.preparedStatus === "Prepared"
  ).length;
  const notPreparedCount = meals.filter(
    (meal) => meal.preparedStatus === "Not Prepared"
  ).length;

  return [
    {
      status: "Prepared",
      count: preparedCount,
    },
    {
      status: "Not Prepared",
      count: notPreparedCount,
    },
  ];
};

const MyResponsiveBar = () => {
  const [data, setData] = useState<BarDatum[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/meals")
      .then((response) => {
        const transformed = transformBarData(response.data);
        setData(transformed);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      style={{ height: 700, width: 700, backgroundColor: "rgb(191, 207, 235)" }}
    >
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="status"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Status",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Count",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [{ on: "hover", style: { itemOpacity: 1 } }],
          },
        ]}
        role="application"
        ariaLabel="Prepared vs Not Prepared Bar Chart"
        barAriaLabel={(e) =>
          `${e.id}: ${e.formattedValue} in status: ${e.indexValue}`
        }
      />
    </div>
  );
};

export default MyResponsiveBar;
