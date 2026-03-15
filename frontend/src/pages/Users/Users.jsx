import { useEffect, useState } from "react";
import "../Users/Users.css";

function Users() {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("http://localhost:5000/api/users")
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch((err) => setError(err.message));
	}, []);

	return (
		<div className="users-container">
			<h1>Users</h1>
			{error && <p className="error-message">{error}</p>}
			<table className="users-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Full Name</th>
						<th>Email</th>
						<th>Created At</th>
					</tr>
				</thead>
				<tbody>
					{users.length === 0 ? (
						<tr>
							<td colSpan="4" className="no-users">
								No users found
							</td>
						</tr>
					) : (
						users.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.full_name}</td>
								<td>{user.email}</td>
								<td>{user.created_at}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default Users;
