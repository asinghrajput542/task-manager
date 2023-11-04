import sinon from "sinon";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { app } from "../index.js";
import Document from "../schema/schema.js";

chai.use(chaiHttp);

describe("API Tests", function () {
  let documentMock;
  let findStub;
  let createStub;
  let updateStub;

  before(function () {
    documentMock = sinon.mock(Document);
    findStub = sinon.stub(Document, "find");
    createStub = sinon.stub(Document, "create");
    updateStub = sinon.stub(Document, "updateOne");
  });

  after(function () {
    documentMock.restore();
    findStub.restore();
    createStub.restore();
    updateStub.restore();
  });
  // Describe a group of tests for the GET endpoint
  describe("GET /task", function () {
    it("should get a list of tasks", async () => {
      const fakeDocuments = [
        {
          _id: "1",
          title: "Task 1",
          description: "Description 1",
          status: "Done",
          author: "admin@gmail.com",
        },
        {
          _id: "2",
          title: "Task 2",
          description: "Description 2",
          status: "Done",
          author: "admin@gmail.com",
        },
      ];

      // Stub the Document.find method to return fake data
      findStub.resolves(fakeDocuments);

      try {
        // Make a GET request to the /task endpoint
        chai
          .request(app)
          .get("/task")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
          });
      } catch (error) {
        console.error("Error in test:", error);
      } finally {
        // Restore the stub after the test
        findStub.restore();
      }
    });
  });

  describe("POST /task", function () {
    it("should create a new task", async function () {
      const newTask = {
        title: "New Task",
        description: "Description of the new task",
        status: "In Progress",
        author: "admin@gmail.com",
      };

      createStub.resolves(newTask);

      try {
        const response = await chai.request(app).post("/task").send(newTask);
        expect(response).to.have.status(201);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("_id");
        expect(response.body).to.have.property("title", newTask.title);
        expect(response.body).to.have.property(
          "description",
          newTask.description
        );
        expect(response.body).to.have.property("status", newTask.status);
        await chai.request(app).delete(`/task/${response.body._id}`);
      } catch (error) {
        console.error("Error in test:", error);
      }
    }).timeout(5000);
  });

  describe("DELETE should return a 404 status for a non-existing task ID", function () {
    it("should give 404 by delete API for a given non-existing ID", async function () {
      const taskId = "5";
      // Simulate a non-existing task by rejecting the findStub
      findStub.rejects({ status: 404 });

      try {
        const response = await chai.request(app).delete(`/task/${taskId}`);
        expect(response).to.have.status(404);
      } catch (error) {
        console.error("Error in test:", error);
      }
    });
  });

  describe("PUT /task/:id", function () {
    it("should update a task by ID", async function () {
      const newTask = {
        title: "New Task",
        description: "Description of the new task",
        status: "In Progress",
        _id: "1",
        author: "admin@gmail.com",
      };

      createStub.resolves(newTask);

      const taskId = "1";
      const updatedData = {
        title: "Updated Task",
        description: "Updated description",
        status: "Done",
      };

      updateStub.resolves({
        _id: taskId,
        ...updatedData,
      });

      try {
        const postResponse = await chai
          .request(app)
          .post("/task")
          .send(newTask);

        const response = await chai
          .request(app)
          .put(`/task/${taskId}`)
          .send(updatedData);

        expect(response).to.have.status(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("_id", taskId);
        expect(response.body).to.have.property("title", updatedData.title);
        expect(response.body).to.have.property(
          "description",
          updatedData.description
        );
        expect(response.body).to.have.property("status", updatedData.status);
        await chai.request(app).delete(`/task/${taskId}`);
      } catch (error) {
        console.error("Error in test:", error);
      }
    });
  });

  describe("PUT should return a 404 status for a non-existing task ID", function () {
    it("should not update a task by a non-existing ID", async function () {
      const taskId = "5";
      // Simulate a non-existing task by rejecting the updateStub
      updateStub.rejects({ status: 404 });

      const updatedData = {
        title: "Updated Task",
        description: "Updated description",
        status: "Done",
      };

      try {
        const response = await chai
          .request(app)
          .put(`/task/${taskId}`)
          .send(updatedData);
        expect(response).to.have.status(404);
      } catch (error) {
        console.error("Error in test:", error);
      }
    });
  });
});
