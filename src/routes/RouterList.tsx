import React from "react";
import {Route, Routes} from "react-router-dom";

import MainLayout from "../features/layout-feature/MainLayout";


function RouterList() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}/>
            {/*<Route path="/MainChart" element={<MainChart />}/>*/}
        </Routes>
    );
}

export default RouterList;