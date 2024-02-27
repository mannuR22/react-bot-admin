import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const BotConfig = () => {

    const auth = useContext(AuthContext);
    const handleUpdate = () => {
        
        const url = 'http://localhost:3000/api/users/bot/config/refresh';
            let data = {
                enable: (auth?.data?.botStatus === "Not Running")
            };
            axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
                .then((response) => {
                    auth.refresh();
                    console.log('Success:', response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
    };
    return <div className="w-1/3 shadow rounded p-2 flex flex-col">
        <h2 className="font-medium text-lg">Bot Info: </h2>
        <div className="flex flex-row">
            <h2 className="font-medium">Status: </h2>

            <p className={`ml-1 font-medium ${auth?.data?.botStatus === "Not Running"? "text-red-500": "text-green-600"}`}>{auth?.data?.botStatus}</p>
        </div>
        <div className="flex flex-row">
            <h2 className="font-medium">Details: </h2>
            <p className={`ml-1 font-medium ${auth?.data?.isBotConfigDone? "text-green-600": "text-red-500"}`}>{auth?.data?.isBotConfigDone?"Completed": "Not Completed"}</p>
        </div>
        
        <button disabled={!(auth?.data?.isBotConfigDone)} onClick={handleUpdate} className="mt-2 py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-blue-200 disabled:cursor-not-allowed">
            {auth?.data?.botStatus === "Not Running"? "Start Bot" : "Stop Bot"}
        </button>
    </div>
}

export default BotConfig;