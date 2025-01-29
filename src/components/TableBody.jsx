import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TableBody = ({
  id,
  name,
  email,
  username,
  company: { name: companyName },
  handleDelete
}) => {
     const navigate = useNavigate();
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {username}
      </td>
      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {email}
      </td>
      <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          {companyName}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="text-indigo-600 hover:text-indigo-900 transition-colors hover:cursor-pointer"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="text-red-600 hover:text-red-900 transition-colors hover:cursor-pointer"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableBody;
