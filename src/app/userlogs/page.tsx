import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersLogs = async () => {
  // caching , fetch is static
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    /* cache: "no-store",*/
    next: { revalidate: 10 },
  });
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>In/Out</th>
            <th>Time</th>
            <th>Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersLogs;
