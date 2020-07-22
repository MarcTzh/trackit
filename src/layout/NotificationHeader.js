import React, { useState } from 'react';
import Home from '../Pages/Home';
import PdtMaterialTable from "../Table/PdtMaterialTable";

export default function NotificationHeader() {
    const [faultyLinks, setFaultyLinks] = useState(0);
    const [priceDrops, setPriceDrops] = useState(0);
    const [notifications, setNotifications] = useState(0);

    return (
        <div>
            <Home setFaultyLinks={setFaultyLinks} setPriceDrops={setPriceDrops} setNotifications={setNotifications}/>
            <PdtMaterialTable faultyLinks={faultyLinks} priceDrops={priceDrops} notifications={notifications}/>
        </div>
    );
    
}