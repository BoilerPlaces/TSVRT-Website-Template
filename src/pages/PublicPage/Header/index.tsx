import React from 'react';

export default function Header() {
  return (
    <header className="fixed left-0 p-1 top-0 w-full">
      <div className="p-2 px-4 border border-black/10 rounded-xl text-xl backdrop-blur-xs">{document.title}</div>
    </header>
  );
}
