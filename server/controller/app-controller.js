import Document from "../schema/schema.js";

export const updateDocumentById = async (id, newData) => {
  try {
    console.log("id ", id, "newData ", newData);

    const updatedDocument = await Document.findByIdAndUpdate(
      id,
      {
        title: newData?.title,
      },
      { description: newData?.description },
      { status: newData?.status },

      { modificationDate: new Date() }
    );

    if (!updatedDocument) {
      throw new Error("Document not found");
    }

    return await Document.findById(id);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export const getDocumentList = async () => {
  return await Document.find()
    .sort({ modificationDate: -1 })
    .select("_id modificationDate creationDate title description status");
};

export const insertTask = async (data) => {
  return await new Document(data).save();
};

export const deleteTask = async (id) => {
  return await Document.findByIdAndDelete(id);
};
