import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import Data from "../../Data/getClass.json";
import Cookies from 'js-cookie';
import axios from "axios";
import swal from "sweetalert";
import { Pagination } from "@mui/material";

const cx = classNames.bind(styles);

function Home() {
    const [checkboxes, setCheckboxes] = useState(Data.map((item) => {
        return {
            id: item.class_code,
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
    }));
    const [checkboxState, setCheckboxState] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [guid, setGuid] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [checkboxesPerPage, setCheckboxesPerPage] = useState(7);
    const lastIndex = currentPage * checkboxesPerPage;
    const firstIndex = lastIndex - checkboxesPerPage;
    const npage = Math.ceil(checkboxes.length / checkboxesPerPage);
    const [search, setSearch] = useState('');
    let count = (currentPage - 1) * checkboxesPerPage + 1;


    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    }

    const filteredData = checkboxes.filter((item) => 
        item.subject_name.toLowerCase().includes(search.toLowerCase()) ||
        item.course_code.toLowerCase().includes(search.toLowerCase()) ||
        item.lecturer.toLowerCase().includes(search.toLowerCase()) 
    );

    useEffect(() => {
        const newState = {};
        checkboxes.forEach(checkbox => {
            newState[checkbox.id] = checkbox.isChecked;
        });
        setCheckboxState(newState);
    }, [checkboxes]);


    const pageCount = Math.ceil(filteredData.length / checkboxesPerPage);
    const numbers = [...Array(pageCount + 1).keys()].slice(1);
    console.log(numbers);
    const displayData = filteredData.slice((currentPage - 1) * checkboxesPerPage, (currentPage - 1) * checkboxesPerPage + checkboxesPerPage);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            cookie: Cookies.get("ASC.AUTH"),
            classes_registered: subjects,
            guids_registered: guid,
        };
        // console.log(body);
        try {
            // const response = await axios.post('http://localhost:5000/register', body);
            const response = await axios.post('https://be-dkmh.onrender.com/register', body);
            // console.log(response);
            // console.log(response.data);
            if (response.data.status === 200) {
                swal(
                    {
                        title: "Thành Công",
                        text: response.data.message,
                        icon: "success",
                        button: {
                            text: "OK",
                            className: cx('btn-success'),
                        }
                    }
                )
                setCheckboxes(prevCheckboxes => prevCheckboxes.map(checkbox => {
                    return {...checkbox, isChecked: false}
                }));
                setSubjects([]);
                setGuid([]);
            } else if (response.data.status === 400) {
                swal(
                    {
                        title: "Thất bại",
                        text: response.data.message,
                        icon: "error",
                        button: {
                            text: "OK",
                            className: cx('btn-success'),
                        }
                    }
                )
                setCheckboxes(prevCheckboxes => prevCheckboxes.map(checkbox => {
                    return {...checkbox, isChecked: false}
                }));
                setSubjects([]);
                setGuid([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Separate the classes and guids, save the checkbox
    const handleChange = (e, id) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked);
        let [subjects_value, guid_value] = value.split(/-(.*)/s);
        setCheckboxes(prevCheckboxes => prevCheckboxes.map(checkbox => checkbox.id === id ? {...checkbox, isChecked: !checkbox.isChecked} : checkbox));
        
        if (checked) {
            setGuid([...guid, guid_value]);
            setSubjects([...subjects, subjects_value]);
        } else {
            setGuid(pre => {
                return [...pre.filter(preGuid => preGuid !== guid_value)];
            });

            setSubjects(pre => {
                return [...pre.filter(preSubject => preSubject !== subjects_value)];
            });
        }
    };

    // Handle Pagination
    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCPage = (n) => {
        setCurrentPage(n);
    };

    // render data 
    const renderClass = () => {
        return displayData.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{count++}</td>
                    <td className={cx('subjects')}>
                        <div className={cx('subject_wrapper')}>
                            <div className={cx('subject_inner')}>
                                <span className={cx('checkbox')}>
                                    <input
                                        type="checkbox"
                                        name={item.guid}
                                        value={`${item.course_code}-${item.guid}`}
                                        onChange={(e) => handleChange(e, item.id)}
                                        className={cx("classes-checkbox")}
                                        checked={checkboxState[item.id] || false}
                                    />
                                </span>
                                <span className={cx('subject_name')}>{item.subject_name}</span>
                            </div>
                        </div>
                    </td>
                    <td>{item.course_code}</td>
                    <td>{item.room}</td>
                    <td>{item.time_slot}</td>
                    <td>{item.lecturer}</td>
                    <td>{item.from_to}</td>
                </tr>
            );
        });
    };

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <h1>Học kỳ I (2023-2024)</h1>
                    <div className={cx("content")}>
                        <div className={cx("table-options")}>
                            <div className={cx("option")}>
                                <div className={cx("number_classes")}>
                                    <span className={cx('class_per_page')}>{checkboxesPerPage}</span>
                                    <div
                                        className={cx("select_number_classes")}
                                    >
                                        <input type="text"  />
                                        <span className={cx("icon-down")}>
                                            <svg
                                                height="20"
                                                width="20"
                                                viewBox="0 0 20 20"
                                                aria-hidden="true"
                                                focusable="false"
                                                className="css-8mmkcg"
                                            >
                                                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <span className={cx("notice")}>
                                    &nbsp;&nbsp;classes per page
                                </span>
                            </div>
                            <div className={cx("option")}>
                                <div className={cx("search-box")}>
                                    <input
                                        type="text"
                                        onChange={handleSearch}
                                        placeholder="Search ..."
                                    />
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <table className={cx("table-content")}>
                                <thead className={cx("table-content-header")}>
                                    <tr role="row">
                                        <th scope="col">#</th>
                                        <th scope="col" className={cx('subject-header')}>Môn học</th>
                                        <th scope="col">Mã lớp học</th>
                                        <th scope="col">Phòng học</th>
                                        <th scope="col">Lịch học</th>
                                        <th scope="col">Giảng viên</th>
                                        <th scope="col">Thời gian</th>
                                    </tr>
                                </thead>
                                <tbody className={cx("table-content-body")}>
                                    {renderClass()}
                                </tbody>
                            </table>
                            {filteredData.length > 0 ? 
                                <div className={cx('btn-submit')}>
                                    <button type="submit">Submit</button>
                                </div> :
                                <h4 className={cx('classes_not_found')}>Không có lớp học nào</h4>
                            }
                        </form>
                        <div className={cx("table-footer")}>
                            <div className={cx("showing-item")}>
                                <span>Showing {filteredData.length > 0 ? firstIndex + 1 : 0} to {firstIndex + displayData.length} of {filteredData.length} classes</span>
                            </div>
                            <div>
                                <div className={cx("pagination")}>
                                    <Pagination count={numbers.length} onChange={(e, value) => changeCPage(value)}  />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
