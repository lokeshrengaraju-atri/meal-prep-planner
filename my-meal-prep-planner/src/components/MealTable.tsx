import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { Meal } from "../hooks/useMeal";

const columnHelper = createColumnHelper<Meal>();

interface MealTableProps {
  filteredData: Meal[];
  columnFilters: { id: string; value: string[] }[];
  fetchUpdatedMeals: () => Promise<void>;
}

const MealTable: React.FC<MealTableProps> = ({
  filteredData,
  columnFilters,
  fetchUpdatedMeals,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 8;

  // Calculate total pages
  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / mealsPerPage),
    [filteredData.length, mealsPerPage]
  );

  // Get paginated data
  const currentMeals = useMemo(() => {
    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    return filteredData.slice(indexOfFirstMeal, indexOfLastMeal);
  }, [filteredData, currentPage, mealsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDelete = async () => {
    if (mealToDelete) {
      try {
        await fetch(`http://localhost:5000/meals/${mealToDelete.id}`, {
          method: "DELETE",
        });
        await fetchUpdatedMeals(); // Refresh the table after deletion
        toggleModal(); // Close the modal
      } catch (error) {
        console.error("Error deleting meal:", error);
      }
    }
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>ID</span>,
    }),
    columnHelper.accessor("mealName", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Meal Name</span>,
    }),
    columnHelper.accessor("dayOfWeek", {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Day of the Week</span>,
    }),
    columnHelper.accessor("ingredients", {
      header: () => <span>Ingredients</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("preparedStatus", {
      header: () => <span>Prepared Status</span>,
      cell: (info) => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor("instruction", {
      header: () => <span>Instruction</span>,
      cell: (info) => <i>{info.getValue()}</i>,
    }),
    columnHelper.display({
      id: "actions",
      header: () => "Actions",
      cell: ({ row }) => {
        const meal = row.original;
        return (
          <div className="d-flex gap-2">
            <Button
              id="edit"
              color="primary"
              size="sm"
              onClick={() => navigate(`/${meal.id}`)}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                setMealToDelete(meal);
                toggleModal();
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: currentMeals, // Use paginated data
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { columnFilters },
  });

  return (
    <Container>
      <Table bordered hover responsive>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={
                row.original.preparedStatus === "Prepared"
                  ? "prepared"
                  : "not-prepared"
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="pagination-controls d-flex justify-content-center mt-3">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
              margin: "0 5px",
            }}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the meal "
          <strong>{mealToDelete?.mealName}</strong>"?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default MealTable;
