import React from "react";

type SidebarProps = {
  title: string;
  children?: React.ReactNode;
};
export function Sidebar({ children, title }: SidebarProps) {
  return (
    <aside className="w-[20rem] bg-slate-700 h-full px-2 flex flex-col space-y-2">
      <div className="text-center py-2">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {children}
    </aside>
  );
}
