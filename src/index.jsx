import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'; // Добавлен useParams для работы с параметрами
import './index.css';
import Wireframe13 from './views/main.jsx'; // Убедитесь, что это правильный путь к компоненту
import './views/main.css';
import './views/main.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Главный маршрут */}
                <Route path="/" element={<Wireframe13 currentPage={1} />} />
                {/* Динамический маршрут для страниц */}
                <Route path="/page/:page" element={<PageWrapper />} />
            </Routes>
        </BrowserRouter>
    );
};

// Компонент-обёртка для извлечения currentPage из параметров URL
const PageWrapper = () => {
    const { page } = useParams(); // Извлекаем параметр page из URL
    const currentPage = parseInt(page, 10) || 1; // Если page не задан, по умолчанию 1
    return <Wireframe13 currentPage={currentPage} />;
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
