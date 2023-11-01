import connection from "./database/db.js";
import express from "express";
import {
  getDocumentList,
  insertTask,
  deleteTask,
  updateDocumentById,
} from "./controller/app-controller.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
connection();
const port = 9000;
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.get("/task", async (req, res) => {
  try {
    const documents = await getDocumentList();
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching documents." });
  }
});

app.post("/task", async (req, res) => {
  try {
    return res.status(201).json(await insertTask(req.body));
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// DELETE a task by ID
app.delete("/task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Use the 'document' model to find and remove the task by its ID
    const deletedTask = await deleteTask(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).end(); // Respond with a 204 No Content status if the task was successfully deleted
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.put("/task/:id", async (req, res) => {
  try {
    return res
      .status(200)
      .json(await updateDocumentById(req.params.id, req.body));
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});
