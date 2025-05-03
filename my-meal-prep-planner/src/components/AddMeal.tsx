import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

type MealFormData = {
  mealName: string;
  dayOfWeek: string;
  ingredients: string;
  preparedStatus: string;
  instruction: string;
};

type AddMealProps = {
  fetchUpdatedMeals: () => void; // ✅ Function to update meal list dynamically
};

const AddMeal: React.FC<AddMealProps> = ({ fetchUpdatedMeals }) => {
  const { register, handleSubmit, reset } = useForm<MealFormData>();

  const onSubmit: SubmitHandler<MealFormData> = (data) => {
    fetch("http://localhost:5000/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Date.now(), ...data }), // ✅ Generates unique ID
    })
      .then(() => {
        reset(); // ✅ Clears form after submission
        fetchUpdatedMeals(); // ✅ Refreshes meal table after addition
      })
      .catch((error) => console.error("Error adding meal:", error));
  };

  return (
    <div className="add-meal-container">
      <h2>Add New Meal</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Meal Name</Label>
          <Input type="text" {...register("mealName")} required />
        </FormGroup>

        <FormGroup>
          <Label>Day of the Week</Label>
          <Input type="text" {...register("dayOfWeek")} required />
        </FormGroup>

        <FormGroup>
          <Label>Ingredients</Label>
          <Input type="text" {...register("ingredients")} required />
        </FormGroup>

        <FormGroup>
          <Label>Prepared Status</Label>
          <Input type="select" {...register("preparedStatus")} required>
            <option value="Prepared">Prepared</option>
            <option value="Not Prepared">Not Prepared</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Instruction</Label>
          <Input type="textarea" {...register("instruction")} required />
        </FormGroup>

        <Button color="primary" type="submit">
          Add Meal
        </Button>
      </Form>
    </div>
  );
};

export default AddMeal;
