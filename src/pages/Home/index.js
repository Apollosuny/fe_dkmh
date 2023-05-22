import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useState } from "react";
import Data from "../../Data/getClass.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

function Home() {
    const [subjects, setSubjects] = useState([]);
    const [guid, setGuid] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 7;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = Data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(Data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    let count = (currentPage - 1) * recordsPerPage + 1;

    const handleSubmit = (e) => {
        const body = {
            cookie: Cookies.get("ASC.AUTH"),
            classes_registered: subjects,
            guids_registered: guid,
        };
        console.log(body);

        // fetch('https://be-dkmh.onrender.com/register', {
        fetch("https://ed37-116-96-74-62.ngrok-free.app/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "ngrok-skip-browser-warning": "69420"
            },
            body: JSON.stringify(body),
        });
        // .then((res) => {
        //   // res.redirected('https://sv.isvnu.vn/dashboard.html');
        //   console.log('Remove');
        //   Cookies.remove('ASC.AUTH', { path: '/' });
        // })
        // .catch((err) => console.log('Cannot Remove'));
        // console.log(JSON.stringify(subjects));

        // body {
        //  tên
        //  list môn học: [string]
        //  cookies
        // }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        console.log(value, checked);
        // console.log(value.split(/-(.*)/s));
        let [subjects_value, guid_value] = value.split(/-(.*)/s);
        // console.log(subjects_value, guid_value);
        if (checked) {
            setGuid([...guid, guid_value]);
            setSubjects([...subjects, subjects_value]);
        } else {
            setSubjects(subjects.filter((e) => e !== value));
        }
    };

    const renderClass = () => {
        return records.map((item) => {
            return (
                <tr key={item.course_code}>
                    <td>{count++}</td>
                    <td className={cx('subjects')}>
                        <span className={cx('checkbox')}>
                            <input
                                type="checkbox"
                                name={item.guid}
                                value={`${item.course_code}-${item.guid}`}
                                onChange={handleChange}
                                className={cx("classes-checkbox")}
                            />
                        </span>
                        <span className={cx('subject_name')}>{item.subject_name}</span>
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

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <h1>Học kỳ I (2023-2024)</h1>
                    <div className={cx("content")}>
                        <div className={cx("table-options")}>
                            <div className={cx("option")}>
                                <div className={cx("number_classes")}>
                                    <div
                                        className={cx("select_number_classes")}
                                    >
                                        <input type="text" />
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
                                        <th scope="col">Môn học</th>
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
                            <div className={cx('btn-submit')}>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                        <div className={cx("table-footer")}>
                            <div className={cx("showing-item")}>
                                <span>Showing {firstIndex + 1} to {firstIndex + records.length} of {Data.length} classes</span>
                            </div>
                            <div className={cx("pagination")}>
                                <div className={cx("pagination")}>
                                    {currentPage > 1 && 
                                        <button
                                            className={cx("page-item")}
                                            onClick={prePage}
                                        >
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                    }
                                    {numbers.map((number, index) => (
                                        <button
                                            className={cx("page-item", {
                                                active: currentPage === number,
                                            })}
                                            key={index}
                                            onClick={() => changeCPage(number)}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                    {currentPage < npage && 
                                        <button
                                            className={cx("page-item")}
                                            onClick={nextPage}
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                            />
                                        </button>
                                    }
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
