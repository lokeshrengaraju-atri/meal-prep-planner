import { useEffect, useState } from "react";
import FoodSearch from "./FilterName";
import FilterPopover from "./FilterPopover";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Meal = {
  id: number;
  mealName: string;
  dayOfWeek: string;
  ingredients: string;
  preparedStatus: string;
  instruction: string;
};

const columnHelper = createColumnHelper<Meal>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>ID</span>,
    size: 50,
  }),
  columnHelper.accessor("mealName", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Meal Name</span>,
    size: 250,
  }),
  columnHelper.accessor("dayOfWeek", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Day of the Week</span>,
    size: 150,
  }),
  columnHelper.accessor("ingredients", {
    header: () => <span>Ingredients</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("preparedStatus", {
    header: () => <span>Prepared Status</span>,
    cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor("instruction", {
    header: () => <span>Instruction</span>,
    cell: (info) => <i>{info.getValue()}</i>,
  }),
];

const MealTable = () => {
  const [data, setData] = useState<Meal[]>([]);
  const [filteredData, setFilteredData] = useState<Meal[]>([]);
  // const [columnFilters, setColumnFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState<
    { id: string; value: string }[]
  >([]);

  // ✅ Fetches meal data from JSON Server dynamically
  const fetchUpdatedMeals = () => {
    fetch("http://localhost:5000/meals")
      .then((res) => res.json())
      .then((updatedMeals) => {
        setData(updatedMeals);
        setFilteredData(updatedMeals); // ✅ Ensure filtered meals update too
      })
      .catch((error) => console.error("Error fetching meals:", error));
  };

  useEffect(() => {
    fetchUpdatedMeals(); // ✅ Ensures latest data is loaded
  }, []);

  useEffect(() => {
    const nameFilter =
      columnFilters.find((f) => f.id === "mealName")?.value || "";
    const statusFilter =
      columnFilters.find((f) => f.id === "preparedStatus")?.value || [];

    const newFilteredData = data.filter((meal) => {
      return (
        (!nameFilter ||
          meal.mealName?.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (statusFilter.length === 0 ||
          statusFilter.includes(meal.preparedStatus))
      );
    });

    setFilteredData(newFilteredData); // ✅ Updates filtered and searched meals in one go
  }, [columnFilters, data]); // ✅ Runs whenever filters or data change

  const table = useReactTable({
    data: filteredData, // ✅ Uses filtered meals instead of entire dataset
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { columnFilters },
  });

  return (
    <div className="page-container">
      <div className="table-container">
        <div className="filter-container">
          <FoodSearch
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          <FilterPopover
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </div>

        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={
                  row.original.preparedStatus === "Prepared"
                    ? "prepared"
                    : "not-prepared"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealTable;
