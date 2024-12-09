export interface Tag {
  id: string;
  name: string;
  userId: string;
  color: string | null;
}

export interface TodoTag {
  tag: Tag;
  taskId: string;
  tagId: string;
}

export interface Todo {
  id: string;
  title: string;
  content: string | null;
  position: number;
  priority: string | null;
  dueDate: Date | null;
  image: string | null;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
  tags: TodoTag[];
}

export interface Column {
  id: string;
  name: string;
  boardId: string;
  position: number | null;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
  todos: Todo[];
}

export interface BoardsProps {
  columns: Column[];
}
export interface ColumnProps {
    column: Column;
    index:number
}
export interface TaskProps {
    task: Todo
    index:number
}
export interface TaskColor {
  id: string;
  title: string;
  content: string | null;
  position: number;
  priority: string | null;
  dueDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  image: string | null;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
  tags: TodoTag[];
  color:string;
}
 export interface Task {
  id: string;
  title: string;
  content: string | null;
  position: number;
  priority: string | null;
  dueDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  image: string | null;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
  tags: TodoTag[];
  color:string;
}

export interface UploadedFile{
  id: string;
  name: string;
  url: string;
  type: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}