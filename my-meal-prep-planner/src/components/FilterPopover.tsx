import React from "react";

interface FilterPopoverProps {
  columnFilters: { id: string; value: string[] }[];
  setColumnFilters: React.Dispatch<
    React.SetStateAction<{ id: string; value: string[] }[]>
  >;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  columnFilters,
  setColumnFilters,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
   
    setColumnFilters((prevFilters) => {
      const otherFilters = prevFilters.filter(
        (filter) => filter.id !== "preparedStatus"
      );
      const updatedFilters = value
        ? [...otherFilters, { id: "preparedStatus", value: [value] }]
        : otherFilters;
      return updatedFilters;
    });
  };

  const currentFilter =
    columnFilters.find((filter) => filter.id === "preparedStatus")?.value[0] ||
    "";

  return (
    <select value={currentFilter} onChange={handleChange}>
      <option value="">All</option>
      <option value="Prepared">Prepared</option>
      <option value="Not Prepared">Not Prepared</option>
    </select>
  );
};

export default FilterPopover;
