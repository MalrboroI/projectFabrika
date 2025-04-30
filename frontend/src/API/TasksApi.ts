import axios, { AxiosResponse } from "axios";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = "http://localhost:3000/tasks";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error as Error);
    throw error;
  }
};

export const createTask = async (title: string): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await axios.post(
      API_URL,
      { title },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error as Error);
    throw error;
  }
};

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const updateTask = async (id: number, completed: boolean) => {
  try {
    const response = await api.patch(`/${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
};
