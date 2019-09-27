// This is the patternfly-react table API.
// For the table, your actual data will be the 'rows' prop,
// while the column definitions and formatters go in the 'columns' prop.
// 'property' maps the column definition to the name of each key in rows
// formatters is an array of functions which return the JSX to display in each table cell
// header.label is the actual content of the header cell
import React from 'react';

// These columns have been filled in for you to make your life easy (this patternfly api can be picky).
// No additional changes should be needed on this page unless you are adding more columns
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
