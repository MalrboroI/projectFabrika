import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // NotFoundException,
} from '@nestjs/common';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Controller('tasks')
export class TasksController {
  private tasks: Task[] = [];
  private nextId = 1;

  @Get()
  getAllTasks(): Task[] {
    return this.tasks;
  }

  @Post()
  createTask(@Body() body: { title: string }): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: body.title,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() body: { completed: boolean },
  ) {
    const taskId = parseInt(id);
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) {
      return { status: 404, message: 'Task not found' };
    }

    task.completed = body.completed;
    return task;
  }
}
