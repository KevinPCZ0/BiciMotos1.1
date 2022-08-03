import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Compras from "./routes/Compras";
import Post from "./routes/Post";
import Ventas from "./routes/Ventas";
import Inicio from "./routes/Inicio";
import NoEncontrada from "./routes/NoEncontrada";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Inicio />} />
                <Route path="Compras" element={<Compras />} />
                <Route path="blog/:id" element={<Post />} />
                <Route path="Ventas" element={<Ventas />} />
                <Route path="*" element={<NoEncontrada />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);
