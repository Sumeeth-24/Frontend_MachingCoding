import { useReducer } from 'react';
import { FieldType, FormField } from '../types';

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'textarea', label: 'Textarea' },
];

interface FieldConfig {
  type: FieldType;
  label: string;
  placeholder: string;
  options: string;
  required: boolean;
}

const initialConfig: FieldConfig = {
  type: 'text',
  label: '',
  placeholder: '',
  options: '',
  required: false,
};

type Action =
  | { type: 'UPDATE'; field: keyof FieldConfig; value: string | boolean }
  | { type: 'RESET' };

const configReducer = (state: FieldConfig, action: Action): FieldConfig => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return { ...initialConfig, type: state.type };
    default:
      return state;
  }
};

interface SidebarProps {
  onAddField: (field: FormField) => void;
}

const Sidebar = ({ onAddField }: SidebarProps) => {
  const [config, dispatch] = useReducer(configReducer, initialConfig);

  const handleAdd = () => {
    if (!config.label.trim()) return;

    const field: FormField = {
      id: crypto.randomUUID(),
      type: config.type,
      label: config.label.trim(),
      ...(config.type !== 'checkbox' && { placeholder: config.placeholder.trim() }),
      ...(config.type === 'select' && {
        options: config.options.split(',').map((o) => o.trim()).filter(Boolean),
      }),
      required: config.required,
    };

    onAddField(field);
    dispatch({ type: 'RESET' });
  };

  const showPlaceholder = config.type !== 'checkbox';
  const showOptions = config.type === 'select';

  return (
    <aside className="sidebar">
      <h2>Configure Field</h2>

      <div className="sidebar-field">
        <label htmlFor="field-type">Type</label>
        <select
          id="field-type"
          value={config.type}
          onChange={(e) => dispatch({ type: 'UPDATE', field: 'type', value: e.target.value })}
        >
          {FIELD_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="sidebar-field">
        <label htmlFor="field-label">Label</label>
        <input
          id="field-label"
          value={config.label}
          onChange={(e) => dispatch({ type: 'UPDATE', field: 'label', value: e.target.value })}
          placeholder="e.g. Full Name"
        />
      </div>

      {showPlaceholder && (
        <div className="sidebar-field">
          <label htmlFor="field-placeholder">Placeholder</label>
          <input
            id="field-placeholder"
            value={config.placeholder}
            onChange={(e) => dispatch({ type: 'UPDATE', field: 'placeholder', value: e.target.value })}
            placeholder="e.g. Enter your name"
          />
        </div>
      )}

      {showOptions && (
        <div className="sidebar-field">
          <label htmlFor="field-options">Options (comma separated)</label>
          <input
            id="field-options"
            value={config.options}
            onChange={(e) => dispatch({ type: 'UPDATE', field: 'options', value: e.target.value })}
            placeholder="e.g. Option 1, Option 2"
          />
        </div>
      )}

      <div className="sidebar-field checkbox-row">
        <input
          type="checkbox"
          id="field-required"
          checked={config.required}
          onChange={(e) => dispatch({ type: 'UPDATE', field: 'required', value: e.target.checked })}
        />
        <label htmlFor="field-required">Required</label>
      </div>

      <button className="add-btn" onClick={handleAdd} disabled={!config.label.trim()}>
        + Add Field
      </button>
    </aside>
  );
};

export default Sidebar;
