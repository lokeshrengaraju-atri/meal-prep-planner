import axios from "axios";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useMeal } from "../hooks/useMeal";

type Meal = {
  id?: number;
  mealName: string;
  dayOfWeek: string;
  ingredients: string;
  preparedStatus: string;
  instruction: string;
};

const AddMeal: React.FC = () => {
  const { fetchUpdatedMeals } = useMeal();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Meal>({
    defaultValues: {
      mealName: "",
      dayOfWeek: "",
      ingredients: "",
      preparedStatus: "Prepared",
      instruction: "",
    },
  });

  const onSubmit: SubmitHandler<Meal> = async (data) => {
    try {
      const response = await axios.get<Meal[]>("http://localhost:5000/meals");
      const meals = response.data;
      const nextId =
        meals.length > 0
          ? (Math.max(...meals.map((meal) => Number(meal.id))) + 1).toString()
          : "1";
      const newMeal = { id: nextId, ...data };
      await axios.post("http://localhost:5000/meals", newMeal);
      fetchUpdatedMeals();
      reset();
      navigate("/");
    } catch (error) {
      console.error("Failed to add meal:", error);
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container>
      <h1>Add a New Meal</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="mealName">Meal Name</Label>
          <Controller
            name="mealName"
            control={control}
            rules={{
              required: "Meal name is required",
              minLength: 5,
              maxLength: 25,
            }}
            render={({ field }) => (
              <Input id="mealName" {...field} invalid={!!errors.mealName} />
            )}
          />
          {errors.mealName && (
            <FormFeedback>{errors.mealName.message}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="dayOfWeek">Day of the Week</Label>
          <Controller
            name="dayOfWeek"
            control={control}
            rules={{ required: "Day of the week is required" }}
            render={({ field }) => (
              <Input
                type="select" // Change input type to "select"
                id="dayOfWeek"
                {...field}
                invalid={!!errors.dayOfWeek}
              >
                <option value="">Select a day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Input>
            )}
          />
          {errors.dayOfWeek && (
            <FormFeedback>{errors.dayOfWeek.message}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="ingredients">Ingredients</Label>
          <Controller
            name="ingredients"
            control={control}
            rules={{
              required: "Ingredients are required",
              minLength: 5,
              maxLength: 80,
            }}
            render={({ field }) => (
              <Input
                id="ingredients"
                {...field}
                invalid={!!errors.ingredients}
              />
            )}
          />
          {errors.ingredients && (
            <FormFeedback>{errors.ingredients.message}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="preparedStatus">Prepared Status</Label>
          <Controller
            name="preparedStatus"
            control={control}
            rules={{ required: "Prepared status is required" }}
            render={({ field }) => (
              <Input
                type="select"
                id="preparedStatus"
                {...field}
                invalid={!!errors.preparedStatus}
              >
                <option value="Prepared">Prepared</option>
                <option value="Not Prepared">Not Prepared</option>
              </Input>
            )}
          />
          {errors.preparedStatus && (
            <FormFeedback>{errors.preparedStatus.message}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="instruction">Instruction</Label>
          <Controller
            name="instruction"
            control={control}
            rules={{
              required: "Instruction is required",
              minLength: 10,
              maxLength: 100,
            }}
            render={({ field }) => (
              <Input
                type="textarea"
                id="instruction"
                {...field}
                invalid={!!errors.instruction}
              />
            )}
          />
          {errors.instruction && (
            <FormFeedback>{errors.instruction.message}</FormFeedback>
          )}
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button color="primary" type="submit">
            Add Meal
          </Button>
          <Button color="secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddMeal;
