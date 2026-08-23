import './App.css';
import { useCallback, useState } from 'react';
import { FormField } from './types';
import Sidebar from './components/Sidebar';
import FormPreview from './components/FormPreview';

const App = () => {
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = useCallback((field: FormField) => {
    setFields((prev) => [...prev, field]);
  }, []);

  const removeField = useCallback((id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <div className="app">
      <h1 className="title">Form Builder</h1>
      <div className="layout">
        <Sidebar onAddField={addField} />
        <FormPreview fields={fields} onRemoveField={removeField} />
      </div>
    </div>
  );
};

export default App;
