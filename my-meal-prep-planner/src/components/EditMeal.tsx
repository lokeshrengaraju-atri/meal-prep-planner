import axios from "axios";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

type Meal = {
  id: number;
  mealName: string;
  dayOfWeek: string;
  ingredients: string;
  preparedStatus: string;
  instruction: string;
};

type EditMealProps = {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal;
  onSave: () => void;
};

const EditMealModal: React.FC<EditMealProps> = ({
  isOpen,
  onClose,
  meal,
  onSave,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Meal>({
    defaultValues: meal, // ✅ Uses meal data as defaults
  });

  useEffect(() => {
    if (meal) {
      Object.keys(meal).forEach((key) => {
        setValue(key as keyof Meal, meal[key as keyof Meal]);
      });
    }
  }, [meal, setValue]);

  const onSubmit: SubmitHandler<Meal> = async (data) => {
    try {
      await axios.put(`http://localhost:5000/meals/${data.id}`, data);
      onSave(); // ✅ Refresh meal list
      onClose(); // ✅ Close modal after saving
    } catch (error) {
      console.error("Failed to update meal:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} toggle={onClose} centered>
      <ModalHeader toggle={onClose}>Edit Meal</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="mealName">Meal Name</Label>
            <Controller
              name="mealName"
              control={control}
              rules={{ required: true, minLength: 2 }}
              render={({ field }) => (
                <Input {...field} id="mealName" invalid={!!errors.mealName} />
              )}
            />
            {errors.mealName && (
              <FormFeedback>Name must be at least 2 characters</FormFeedback>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="dayOfWeek">Day</Label>
            <Controller
              name="dayOfWeek"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} id="dayOfWeek" invalid={!!errors.dayOfWeek} />
              )}
            />
            {errors.dayOfWeek && <FormFeedback>Day is required</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label for="ingredients">Ingredients</Label>
            <Controller
              name="ingredients"
              control={control}
              rules={{ required: true, minLength: 5 }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="ingredients"
                  invalid={!!errors.ingredients}
                />
              )}
            />
            {errors.ingredients && (
              <FormFeedback>Minimum 5 characters required</FormFeedback>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="preparedStatus">Prepared Status</Label>
            <Controller
              name="preparedStatus"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="select"
                  {...field}
                  id="preparedStatus"
                  invalid={!!errors.preparedStatus}
                >
                  <option value="Prepared">Prepared</option>
                  <option value="Not Prepared">Not Prepared</option>
                </Input>
              )}
            />
            {errors.preparedStatus && (
              <FormFeedback>Status is required</FormFeedback>
            )}
          </FormGroup>

          <FormGroup>
            <Label for="instruction">Instructions</Label>
            <Controller
              name="instruction"
              control={control}
              rules={{ required: true, minLength: 5 }}
              render={({ field }) => (
                <Input
                  type="textarea"
                  {...field}
                  id="instruction"
                  invalid={!!errors.instruction}
                />
              )}
            />
            {errors.instruction && (
              <FormFeedback>Minimum 5 characters required</FormFeedback>
            )}
          </FormGroup>

          <ModalFooter>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
            <Button color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditMealModal;
