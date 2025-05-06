import { Button, Input, InputGroup } from "reactstrap";

interface FoodSearchProps {
  columnFilters: { id: string; value: string[] }[];
  setColumnFilters: (filters: { id: string; value: string[] }[]) => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({
  columnFilters,
  setColumnFilters,
}) => {
  const foodName = columnFilters?.find((f) => f.id === "mealName")?.value || "";

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColumnFilters(value ? [{ id: "mealName", value: [value] }] : []);
  };
  const handleReset = () => {
    setColumnFilters([]);
  };

  return (
    <div className="search-container">
      <InputGroup className="mb-3" style={{ maxWidth: "300px" }}>
        <Input
          type="text"
          placeholder="Search food by name..."
          value={foodName}
          onChange={onFilterChange}
        />
        <Button color="danger" onClick={handleReset}>
          Reset
        </Button>
      </InputGroup>
    </div>
  );
};

export default FoodSearch;
