import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Loading: FC = () => (
  <div><p>Loading...</p>
    <Link to="/">Back</Link>
  </div>
);
