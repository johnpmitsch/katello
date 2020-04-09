import React from 'react';

const IconWithCount = ({ count, title, Icon}) => (
    <React.Fragment>
      <Icon title={title} className={"ktable-cell-icon"} />
      {count}
    </React.Fragment>
);

export default IconWithCount;