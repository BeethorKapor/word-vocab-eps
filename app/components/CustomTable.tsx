import React from "react";
import { CustomTableProps } from "@/types";

const CustomTable: React.FC<CustomTableProps> = ({ header, children }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-md shadow-md">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {header?.map((title: string, index: number) => (
              <th
                key={index}
                className="px-4 py-3 font-semibold text-left text-gray-600"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default CustomTable;
