import { Button, Input, InputGroup } from "reactstrap";

const FoodSearch = ({ columnFilters, setColumnFilters }) => {
  //   const foodName = columnFilters.find((f) => f.id === "mealName")?.value || "";
  const foodName = columnFilters?.find((f) => f.id === "mealName")?.value || "";

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColumnFilters(
      value ? [{ id: "mealName", value }] : [] // Clear filter when input is empty
    );
  };
  const handleReset = () => {
    setColumnFilters([]); // ✅ Clears filters properly
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
