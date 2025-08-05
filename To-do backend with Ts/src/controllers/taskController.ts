import { Request, Response } from 'express';
import { Task } from '../types/task';

let tasks: Task[] = [];
let nextId = 1;

export const getAllTasks = (req: Request, res: Response): void => {
    res.json(tasks);
};

export const createTask = (req: Request, res: Response): void => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        res.status(400).json({ error: 'Title is required and must be a string' });
        return;
    }
    const task: Task = { id: nextId, title, completed: false };
    tasks.push(task);
    nextId++; // increase by 1 more next task
    res.status(201).json(task);
};

export const getTaskById = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id, 10);
    const task = tasks.find((t) => t.id === id);
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    res.json(task);
};

export const markTaskAsDone = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID format' });
    return;
  }
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  tasks[taskIndex].completed = true;
  res.json(tasks[taskIndex]);
};