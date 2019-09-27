// Edit this page to show the fruits table
import React, { Component } from 'react';
import { Table as ForemanTable } from 'foremanReact/components/common/table';
import { columns } from './FruitTableSchema';

// This is dummy data; you will need to replace it with real data from your API call.
const results = [
  {
    name: 'idk',
    color: 'what color is fruit',
  },
  {
    name: 'put more fruit data here',
    color: 'okay!',
  },
];

class FruitPage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fetch data here. This will be done with a redux action
  }

  render() {
    return (
      <ForemanTable
        rows={results}
        columns={columns}
      />
    );
  }
}

export default FruitPage;
