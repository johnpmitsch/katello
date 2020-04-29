const actionResolver = (rowData, { _rowIndex }) => {
  // don't show actions for the expanded parts
  if (rowData.parent || rowData.compoundParent || rowData.noactions) return null;

  // printing to the console for now until these are hooked up
  /* eslint-disable no-console */
  return [
    {
      title: 'Publish and Promote',
      onClick: (_event, rowId, rowInfo) => console.log(`clicked on row ${rowId} with Content View ${cvIdFromRow(rowInfo)}`),
    },
    {
      title: 'Promote',
      onClick: (_event, rowId, rowInfo) => console.log(`clicked on row ${rowId} with Content View ${cvIdFromRow(rowInfo)}`),
    },
    {
      title: 'Copy',
      onClick: (_event, rowId, rowInfo) => console.log(`clicked on row ${rowId} with Content View ${cvIdFromRow(rowInfo)}`),
    },
    {
      title: 'Delete',
      onClick: (_event, rowId, rowInfo) => console.log(`clicked on row ${rowId} with Content View ${cvIdFromRow(rowInfo)}`),
    },
  ];
  /* eslint-enable no-console */
};

export default actionResolver;
