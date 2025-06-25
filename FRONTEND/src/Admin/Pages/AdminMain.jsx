// src/components/MainContent.jsx
import { Outlet } from 'react-router-dom';

export default function MainContent({ header }) {
  return (
    <div className="flex-1 flex flex-col">
      <div>
        <h1 className=''>Admin</h1>
      </div>
    </div>
  );
}
