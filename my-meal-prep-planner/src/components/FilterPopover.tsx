import { useEffect, useState } from "react";
import { Button, Popover, PopoverBody } from "reactstrap";

interface FilterPopoverProps {
  columnFilters: { id: string; value: string[] }[];
  setColumnFilters: React.Dispatch<
    React.SetStateAction<{ id: string; value: string[] }[]>
  >;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  columnFilters,
  setColumnFilters,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/meals")
      .then((res) => res.json())
      .then((data) => {
        interface Meal {
          preparedStatus: string;
        }

        const uniqueStatuses = Array.from(
          new Set((data as Meal[]).map((meal) => meal.preparedStatus))
        );

        const validStatuses = ["Prepared", "Not Prepared"];
        const filteredStatuses = uniqueStatuses.filter((status) =>
          validStatuses.includes(status)
        );

        setStatusOptions(["All", ...filteredStatuses]);
      })
      .catch((error) => console.error("Error fetching statuses:", error));
  }, []);

  const togglePopover = () => setPopoverOpen(!popoverOpen);

  const handleFilterClick = (status: string): void => {
    if (status === "All") {
      setColumnFilters([
        { id: "preparedStatus", value: ["Prepared", "Not Prepared"] },
      ]); // ✅ Shows both
    } else {
      setColumnFilters([{ id: "preparedStatus", value: [status] }]);
    }
  };

  return (
    <div>
      <Button
        id="FilterButton"
        color={columnFilters.length > 0 ? "primary" : "secondary"}
        onClick={togglePopover}
      >
        Filter
      </Button>
      <Popover
        placement="left"
        isOpen={popoverOpen}
        target="FilterButton"
        toggle={togglePopover}
      >
        <PopoverBody>
          {statusOptions.map((status) => (
            <Button
              key={status}
              color={
                columnFilters.some((f) => f.value.includes(status))
                  ? "red"
                  : "light"
              }
              onClick={() => handleFilterClick(status)}
              style={{ marginBottom: "5px", width: "100%" }}
            >
              {status}
            </Button>
          ))}
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default FilterPopover;
