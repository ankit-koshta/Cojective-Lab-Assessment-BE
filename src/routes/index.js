const express = require("express");
const {
  TaskController,
  addTaskController,
  deleteTaskController,
} = require("../controller/taskController");
const route = express.Router();

route.get("/get-task-list", TaskController);
route.post("/add-task", addTaskController);
route.delete("/delete-task/:id", deleteTaskController);

module.exports = route;
