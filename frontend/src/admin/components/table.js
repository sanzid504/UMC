// Table.js
import React from 'react';

export default function Table({ data, columns, actionButton, H1, text }) {
  const renderTableHeaders = () => {
    return columns.map((column) => (
      <th
        key={column.key}
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >
        {column.label}
      </th>
    ));
  };

  const renderTableRows = () => {
    return data.map((item) => (
      <tr key={item.id}>
        {columns.map((column) => (
          <td
            key={`${item.id}-${column.key}`}
            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
          >
            {item[column.key]}
          </td>
        ))}
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit<span className="sr-only">, {item.name}</span>
          </a>
        </td>
      </tr>
    ));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{H1}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {text}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={actionButton.onClick}
          >
            {actionButton.label}
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>{renderTableHeaders()}</tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">{renderTableRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
