import axios from "axios"; // Importing axios
import { useEffect, useState } from "react";
import EditMealModal from "./EditMeal";
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

const MealTable = () => {
  const [data, setData] = useState<Meal[]>([]);
  const [filteredData, setFilteredData] = useState<Meal[]>([]);
  const [columnFilters, setColumnFilters] = useState<
    { id: string; value: string[] }[]
  >([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Function to fetch updated meals using axios
  const fetchUpdatedMeals = async () => {
    try {
      const response = await axios.get("http://localhost:5000/meals");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedMeals();
  }, []);

  useEffect(() => {
    const nameFilter =
      columnFilters.find((f) => f.id === "mealName")?.value[0] || "";
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

    setFilteredData(newFilteredData);
  }, [columnFilters, data]);

  const handleEdit = (meal: Meal) => {
    console.log("Edit clicked for ", meal);
    setSelectedMeal(meal);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      // Sending delete request using axios
      await axios.delete(`http://localhost:5000/meals/${id}`);
      fetchUpdatedMeals(); // Refresh the meal list after deletion
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleSave = () => {
    setEditModalOpen(false);
    setSelectedMeal(null);
    fetchUpdatedMeals();
  };

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
    columnHelper.display({
      id: "actions",
      header: () => "Actions",
      cell: ({ row }) => {
        const meal = row.original;
        return (
          <div className="flex gap-2">
            <button className="edit-btn" onClick={() => handleEdit(meal)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(meal.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: filteredData,
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

      {isEditModalOpen && selectedMeal && (
        <EditMealModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          meal={selectedMeal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MealTable;
