import axios from "axios";

export async function fetchData(url) {
    const response = await axios({
        url: `${url}/getClasses`,
        method: 'GET',
        headers: {
            "ngrok-skip-browser-warning": "true",
        }
    });
    return response.data;
}

export function handleData(data) {
    return data.map((item) => {
                return {
                    id: item.course_code,
                    subject_name: item.subject_name,
                    course_code: item.course_code,
                    class_code: item.class_code,
                    guid: item.guid,
                    room: item.room,
                    time_slot: item.time_slot,
                    lecturer: item.lecturer,
                    from_to: item.from_to,
                    isChecked: false
                };
            });
}