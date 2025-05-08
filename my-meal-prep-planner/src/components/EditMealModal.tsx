import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Meal } from "../hooks/useMeal";

interface EditMealProps {
  meal: Meal;
  onSave: (updatedMeal: Meal) => void;
  onClose: () => void;
  isOpen: boolean;
}

const EditMealModal: React.FC<EditMealProps> = ({ meal, onSave, onClose }) => {
  const [updatedMeal, setUpdatedMeal] = React.useState(meal);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedMeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/meals/${updatedMeal.id}`,
        updatedMeal
      );

      onSave(updatedMeal);
      navigate("/");
    } catch (error) {
      console.error("Failed to update meal:", error);
    }
  };

  return (
    <Container>
      <h1>Edit Meal</h1>
      <Form>
        <FormGroup>
          <Label for="mealName">Meal Name</Label>
          <Input
            id="mealName"
            name="mealName"
            value={updatedMeal.mealName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="dayOfWeek">Day of the Week</Label>
          <Input
            type="select"
            id="dayOfWeek"
            name="dayOfWeek"
            value={updatedMeal.dayOfWeek}
            onChange={handleChange}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="ingredients">Ingredients</Label>
          <Input
            id="ingredients"
            name="ingredients"
            value={updatedMeal.ingredients}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="preparedStatus">Prepared Status</Label>
          <Input
            type="select"
            id="preparedStatus"
            name="preparedStatus"
            value={updatedMeal.preparedStatus}
            onChange={handleChange}
          >
            <option value="Prepared">Prepared</option>
            <option value="Not Prepared">Not Prepared</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="instruction">Instruction</Label>
          <Input
            type="textarea"
            id="instruction"
            name="instruction"
            value={updatedMeal.instruction}
            onChange={handleChange}
          />
        </FormGroup>
        <div className="d-flex justify-content-between">
          <Button color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditMealModal;
