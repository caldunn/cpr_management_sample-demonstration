import React from "react";

import CollapsibleTable from "../mui/data-table";


export default function NewHome({ menuType }: {menuType: string} = {menuType: "Home"}) {
  return (
    <header className="App-header">
      <CollapsibleTable />
      <p>
        Current item: <code>{menuType}</code>
      </p>

    </header>
  );
}