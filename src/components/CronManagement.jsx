import React, { useContext, useState } from 'react';
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css';
import cronstrue from 'cronstrue';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';


const CronJobManagement = () => {
    const [value, setValue] = useState('* * * * *');
    const auth = useContext(AuthContext);

    const handleUpdate = () => {
        if (value) {
            const url = 'http://localhost:3000/api/users/update/cron';
            let data = {
                cronExp: value
            };

            axios.patch(url, data, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            })
                .then((response) => {
                    setValue('* * * * *')
                    auth.refresh();
                    console.log('Success:', response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }
    return (
        <div className="bg-white p-3 w-2/3 rounded shadow">
            <h2 className="text-xl mb-2 font-medium">Message Frequency: </h2>
            <div className='flex flex-row my-2'>
                <h3 className='font-medium'>Current: </h3>
                <p className='px-2'> {auth.data?.cronExp ? cronstrue.toString(auth.data.cronExp) : "No value found"}</p>
            </div>
            <div className='flex items-center flex-row gap-[5px]'>
                <Cron value={value} setValue={setValue} />
                <button onClick={handleUpdate} className="mb-2 py-1 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Update
                </button>
            </div>
        </div>
    );
};

export default CronJobManagement;
