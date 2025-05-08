import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditMealModal from "../components/EditMealModal";
import { useMeal } from "../hooks/useMeal";

const EditMealPage: React.FC = () => {
  const { mealId } = useParams<{ mealId: string }>();
  const { data, fetchUpdatedMeals } = useMeal();
  const navigate = useNavigate();

  const meal = data.find((m) => m.id === mealId);

  if (!meal) {
    return <p>Meal not found</p>;
  }

  return (
    <div className="edit-meal-page">
      <EditMealModal
        isOpen={true}
        onClose={() => navigate("/")}
        meal={meal}
        onSave={fetchUpdatedMeals}
      />
    </div>
  );
};

export default EditMealPage;
