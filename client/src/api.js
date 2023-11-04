// api.js

const API_BASE_URL = "http://localhost:9000"; // Replace with your API base URL

// Fetch tasks from the server
export const fetchData = async (author) => {
  try {
    const response = await fetch(`http://localhost:9000/task?author=${author}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching data:", response.status);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to create a new task on the server
export const createNewTask = async (task) => {
  try {
    const response = await fetch(`${API_BASE_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Failed to create a new task:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error creating a new task:", error);
    return null;
  }
};

// Function to update an existing task on the server
export const updateTask = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/task/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Task updated:", result);
    } else {
      console.error("Failed to update the task");
    }
  } catch (error) {
    console.error("Error updating the task:", error);
  }
};

// Function to delete a task by ID on the server
export const deleteDataById = async (id) => {
  try {
    const response = await fetch("http://localhost:9000/task/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    alert("Error deleting document.", error);
  }
};
