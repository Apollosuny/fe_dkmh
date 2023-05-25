import axios from "axios";

export async function fetchData() {
    const response = await axios({
        url: 'https://0656-116-96-46-192.ngrok-free.app/getClasses',
        method: 'GET',
        headers: {
            "ngrok-skip-browser-warning": "true",
        }
    });
    return response.data;
}