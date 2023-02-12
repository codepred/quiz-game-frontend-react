import React, { useEffect, useState } from "react"

const AsyncAwait = () => {
  const [users, setUsers] = useState([])

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/questions")
    const data = await response.json()
    setUsers(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
    <table>
        <th>Pytanie</th>
        <th>Odpowiedzi</th>
        <th>Poprawna Odpowiedzi</th>
        <th>Typ</th>
        <th>Czy bylo juz zadane</th>

        {
            users.map((user) => (
                <tr>
                    <td>{user.question}</td>
                    <td>{user.answerArray}</td>
                    <td>{user.correctAnswerArray}</td>
                    <td>{user.type}</td>
                    <td>{user.wasAnswered}</td>
                </tr>
            ))
        }
    </table>
</div>
  )
}

export default AsyncAwait