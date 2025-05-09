import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { useEffect, useState } from "react";

interface PieData {
  id: string;
  label: string;
  value: number;
}

const transformData = (meals: any[]) => {
  const dayCounts = meals.reduce((acc, meal) => {
    acc[meal.dayOfWeek] = (acc[meal.dayOfWeek] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(dayCounts).map((day) => ({
    id: day,
    label: day,
    value: dayCounts[day],
  }));
};

const MyResponsivePie = () => {
  const [data, setData] = useState<PieData[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/meals")
      .then((response) => {
        const transformedData: PieData[] = transformData(response.data);
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: 700,
        width: 800,
        backgroundColor: "rgb(232, 184, 184)",
      }}
    >
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Monday",
            },
            id: "dots",
          },
          {
            match: {
              id: "Tuesday",
            },
            id: "dots",
          },
          {
            match: {
              id: "Wednesday",
            },
            id: "dots",
          },
          {
            match: {
              id: "Thursday",
            },
            id: "dots",
          },
          {
            match: {
              id: "Friday",
            },
            id: "dots",
          },
          {
            match: {
              id: "Saturday",
            },
            id: "dots",
          },
          {
            match: {
              id: "Sunday",
            },
            id: "dots",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MyResponsivePie;
