import axios from "axios";

export async function fetchData() {
    const response = await axios.get('https://0656-116-96-46-192.ngrok-free.app/getClasses');
    return response.data;
}