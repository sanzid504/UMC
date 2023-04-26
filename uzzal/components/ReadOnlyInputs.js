import React, { useState, useEffect } from 'react';

function DynamicForm({ data, onOutputChange }) {
  const [inputGroups, setInputGroups] = useState([]);

  useEffect(() => {
    if (data) {
      setInputGroups(JSON.parse(data));
    }
  }, [data]);

  const handleValueChange = (index, value) => {
    const newInputGroups = [...inputGroups];
    newInputGroups[index].value = value;
    setInputGroups(newInputGroups);

    const jsonString = JSON.stringify(newInputGroups, null, 2);
    onOutputChange(jsonString);
  };

  const renderInputGroups = () =>
    inputGroups.map((inputGroup, index) => (
      <div key={index}>
        <div className="flex justify-between items-center">
          <span className="block text-sm font-medium leading-6 text-gray-900">
            {inputGroup.label}
          </span>
          {inputGroup.required && (
            <span className="text-sm leading-6 text-gray-500">Required</span>
          )}
        </div>
        <div className="mt-2">
          <input
            type="text"
            value={inputGroup.value || ''}
            onChange={(e) => handleValueChange(index, e.target.value)}
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    ));

  return <div>{renderInputGroups()}</div>;
}

export default DynamicForm;
