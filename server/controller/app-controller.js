import Document from "../schema/schema.js";

// Update a document by ID
export const updateDocumentById = async (id, newData) => {
  try {
    console.log("Updating document with ID:", id);
    console.log("New data:", newData);
    const result = await Document.findByIdAndUpdate(id, {
      title: newData?.title,
      description: newData?.description,
      status: newData?.status,
      modificationDate: new Date(),
    });

    if (!result) {
      throw Error("Data not found by given id");
    }
    // Return the updated document
    return await Document.findById(id);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Retrieve a list of documents
export const getDocumentList = async (author) => {
  try {
    console.log("Retrieving document list by ,", author);
    const filter = { author: author };

    return await Document.find(filter)
      .sort({ modificationDate: -1 }) // Sort documents by modification date in descending order
      .select("_id modificationDate creationDate title description status");
  } catch (error) {
    console.error("Error retrieving document list:", error);
    throw error;
  }
};

// Insert a new task document
export const insertTask = async (data) => {
  try {
    console.log("Inserting a new task document");

    return await new Document(data).save();
  } catch (error) {
    console.error("Error inserting a new task document:", error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTask = async (id) => {
  try {
    console.log("Deleting task document with ID:", id);

    return await Document.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting task document:", error);
    throw error;
  }
};
