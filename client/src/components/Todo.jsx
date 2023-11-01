import React, { useState } from "react";

const Todo = () => {
  const [showDelete, setshowDelete] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [showList, setshowList] = useState(true);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
  const [inputTitle, setinputTitle] = useState("");
  const [inputDesc, setinputDesc] = useState("");
  const [items, setitems] = useState([
    {
      id: "001",
      name: "Default Task",
      desc: "Default Description",
      status: "todo",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState(""); // Add search state
  const [filterStatus, setFilterStatus] = useState("All"); //status drop down

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
          if (elem.id === isEditItem) {
            return { ...elem, name: inputTitle, desc: inputDesc };
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
        id: new Date().getTime().toString(),
        name: inputTitle,
        desc: inputDesc,
      };
      setitems([allinputTitle, ...items]);
      setinputTitle("");
      setinputDesc("");
    }
  };
  //   SUBMITTING FORM

  //   DELETE
  const handleDelete = (index) => {
    console.log(index);
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setdeleteMessage(true);

    setTimeout(() => {
      setitems(updatedItems);
      setdeleteMessage(false);
    }, 2000);
    setdeleteMessagesuccess(false);
  };
  //   DELETE

  //   EDIT
  const handleEdit = (id) => {
    setshowList(false);
    setshowDelete(false);

    settoggleSubmit(false);
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setinputTitle(newEditItem.name);
    setinputDesc(newEditItem.desc);

    setisEditItem(id);
    console.log(newEditItem);
  };
  //   EDIT

  // ADD NEW TASK
  const handleAdd = () => {
    //   alert("hello")
    setshowList(true);
  };

  // Function to render the list of tasks
  const renderTasks = () => {
    // Apply filtering based on the selected status
    const filteredTasks =
      filterStatus === "All"
        ? items
        : items.filter((item) => item.status === filterStatus);

    return filteredTasks
      .filter((elem) =>
        elem.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((elem) => (
        <div
          className="border shadow mb-3 bg-gray-50 rounded p-2"
          key={elem.id}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-xl">{elem.name}</p>
              <p className="text-gray-500 text-sm">{elem.desc}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="text-white bg-blue-400 my-2 w-20 sm:w-[50%] p-2 rounded-lg"
                onClick={() => handleEdit(elem.id)}
              >
                Edit
              </button>
              {showDelete ? (
                <button
                  className="text-white bg-red-400 my-2 w-20 sm:w-[50%] p-2 rounded-lg"
                  onClick={() => handleDelete(elem.id)}
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
