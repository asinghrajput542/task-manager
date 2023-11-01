import React, { useEffect, useState } from "react";

const Todo = () => {
  const [showDelete, setshowDelete] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [showList, setshowList] = useState(true);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [inputTitle, setinputTitle] = useState("");
  const [inputDesc, setinputDesc] = useState("");
  const [items, setitems] = useState([]);
  const [status, setStatus] = useState("To Do");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9000/task");
      const data = await response.json();
      setitems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Handle searching
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  //   HANDLING INPUT FIELDS
  const handleInput = (e) => {
    setinputTitle(e.target.value);
  };
  // HANDLING STATUS FIELDS
  const handleStatus = (e) => {
    const { value } = e.target;
    setStatus(value);
  };

  const handleInputdesc = (e) => {
    setinputDesc(e.target.value);
  };
  //   HANDLING INPUT FIELDS

  //   SUBMITTING FORM
  const handleSubmit = (e) => {
    setshowList(true);

    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      alert("fill data");
    } else if (inputTitle && !toggleSubmit) {
      setitems(
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

      setinputTitle("");
      setinputDesc("");
      settoggleSubmit(true);
      setshowDelete(true);
    } else {
      const allinputTitle = {
        title: inputTitle,
        description: inputDesc,
        status: status,
      };
      createNewTask(allinputTitle);
    }
  };
  //   SUBMITTING FORM
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
        // Request was successful (status code 200)
        const result = await response.json();
        setitems([result, ...items]);
        setinputTitle("");
        setinputDesc("");
        console.log("New task created:", result);
      } else {
        // Request failed, handle the error
        console.error("Failed to create a new task");
      }
    } catch (error) {
      // Handle any network or request-related errors
      console.error("Error creating a new task:", error);
    }
  };

  //UPDATE TASK
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
        // Request was successful (status code 200)
        const result = await response.json();
        console.log("Task updated:", result);
      } else {
        // Request failed, handle the error
        console.error("Failed to update the task");
      }
    } catch (error) {
      // Handle any network or request-related errors
      console.error("Error updating the task:", error);
    }
  };

  //   DELETE
  const handleDelete = (id, index) => {
    setdeleteMessage(true);
    setTimeout(() => {
      deleteDataById(id, index);
      setdeleteMessage(false);
    }, 1000);
  };
  //   DELETE
  const deleteDataById = async (id, index) => {
    const response = await fetch("http://localhost:9000/task/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const taskList = [...items];
          taskList.splice(index, 1);
          setitems(taskList);
        } else {
          alert("Error deleting document.");
        }
      })
      .catch((err) => {
        console.error("Error :", err);
      });
  };

  //   EDIT
  const handleEdit = (id) => {
    setshowList(false);
    setshowDelete(false);

    settoggleSubmit(false);
    let newEditItem = items.find((elem) => {
      return elem?._id === id;
    });
    setinputTitle(newEditItem?.title);
    setinputDesc(newEditItem?.description);

    setisEditItem(id);
  };

  // Function to render the list of tasks
  const renderTasks = () => {
    // Apply filtering based on the selected status
    let filteredTasks;
    function getStatusTextColor(status) {
      switch (status) {
        case "Done":
          return "text-green-500";
        case "In Progress":
          return "text-orange-500";
        default:
          return "text-red-500";
      }
    }

    filteredTasks =
      filterStatus === "All"
        ? items
        : items.filter(
            (item) => item?.status.toLowerCase() === filterStatus.toLowerCase()
          );
    return filteredTasks
      .filter((elem) =>
        elem?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((elem, index) => (
        <div
          className="border shadow mb-3 bg-gray-50 rounded p-2"
          key={elem?._id}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-xl">{elem?.title}</p>
              <div className="flex gap-2">
                <p className="text-gray-500 text-sm">{elem?.description}</p>

                <p className={`text-sm ${getStatusTextColor(elem?.status)}`}>
                  {elem?.status}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-white bg-blue-400 my-2 w-20 sm:w-[50%] p-2 rounded-lg"
                onClick={() => handleEdit(elem?._id)}
              >
                Edit
              </button>
              {showDelete ? (
                <button
                  className="text-white bg-red-400 my-2 w-20 sm:w-[50%] p-2 rounded-lg"
                  onClick={() => handleDelete(elem?._id, index)}
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

  // ADD NEW TASK
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 py-6">
      <div className="border rounded shadow p-3 mb-5 bg-white">
        <div className="flex justify-center">
          <p className="font-extrabold text-2xl">
            {toggleSubmit ? "Add Task" : "Edit Task"}
          </p>
        </div>

        <div className="flex justify-center ">
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
                  placeholder="title"
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
                  onChange={handleInputdesc}
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
              {toggleSubmit ? (
                <button className="text-white bg-blue-400 my-2 w-full sm:w-1/5 p-2 rounded-xl">
                  Save
                </button>
              ) : (
                <button className="text-white bg-blue-400 my-2 w-full sm:w-1/5 p-2 rounded-xl">
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {showList ? (
        <div className="py-2">
          <div className="mb-4 flex gap-3">
            {/* Add search input field */}
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
