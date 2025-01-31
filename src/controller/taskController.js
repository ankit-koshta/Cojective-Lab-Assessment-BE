const { pool } = require("../config/db");

const TaskController = async (req, res) => {
  try {
    const { page = 1, offset = 10 } = req.query;
    const skip = page * 10 - offset;
    const [rows] = await pool.query(
      `select * from tasks limit ${offset} offset ${skip}`
    );
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const addTaskController = async (req, res) => {
  try {
    const { id, title, deadline, description, priority } = req.body;
    if (id) {
      await pool.query(
        `update tasks set title=?, deadline=?, description=?, priority = ? where id=?`,
        [title, deadline, description, priority, id]
      );
    } else {
      await pool.query(
        `insert into tasks (title, deadline, description, priority) values (?,?,?,?)`,
        [title, deadline, description, priority]
      );
    }
    let [rows] = await pool.query(`select * from tasks`);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query(`delete from tasks where id=${id}`);
    let [rows] = await pool.query("select * from tasks");
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { TaskController, addTaskController, deleteTaskController };
