
import React, { useEffect, useState } from 'react';
import ApiKeyManagement from '../components/ApiKeyManagement';
import CronJobManagement from '../components/CronManagement';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import UserManagement from '../components/UsersManagement';
import BotConfig from '../components/BotConfig';

const AdminPanel = () => {


    const auth = useContext(AuthContext);
    

    useEffect(() => {
        auth.refresh();
    }, [])


    return (
        <div className='w-screen h-screen px-[2rem] flex flex-col'>
            <div className='flex flex-row justify-between items-center px-[1rem] h-[4rem]'>
                <h1 className='text-2xl font-bold'>Admin Panel</h1>
                <button onClick={() => auth.logout()} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Logout
                </button>
            </div>
            <div className='grow flex flex-col'>
                <div className='w-full px-4'>
                    <ApiKeyManagement weather={auth.data?.apiKeys?.weather} bot={auth.data?.apiKeys?.bot} keyExist={false} />
                </div>
                <div className='w-full flex flex-row gap-2 py-2 px-4'>
                    <CronJobManagement />
                    <BotConfig />
                </div>
                <div className='flex pb-2 grow px-4'>
                    <UserManagement />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
