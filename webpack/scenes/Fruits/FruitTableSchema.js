// Add the table schema that will be passed to ForemanTable
// This is the patternfly-react table API.
// Your actual data will be the 'rows' prop,
// while the column definitions and formatters go in the 'columns' prop.
// 'property' maps the column definition to the name of each key in rows
// formatters is an array of functions which return the JSX to display in each table cell
// header.label is the actual content of the header cell

import React from 'react';

// This is dummy data; you will need to replace it with real data from your API call.
export const rows = [
  {
    name: 'idk',
    color: 'what color is fruit',
  },
  {
    name: 'put more fruit data here',
    color: 'okay!',
  },
];

export const columns = [
  {
    property: 'name',
    cell: {
      formatters: [name => <td>{name}</td>],
    },
    header: {
      formatters: [name => <td><strong>{name.toUpperCase()}</strong></td>],
      label: 'Name',
    },
  },
  {
    property: 'color',
    cell: {
      formatters: [color => <td>{color}</td>],
    },
    header: {
      formatters: [color => <td><strong>{color.toUpperCase()}</strong></td>],
      label: 'Color',
    },
  },
];
