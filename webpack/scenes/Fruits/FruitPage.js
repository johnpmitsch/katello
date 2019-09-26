// Edit this page to show the fruits table
import React, { Component } from 'react';
import { Table as ForemanTable } from 'foremanReact/components/common/table';
import { rows, columns } from './FruitTableSchema';

class FruitPage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // Bonus: After completing your table,
    // try adding local state here that can be changed when the user clicks a table cell!
    // Or maybe a loading spinner or something.
  }

  componentDidMount() {
    // Fetch data here
  }

  render() {
    return (
      <ForemanTable
        rows={rows}
        columns={columns}
      />
    );
  }
}

export default FruitPage;
