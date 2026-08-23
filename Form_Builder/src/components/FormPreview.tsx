import { useCallback, useRef } from 'react';
import { FormField } from '../types';

interface FormPreviewProps {
  fields: FormField[];
  onRemoveField: (id: string) => void;
}

const FormPreview = ({ fields, onRemoveField }: FormPreviewProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const output: Record<string, string | boolean> = {};

    fields.forEach((field) => {
      if (field.type === 'checkbox') {
        output[field.label] = formData.has(field.id);
      } else {
        output[field.label] = (formData.get(field.id) as string) ?? '';
      }
    });

    console.log('Form Values:', output);
  }, [fields]);

  if (fields.length === 0) {
    return (
      <section className="form-preview">
        <h2>Form Preview</h2>
        <p className="empty-state">Add fields from the sidebar to build your form.</p>
      </section>
    );
  }

  return (
    <section className="form-preview">
      <h2>Form Preview</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <FormFieldItem key={field.id} field={field} onRemove={onRemoveField} />
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </section>
  );
};

// Extracted component — prevents re-render of all fields when one changes
const FormFieldItem = ({ field, onRemove }: { field: FormField; onRemove: (id: string) => void }) => {
  return (
    <div className="form-item">
      <button type="button" className="remove-btn" onClick={() => onRemove(field.id)} aria-label={`Remove ${field.label}`}>
        ✕
      </button>
      <label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="required">*</span>}
      </label>
      {renderInput(field)}
    </div>
  );
};

const renderInput = (field: FormField) => {
  const commonProps = {
    id: field.id,
    name: field.id,
    required: field.required,
  };

  switch (field.type) {
    case 'text':
    case 'number':
    case 'email':
      return <input type={field.type} placeholder={field.placeholder} {...commonProps} />;

    case 'checkbox':
      return <input type="checkbox" {...commonProps} />;

    case 'select':
      return (
        <select defaultValue="" {...commonProps}>
          <option value="" disabled>-- Select --</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );

    case 'textarea':
      return <textarea placeholder={field.placeholder} rows={3} {...commonProps} />;
  }
};

export default FormPreview;
