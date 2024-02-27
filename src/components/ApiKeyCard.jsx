
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
const ApiKeyCard = ({ title, name }) => {
    const auth = useContext(AuthContext);
    const [value, setValue] = useState("")
    // keyValue = "aksdfjalksdjflk;sadjflkdasjklf;jasdkl;fj;aslkdjf"

    const handleUpdate = () => {

        if (value) {
            const url = 'http://localhost:3000/api/users/update/keys';
            let data = {};
            data[name] = value;
            axios.patch(url, data, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
                .then((response) => {
                    setValue("")
                    auth.refresh();
                    console.log('Success:', response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }

    }

    return <div>
        <div className="flex flex-row gap-[5px] items-center">
            <h1 className="py-2 font-medium">{title}:</h1>
            <p className="mx-2">{auth.data?.apiKeys[name] ? auth.data.apiKeys[name] : "no value found"}</p>
        </div>

        <div className="flex flex-row gap-[5px]">

            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                required
                className="w-[20rem] appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={`enter new value for ${title.toLowerCase()} api key`}
            />
            <button onClick={handleUpdate}className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                update
            </button>
        </div>
    </div>

}

export default ApiKeyCard;