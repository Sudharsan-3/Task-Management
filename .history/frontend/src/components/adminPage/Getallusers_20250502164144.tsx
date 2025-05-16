import React from 'react';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Props {
  value: User[];
}

const Getallusers: React.FC<Props> = ({ value }) => {
  

  const handleShow = (user: User) => {
    console.log("Showing user:", user);
  };

  const handleEdit = (user: User) => {
    console.log("Editing user:", user);
  };

  const handleDelete = (userId: number) => {
    console.log("Deleting user with ID:", userId);
  };

  const handleAddTask = (user: User) => {
    console.log("Adding task for user:", user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
          
        </div>
        <ul className="divide-y divide-gray-200">
          {value.map((user) => (
            <li key={user.id} className="py-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <p className="text-lg font-semibold text-gray-800">Name : {user.name}</p>
                  <p className="text-sm text-gray-600">Email : {user.email}</p>
                  <p className="text-sm text-gray-500 italic">Role : {user.role}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <link></link>
                <button
                    onClick={() => handleAddTask(user)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => handleShow(user)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Show
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </button>
                 
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Getallusers;
