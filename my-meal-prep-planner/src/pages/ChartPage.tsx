import React from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const PieChartPage: React.FC = () => {
  return (
    <div
      className="pie-chart-page"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <PieChart />
      <BarChart />
    </div>
  );
};

export default PieChartPage;
