import React, { useEffect, useState } from "react";

const Todo = () => {
  // State variables for managing task data and form inputs
  const [showDelete, setShowDelete] = useState(true); // Toggle delete button visibility
  const [toggleSubmit, setToggleSubmit] = useState(true); // Toggle submit button functionality for edit and save
  const [isEditItem, setIsEditItem] = useState(null); // Store ID of the item being edited
  const [showList, setShowList] = useState(true); // Toggle task list visibility
  const [deleteMessage, setDeleteMessage] = useState(false); // Display delete success message
  const [inputTitle, setInputTitle] = useState(""); // Input for task title
  const [inputDesc, setInputDesc] = useState(""); // Input for task description
  const [items, setItems] = useState([]); // Array to store tasks
  const [status, setStatus] = useState("To Do"); // Task status (To Do, In Progress, Done)
  const [searchTerm, setSearchTerm] = useState(""); // Input for search term
  const [filterStatus, setFilterStatus] = useState("All"); // Filter tasks by status (All, To Do, In Progress, Done)

  // Fetch initial data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch tasks from the server
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9000/task");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Event handler for filter status change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Event handler for search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Event handler for task title input change
  const handleInput = (e) => {
    setInputTitle(e.target.value);
  };

  // Event handler for task status input change
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  // Event handler for task description input change
  const handleInputDesc = (e) => {
    setInputDesc(e.target.value);
  };

  // Event handler for form submission (Create or Update task)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs
    if (!inputTitle || !inputDesc) {
      alert("Please fill in all fields");
    } else if (inputTitle && !toggleSubmit) {
      // Update existing task
      // Update existing task
      setItems(
        items.map((elem) => {
          if (elem?._id === isEditItem) {
            updateTask(elem?._id, {
              title: inputTitle,
              description: inputDesc,
              status: status,
            });
            return {
              ...elem,
              title: inputTitle,
              description: inputDesc,
              status: status,
            };
          }
          return elem;
        })
      );
    } else {
      // Create new task
      createNewTask({
        title: inputTitle,
        description: inputDesc,
        status: status,
      });
    }
    // Reset form inputs and buttons after submission
    resetForm();
  };

  // Function to create a new task on the server
  const createNewTask = async (task) => {
    try {
      const response = await fetch("http://localhost:9000/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const result = await response.json();
        setItems([result, ...items]);
      } else {
        console.error("Failed to create a new task");
      }
    } catch (error) {
      console.error("Error creating a new task:", error);
    }
  };

  // Function to update an existing task on the server
  const updateTask = async (id, updatedData) => {
    try {
      const response = await fetch("http://localhost:9000/task/" + id, {
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

  // Event handler for task deletion
  const handleDelete = (id, index) => {
    setDeleteMessage(true);
    setTimeout(() => {
      deleteDataById(id, index);
      setDeleteMessage(false);
    }, 1000);
  };

  // Function to delete a task by ID on the server
  const deleteDataById = async (id, index) => {
    const response = await fetch("http://localhost:9000/task/" + id, {
      method: "DELETE",
    });
    if (response.ok) {
      const taskList = [...items];
      taskList.splice(index, 1);
      setItems(taskList);
    } else {
      alert("Error deleting document.");
    }
  };

  // Event handler for editing a task
  const handleEdit = (id) => {
    setShowList(false);
    setShowDelete(false);
    setToggleSubmit(false);

    let newEditItem = items.find((elem) => elem._id === id);
    setInputTitle(newEditItem.title);
    setInputDesc(newEditItem.description);
    setIsEditItem(id);
  };

  // Function to render the filtered and searched task list
  const renderTasks = () => {
    let filteredTasks;
    // Function to determine text color based on task status
    const getStatusTextColor = (status) => {
      switch (status) {
        case "Done":
          return "text-green-500";
        case "In Progress":
          return "text-orange-500";
        default:
          return "text-red-500";
      }
    };

    // Apply filters and search term on tasks
    filteredTasks =
      filterStatus === "All"
        ? items
        : items.filter(
            (item) => item.status.toLowerCase() === filterStatus.toLowerCase()
          );

    return filteredTasks
      .filter((elem) =>
        elem.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((elem, index) => (
        <div
          className="border shadow mb-3 bg-gray-50 rounded p-2"
          key={elem._id}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-xl">{elem.title}</p>
              <div className="flex gap-2">
                <p className="text-gray-500 text-sm">{elem.description}</p>
                <p className={`text-sm ${getStatusTextColor(elem.status)}`}>
                  {elem.status}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-white bg-blue-400 my-2 w-20 sm:w-[50%] p-2 rounded-lg"
                onClick={() => handleEdit(elem._id)}
              >
                Edit
              </button>
              {showDelete ? (
                <button
                  className="text-white bg-red-400 my-2 w-20 sm:w-[50%] p-2 rounded-lg"
                  onClick={() => handleDelete(elem._id, index)}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ));
  };

  // Function to reset the form inputs and buttons
  const resetForm = () => {
    setShowList(true);
    setInputTitle("");
    setInputDesc("");
    setToggleSubmit(true);
    setShowDelete(true);
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-6">
      <div className="border rounded shadow p-3 mb-5 bg-white">
        <div className="flex justify-center">
          <p className="font-extrabold text-2xl">
            {toggleSubmit ? "Add Task" : "Edit Task"}
          </p>
        </div>
        <div className="flex justify-center">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row">
              <div className="m-2 w-[40%] flex flex-col">
                <label htmlFor="title" className="my-1 font-semibold">
                  Title :
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  className="w-full  my-1 p-2 border-2 rounded-xl"
                  onChange={handleInput}
                  value={inputTitle}
                />
              </div>
              <div className="m-2 flex flex-col w-[40%]">
                <label className="my-1 font-semibold" htmlFor="description">
                  Description :
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  className="w-full my-1 p-2 border-2 rounded-xl"
                  onChange={handleInputDesc}
                  value={inputDesc}
                />
              </div>
              <div className="m-2 flex flex-col w-[30%]">
                <label className="my-1 font-semibold" htmlFor="description">
                  Status :
                </label>
                <select
                  name="status"
                  className="w-full sm:w-2/5 my-1 p-2 border-2 rounded-xl"
                  onChange={handleStatus}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
            <div>
              <button className="text-white bg-blue-400 my-2 w-full sm:w-1/5 p-2 rounded-xl">
                {toggleSubmit ? "Save" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showList ? (
        <div className="py-2">
          <div className="mb-4 flex gap-3">
            <input
              type="text"
              placeholder="Search by title"
              className="w-full sm:w-2/5 my-1 p-2 border-2 rounded-xl"
              onChange={handleSearch}
              value={searchTerm}
            />
            <div className="flex items-center flex-col sm:flex-row">
              <label className="text-gray-600 text-sm sm:mr-2">
                Filter by Status:
              </label>
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="w-full sm:w-auto bg-white border rounded-lg p-2"
              >
                <option value="All">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          {deleteMessage ? (
            <p className="text-center">Item Deleted Successfully</p>
          ) : (
            ""
          )}
          {renderTasks()}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Todo;
