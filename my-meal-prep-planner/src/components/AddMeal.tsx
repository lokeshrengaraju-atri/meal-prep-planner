import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

type MealFormData = {
  mealName: string;
  dayOfWeek: string;
  ingredients: string;
  preparedStatus: string;
  instruction: string;
};

type AddMealProps = {
  fetchUpdatedMeals?: () => void;
};

const AddMeal: React.FC<AddMealProps> = ({ fetchUpdatedMeals }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MealFormData>({
    defaultValues: {
      mealName: "",
      dayOfWeek: "",
      ingredients: "",
      preparedStatus: "Not Prepared",
      instruction: "",
    },
  });

  const onSubmit: SubmitHandler<MealFormData> = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/meals");
      const meals = await response.json();

      interface Meal {
        id: string;
        mealName: string;
        dayOfWeek: string;
        ingredients: string;
        preparedStatus: string;
        instruction: string;
      }

      const newId =
        meals.length > 0
          ? Math.max(
              ...(meals.map((meal: Meal) => Number(meal.id)) + 1)
            ).toString()
          : "1";

      const mealToSend = { id: newId, ...data };
      console.log("Final Meal Data to Server:", mealToSend);

      await fetch("http://localhost:5000/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mealToSend),
      });

      reset();
      if (fetchUpdatedMeals) {
        fetchUpdatedMeals();
      }
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Add New Meal</h2>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-4 shadow rounded bg-light"
          >
            <FormGroup>
              <Label>Meal Name</Label>
              <Controller
                name="mealName"
                control={control}
                rules={{ required: true, minLength: 2 }}
                render={({ field }) => <Input type="text" {...field} />}
              />
              {errors.mealName && (
                <span className="text-danger">
                  Minimum 2 characters required
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Day of the Week</Label>
              <Controller
                name="dayOfWeek"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input type="select" {...field}>
                    <option value="">Select Day</option>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.dayOfWeek && (
                <span className="text-danger">Please select a valid day</span>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Ingredients</Label>
              <Controller
                name="ingredients"
                control={control}
                rules={{ required: true, minLength: 5 }}
                render={({ field }) => <Input type="text" {...field} />}
              />
              {errors.ingredients && (
                <span className="text-danger">
                  Minimum 5 characters required
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Prepared Status</Label>
              <Controller
                name="preparedStatus"
                control={control}
                render={({ field }) => (
                  <Input type="select" {...field}>
                    <option value="Prepared">Prepared</option>
                    <option value="Not Prepared">Not Prepared</option>
                  </Input>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label>Instruction</Label>
              <Controller
                name="instruction"
                control={control}
                rules={{ required: true, minLength: 5 }}
                render={({ field }) => <Input type="textarea" {...field} />}
              />
              {errors.instruction && (
                <span className="text-danger">
                  Minimum 5 characters required
                </span>
              )}
            </FormGroup>

            <div className="text-center">
              <Button color="primary" type="submit">
                Add Meal
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddMeal;
