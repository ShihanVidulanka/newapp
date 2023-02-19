import React, { useState } from "react";
import axios from "axios";
function DataFetching() {
    const [dataItems, setDataItems] = useState([]);
    const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1/users");
    const [column, setColumn] = useState([]);
    const [error, setError] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .get(url)
            .then((res) => {
                console.log(res);
                if (Array.isArray(res.data)){   //if the response is a array of json objects.
                    isJsonObject(res.data[0]);
                    setDataItems(res.data);
                    setColumn(Object.keys(res.data[0]));
                }else{  //if the response is only a json object
                    setDataItems(new Array(res.data));
                    setColumn(Object.keys(res.data));
                }
                setError('');
            })
            .catch((err) => {
                console.log(err);
                setError(err);
                setDataItems([]);
                setColumn([]);
            });
    };

    // get table heading data
    const ThData = () => {
        return column.map((data) => {
            return <th key={data}>{data}</th>;
        });
    };
    // get table row data
    const tdData = () => {
        return dataItems.map((data) => {
            return (
                <tr key = {data.id+1000} >
                    {column.map((v) => {
                        return <td key = {data.id + v}>{JSON.stringify(data[v]).replace(/"/g, " ")}</td>;
                    })}
                </tr>
            );
        });
    };

    //  check is the object is json or not.
    function isJsonObject(strData) {
        try {
            JSON.parse(strData);
        } catch (e) {
            return false;
        }
        return true;
    };

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
                    <div>
                        {error !== '' && <p>{error.message}</p>}
                    </div>
                </form>
            </div>
            <div>
                <table className="table table-bordered table-striped table-dark" variant="dark" size="sm">
                    <thead>
                        <tr >{ThData()}</tr>
                    </thead>
                    <tbody>
                        {tdData()}
                    </tbody>
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