import axios from "axios";
import { useEffect, useState } from "react";

export type Meal = {
  id: string;
  mealName: string;
  dayOfWeek: string;
  ingredients: string;
  preparedStatus: string;
  instruction: string;
};

export const useMeal = () => {
  const [data, setData] = useState<Meal[]>([]);
  const [filteredData, setFilteredData] = useState<Meal[]>([]);
  const [columnFilters, setColumnFilters] = useState<
    { id: string; value: string[] }[]
  >([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

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
          meal.mealName.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (statusFilter.length === 0 ||
          statusFilter.includes(meal.preparedStatus))
      );
    });
    setFilteredData(newFilteredData);
  }, [columnFilters, data]);

  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/meals/${id}`);
      fetchUpdatedMeals();
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleSave = () => {
    setEditModalOpen(false);
    setSelectedMeal(null);
    fetchUpdatedMeals();
  };

  return {
    data,
    filteredData,
    columnFilters,
    setColumnFilters,
    selectedMeal,
    isEditModalOpen,
    setEditModalOpen,
    handleEdit,
    handleDelete,
    handleSave,
    fetchUpdatedMeals,
  };
};
