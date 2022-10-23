import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ViewContributors from "./components/ViewContributorsModal";
import LoginPage from "./screens/Login";
export default function Navigator() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route path='/main' element={<App />} />

                <Route path='/contributors' element={<ViewContributors />} />

            </Routes>

        </BrowserRouter>
    )
}