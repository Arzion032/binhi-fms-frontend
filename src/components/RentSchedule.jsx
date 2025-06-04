import React from "react";
import { Check, Trash2 } from "lucide-react";

const RentSchedule = () => {
  const rows = [
    {
      id: 1,
      association: "Pantok Farmers Association",
      location: "Pantok\nBinangonan",
      machinery: "Utility Tractor 1",
      schedule: "9:00 AM\n06-04-25",
      area: "3.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 2,
      association: "Tatala Farmers Association",
      location: "Tatala\nBinangonan",
      machinery: "Combine Harvester",
      schedule: "9:00 AM\n06-04-25",
      area: "27.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 3,
      association: "Macamot Farmers Association",
      location: "Macamot\nBinangonan",
      machinery: "Utility Tractor 1",
      schedule: "9:00 AM\n06-04-25",
      area: "24.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 4,
      association: "Calumpang Farmers Association",
      location: "Calumpang\nBinangonan",
      machinery: "Multi-tiller",
      schedule: "9:00 AM\n06-04-25",
      area: "17.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 5,
      association: "Tagpos Farmers Association",
      location: "Tagpos\nBinangonan",
      machinery: "Utility Tractor 2",
      schedule: "9:00 AM\n06-04-25",
      area: "9.0",
      operator: "Buboy Cervantes",
    },
    {
      id: 6,
      association: "Pila-Pila Farmers Association",
      location: "Pila-Pila\nBinangonan",
      machinery: "Multi-tiller",
      schedule: "9:00 AM\n06-04-25",
      area: "23.3",
      operator: "Buboy Cervantes",
    },
    {
      id: 7,
      association: "Bilibiran Farmers Association",
      location: "Bilibiran\nBinangonan",
      machinery: "Combine Harvester",
      schedule: "9:00 AM\n06-04-25",
      area: "4.5",
      operator: "Buboy Cervantes",
    },
    {
      id: 8,
      association: "Kaysapon Farmers Association",
      location: "Pantok\nBinangonan",
      machinery: "Combine Harvester",
      schedule: "9:00 AM\n06-04-25",
      area: "15.25",
      operator: "Buboy Cervantes",
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <table className="table w-full table-fixed">
        <thead>
          <tr className="text-center bg-[#F4F4F4] text-sm text-black">
            <th className="w-[4%]">
              <input type="checkbox" className="checkbox checkbox-sm rounded" />
            </th>
            <th className="w-[18%] px-3 py-3">Association</th>
            <th className="w-[12%] px-3 py-3">Location</th>
            <th className="w-[14%] px-3 py-3">Machinery</th>
            <th className="w-[14%] px-3 py-3">Schedule</th>
            <th className="w-[10%] px-3 py-3">Area (has.)</th>
            <th className="w-[14%] px-3 py-3">Operator</th>
            <th className="w-[14%] px-3 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="bg-white border-gray-200 text-center text-sm text-black">
              <td>
                <input type="checkbox" className="checkbox checkbox-sm rounded" />
              </td>
              <td className="px-3 py-3 whitespace-pre-line">{row.association}</td>
              <td className="px-3 py-3 whitespace-pre-line text-gray-500">{row.location}</td>
              <td className="px-3 py-3">{row.machinery}</td>
              <td className="px-3 py-3 whitespace-pre-line text-gray-700">{row.schedule}</td>
              <td className="px-3 py-3">{row.area}</td>
              <td className="px-3 py-3">{row.operator}</td>
              <td className="px-3 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button className="text-green-600 hover:text-green-700">
                    <Check size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentSchedule;
