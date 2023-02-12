import React, { useState } from "react";
import ClientService from "./ClientService";

async function getData() {
    let response = await fetch('http://localhost:3000/questions');
    let data = await response.json();
    console.log(data);
}


const QuestionGlobalList = ({}) => {

        const list = [
            {
                id: 1,
                name: "HP",
                price: 555
            },
            {
                id: 1,
                name: "HP",
                price: 555
            },
            {
                id: 1,
                name: "HP",
                price: 555
            }
        ]
        console.log('TESTTXXXX')
        var request = ClientService.getClients();
        request.then((response) =>{
            console.log(response)
            console.log(response.data)
        })


        const [lists] = useState(list)

        console.log('TESTT')
        console.log(getData())

        return(
            <div>
                <table>
                    {
                        lists.map((list) => (
                            <tr>
                                <td>{list.name}</td>
                                <td>{list.price}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
    );
};

export default QuestionGlobalList;