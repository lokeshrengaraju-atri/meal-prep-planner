import React from "react";
import FilterName from "../components/FilterName";
import FilterPopover from "../components/FilterPopover";
import MealTable from "../components/MealTable";
import { useMeal } from "../hooks/useMeal";

const HomePage: React.FC = () => {
  const mealContext = useMeal();
  const { columnFilters, setColumnFilters } = mealContext;

  return (
    <div
      className="home-page"
      style={{ backgroundColor: "rgb(179, 214, 179)" }}
    >
      <div
        className="filters d-flex justify-content-between mb-5"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        <FilterName
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <FilterPopover
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
      <MealTable {...mealContext} />
    </div>
  );
};

export default HomePage;
