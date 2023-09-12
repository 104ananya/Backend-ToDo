import { Task } from "./../models/task.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  // const task = new Task({ title, description });
  // await task.save();

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task addded Succesfully",
  });
};

export const getMyTask = async (req, res, next) => {
  const userid = req.user._id;

  const tasks = await Task.find({ user: userid });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res, next) => {
  // accessing id
  const id = req.params.id;

  // findin task by id
  const task = await Task.findById(id);

  // error handling
  if (!task) return next(new Error());

  // checkbox
  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated",
  });
};

export const deleteTask = async (req, res, next) => {
  // accessing id
  const id = req.params.id;

  // findin task by id
  const task = await Task.findById(id);

  // error handling
  if (!task) return next(new Error("Invalid ID"));

  // delete
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted",
  });
};
