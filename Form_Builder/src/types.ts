export type FieldType = 'text' | 'number' | 'email' | 'checkbox' | 'select' | 'textarea';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: string[]; // for select
  required?: boolean;
}
