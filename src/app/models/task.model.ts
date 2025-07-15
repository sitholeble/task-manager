export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export interface TaskRequest {
    title: string;
    completed: boolean;
}