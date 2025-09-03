// Routes + Controllers + Services
// these types are basically just assumptions for now since we have no type validation
export type CreateTaskRequestBody = {
  description: string,
  dueDate?: string  // json does not support date
}

export type UpdateTaskRequestParams = {
  id: string  // unparsed params are all strings
}

export type UpdateTaskRequestBody = {
  description?: string,
  complete?: boolean, 
  dueDate?: string
}

export type DeleteTaskRequestParams = {
  id: string
}

// Repository
export type CreateTaskFields = {
  userId: number;
  description: string;
  dueDate: Date | null;
}

export type UpdateTaskFields = {
  description?: string;
  complete?: boolean;
  dueDate?: Date | null;
}