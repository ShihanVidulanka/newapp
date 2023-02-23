import React, { useState } from "react";
import axios from "axios";
function DataFetching() {
    const [dataItems, setDataItems] = useState([]);
    const [url, setUrl] = useState(
        "https://jsonplaceholder.typicode.com/users"
    );
    const [row, setRow] = useState([])
    const [column, setColumn] = useState([]);
    const [error, setError] = useState("");
    const [transpose, setTranspose] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .get(url)
            .then((res) => {
                console.log(res);
                handelArray(res.data)
                setError("");
            })
            .catch((err) => {
                console.log(err);
                setError(err);
                setDataItems([]);
                setRow([]);
                setColumn([]);
                setTranspose(false);
            });
    };
    const handelArray = (data) => {
        if (Array.isArray(data)) {
            //if the response is a array of json objects.
            isJsonObject(data[0]);
            setDataItems(data);
            setRow(data)
            setColumn(Object.keys(data[0]));
            setTranspose(false);
            console.log(row)
        } else {
            //if the response is only a json object
            const info = new Array(data);
            setDataItems(info);
            setRow(info);
            setColumn(Object.keys(data));
        }
    }
    // get table heading data
    const ThData = () => {
        return column.map((data) => {
            return <th key={data}>{data}</th>;
        });
    };
    // get table row data
    const tdData = () => {
        return row.map((data) => {
            return (
                <tr key={data.id + 1000}>
                    {column.map((v) => {
                        return (
                            <td key={data.id + v}>
                                {JSON.stringify(data[v]).replace(/"/g, " ")}
                            </td>
                        );
                    })}
                </tr>
            );
        });
    };

    const handleTranspose = () => {
        if (!transpose) {
            var rows = new Array();
            dataItems.forEach(function (_value, i) {
                for (const [key, value]  of Object.entries(_value)) {
                    rows.push({
                        "id" : key + i,
                        "key": key,
                        "value": value
                    });
                }
                rows.push({
                    "id" : i,
                    "key": "",
                    "value": ""
                })
            });
            setColumn(["key", "value"]);
            setRow(rows);
            setTranspose(!transpose);
        } else {
            handelArray(dataItems)
        }
    };

    //  check is the object is json or not.
    function isJsonObject(strData) {
        try {
            JSON.parse(strData);
        } catch (e) {
            return false;
        }
        return true;
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                    <input type="button" value="Transpose" onClick={handleTranspose} />

                    <div>{error !== "" && <p>{error.message}</p>}</div>
                </form>
            </div>
            <div>
                <table
                    className="table table-bordered table-striped table-dark"
                    variant="dark"
                    size="sm"
                >
                    <thead>
                        <tr>{ThData()}</tr>
                    </thead>
                    <tbody>{tdData()}</tbody>
                </table>
            </div>
        </div>
    );
}

export default DataFetching;

// https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/photos
// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/albums
// https://jsonplaceholder.typicode.com/todos
// https://jsonplaceholder.typicode.com/comments

// https://jsonplaceholder.typicode.com/
// http://validate.jsontest.com/?json=%7B%22key%22:%22value%22%7D