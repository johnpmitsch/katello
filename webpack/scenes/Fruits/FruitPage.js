// Edit this page to show the fruits table
import React, { Component } from 'react';
import { Table as ForemanTable } from 'foremanReact/components/common/table';

class FruitPage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // Bonus: After completing your table,
    // try adding local state here that can be changed when the user clicks a table cell!
    // Or maybe a loading spinner or something.
  }

  // This is the patternfly-react table API.
  // Your actual data will be the 'rows' prop,
  // while the column definitions and formatters go in the 'columns' prop.
  // 'property' maps the column definition to the name of each key in rows
  // formatters is an array of functions which return the JSX to display in each table cell
  // header.label is the actual content of the header cell

  componentDidMount() {
    // Fetch data here
  }

  rows = [
    {
      name: 'idk',
      color: 'what color is fruit',
    },
    {
      name: 'put more fruit data here',
      color: 'okay!',
    },
  ];

  columns = [
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

  render() {
    return (
      <ForemanTable
        rows={this.rows}
        columns={this.columns}
      />
    );
  }
}

export default FruitPage;
