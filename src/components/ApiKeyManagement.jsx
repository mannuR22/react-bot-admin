import React, { useState } from 'react';
import ApiKeyCard from './ApiKeyCard'
const ApiKeyManagement = () => {
    const [telegramKey, setTelegramKey] = useState('');
    const [openWeatherKey, setOpenWeatherKey] = useState('');
    const [showKeys, setShowKeys] = useState(false);

    return (

        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl mb-2 font-medium">API Keys:</h2>
                <div className='flex flex-col'>

                    <ApiKeyCard name={"weather"} title="Open-Weather" />
                    <ApiKeyCard name={"bot"} title="Telegram-Bot" />

                </div>
        </div>
    );
};

export default ApiKeyManagement;
