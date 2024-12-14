import axios from 'axios';

export async function fetchListings(page = 1) {
    try {
        const response = await fetch(`http://localhost:8080/api/listings/top/${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        throw error;
    }
}