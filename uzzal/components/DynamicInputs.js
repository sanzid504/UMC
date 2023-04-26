import React, { useState,useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function DynamicInputs({data,onOutputChange }) {
  const [inputGroups, setInputGroups] = useState([]);
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (data) {
      setInputGroups(JSON.parse(data));
    }
  }, [data]);


  const outputJSON = () => {
    const jsonString = JSON.stringify(inputGroups, null, 2);
    onOutputChange(jsonString);
    return jsonString;
  };

  const addInputGroup = (e) => {
    e.preventDefault();
    setInputGroups([...inputGroups, { label: 'Demo', required: false }]);
    outputJSON();
  };

  const handleLabelChange = (index, value) => {
    const newInputGroups = [...inputGroups];
    newInputGroups[index].label = value;
    setInputGroups(newInputGroups);
    outputJSON();
  };

  const handleRequiredToggle = (index) => {
    const newInputGroups = [...inputGroups];
    newInputGroups[index].required = !newInputGroups[index].required;
    setInputGroups(newInputGroups);
    outputJSON();
  };

  const renderInputGroups = () =>
    inputGroups.map((inputGroup, index) => (
      <div key={index}>
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={inputGroup.label}
            onChange={(e) => handleLabelChange(index, e.target.value)}
            className="block text-sm font-medium leading-6 text-gray-900"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={inputGroup.required}
              onChange={() => handleRequiredToggle(index)}
              className="mr-2"
            />
            <span className="text-sm leading-6 text-gray-500">Required</span>
          </div>
        </div>
        <div className="mt-2">
          <input
            type="text"
            readOnly
            value={inputGroup.value}
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    ));


  return (
    <div>
      {renderInputGroups()}
      <button
        onClick={addInputGroup}
        className="p-2 bg-gray-200 rounded-md shadow flex my-2 justify-center items-center"
      >
        <PlusCircleIcon className="w-5 h-5 text-blue-800" />
      </button>
    </div>
  );
}

export default DynamicInputs;
