import React, { useEffect, useState } from "react"

const AsyncAwait = () => {
  const [users, setUsers] = useState([])

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/users/get")
    const data = await response.json()
    setUsers(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
    <table>
        <th>Nazwa</th>
        <th>Punkty</th>
        {
            users.map((user) => (
                <tr>
                    <td>{user.login}</td>
                    <td>{user.points}</td>
                </tr>
            ))
        }
    </table>
</div>
  )
}

export default AsyncAwait