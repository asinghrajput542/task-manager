import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Todo from "./components/Todo";
import * as api from "./api";

jest.mock("./api"); // Mock the entire api module

describe("Todo component", () => {
  beforeEach(async () => {
    // Initialize the 'items' state with some test data
    const initialItems = [
      {
        _id: "1",
        title: "Test Task 1",
        description: "Description for Task 1",
        status: "To Do",
      },
    ];

    // Render the Todo component with initial items

    api.fetchData.mockResolvedValue(initialItems);
    render(<Todo />);

    // Wait for the component to finish rendering
    await waitFor(() => {
      const task1 = screen.getByText("Test Task 1");
      expect(task1).toBeInTheDocument();
    });
  });

  test('renders "Add Task" by default', () => {
    const header = screen.getByText("Add Task");
    expect(header).toBeInTheDocument();
  });

  test("creates a new task", async () => {
    // Mock the createNewTask function to return a dummy response
    api.createNewTask.mockResolvedValue({
      title: "New Task",
      description: "Description for the new task",
      status: "To Do",
    });

    const titleInput = screen.getByPlaceholderText("Title");
    const descriptionInput = screen.getByPlaceholderText("Description");
    const addButton = screen.getByText("Save");

    fireEvent.change(titleInput, { target: { value: "New Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Description for the new task" },
    });
    fireEvent.click(addButton);

    // Wait for the task to appear in the UI
    await waitFor(() => {
      const taskTitle = screen.getByText("New Task");
      expect(taskTitle).toBeInTheDocument();
    });

    // Assert that the createNewTask function is called with the expected data
    expect(api.createNewTask).toHaveBeenCalledWith({
      title: "New Task",
      description: "Description for the new task",
      status: "To Do",
    });
  });

  test("updates an existing task", async () => {
    // Mock the updateTask function to return a dummy response
    api.updateTask.mockResolvedValue({
      _id: "1",
      title: "Updated Task",
      description: "Updated description",
      status: "To Do",
    });
    //

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const titleInput = screen.getByDisplayValue("Test Task 1");
    const descriptionInput = screen.getByDisplayValue("Description for Task 1");
    const updateButton = screen.getByText("Update");

    fireEvent.change(titleInput, { target: { value: "Updated Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });

    fireEvent.click(updateButton);

    // Wait for the updated task to appear in the UI
    await waitFor(() => {
      const updatedTaskTitle = screen.getByText("Updated Task");
      expect(updatedTaskTitle).toBeInTheDocument();
    });
  });

  test("deletes a task", async () => {
    // Mock the deleteDataById function
    api.deleteDataById.mockResolvedValue(); // It doesn't need to return anything for this test

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Wait for the task to be removed from the UI
    await waitFor(() => {
      expect(screen.queryByText("New Task")).not.toBeInTheDocument();
    });
  });

  test("filters tasks by status", async () => {
    const statusFilter = screen.getByLabelText("Filter by Status:");
    fireEvent.change(statusFilter, { target: { value: "Done" } });

    // Wait for the tasks to be filtered
    await waitFor(() => {
      expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    });
  });

  test("searches tasks by title", async () => {
    // Mock the fetchData function to return dummy data with different titles
    api.fetchData.mockResolvedValue([
      {
        _id: "1",
        title: "Task 1",
        description: "Description 1",
        status: "To Do",
      },
      {
        _id: "2",
        title: "Task 2",
        description: "Description 2",
        status: "To Do",
      },
    ]);

    const searchInput = screen.getByPlaceholderText("Search by title");
    fireEvent.change(searchInput, { target: { value: "Task 1" } });

    // Wait for the matching task to be displayed
    await waitFor(() => {
      expect(screen.queryByText("Test Task 1")).toBeInTheDocument();
      expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    });
  });
});
