import React from "react";

interface FilterNameProps {
  columnFilters: { id: string; value: string[] }[];
  setColumnFilters: React.Dispatch<
    React.SetStateAction<{ id: string; value: string[] }[]>
  >;
}

const FilterName: React.FC<FilterNameProps> = ({
  columnFilters,
  setColumnFilters,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColumnFilters((prevFilters) => {
      const otherFilters = prevFilters.filter(
        (filter) => filter.id !== "mealName"
      );
      return value
        ? [...otherFilters, { id: "mealName", value: [value] }]
        : otherFilters;
    });
  };

  const currentFilter =
    columnFilters.find((filter) => filter.id === "mealName")?.value[0] || "";

  return (
    <input
      type="text"
      placeholder="Filter by name"
      value={currentFilter}
      onChange={handleChange}
    />
  );
};

export default FilterName;
