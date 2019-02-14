import React from 'react';
import { Route } from 'react-router-dom';
import { links } from './config';

export default () => {
  links.map((route) => { 
    if (typeof route.component === "object") route.component = () => route.component;
  });

  console.log(links);
  return (
  <div>
    {links.map(({ path, component }) => (
      <Route exact key={path} path={`/${path}`} component={component} />
      ))}
  </div>
)};
