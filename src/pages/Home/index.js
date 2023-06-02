import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import Data from '../../Data/getClass.json';
import Cookies from 'js-cookie';
import axios from 'axios';
import swal from 'sweetalert';
import { fetchData, handleData as HandleData } from './Data/api';
import TableData from '../../components/Tables';
import Search from '../../components/Search';
import ClassLimit from '../../components/ClassLimit';
import CustomPagination from '../../components/CustomPagination';

const cx = classNames.bind(styles);
const main_url = 'https://1bb6-116-96-46-192.ngrok-free.app';
const test_url = 'http://localhost:5000';

function Home() {
    const [classes, setClasses] = useState([]);
    const [checkboxes, setCheckboxes] = useState(HandleData(Data));
    // const [checkboxes, setCheckboxes] = useState([]);
    const [checkboxState, setCheckboxState] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [guid, setGuid] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [checkboxesPerPage, setCheckboxesPerPage] = useState(7);
    const lastIndex = currentPage * checkboxesPerPage;
    const firstIndex = lastIndex - checkboxesPerPage;
    const [search, setSearch] = useState('');
    let count = (currentPage - 1) * checkboxesPerPage + 1;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const handleSetCheckboxesPerPage = (number) => {
        setCheckboxesPerPage(number);
    };

    // useEffect(() => {
    //     fetchData(main_url)
    //         .then(data => setClasses(data));
    // }, []);

    // useEffect(() => {
    //     setCheckboxes(HandleData(classes));
    // }, [classes]);

    const filteredData = checkboxes.filter(
        (item) =>
            item.subject_name.toLowerCase().includes(search.toLowerCase()) ||
            item.course_code.toLowerCase().includes(search.toLowerCase()) ||
            item.lecturer.toLowerCase().includes(search.toLowerCase()),
    );

    const pageCount = Math.ceil(filteredData.length / checkboxesPerPage);
    const numbers = [...Array(pageCount + 1).keys()].slice(1);
    const displayData = filteredData.slice(
        (currentPage - 1) * checkboxesPerPage,
        (currentPage - 1) * checkboxesPerPage + checkboxesPerPage,
    );

    useEffect(() => {
        const newState = {};
        checkboxes.forEach((checkbox) => {
            newState[checkbox.id] = checkbox.isChecked;
        });
        setCheckboxState(newState);
    }, [checkboxes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            cookie: Cookies.get('ASC.AUTH'),
            classes_registered: subjects,
            guids_registered: guid,
        };
        // console.log(body);
        try {
            const response = await axios.post(`${main_url}/register`, body);
            console.log(response.status);
            console.log(response.data);
            if (response.data.status === 200) {
                swal({
                    title: 'Thành Công',
                    text: response.data.message,
                    icon: 'success',
                    button: {
                        text: 'OK',
                        className: cx('btn-success'),
                    },
                });
                setCheckboxes((prevCheckboxes) =>
                    prevCheckboxes.map((checkbox) => {
                        return { ...checkbox, isChecked: false };
                    }),
                );
                setSubjects([]);
                setGuid([]);
            } else if (response.data.status === 400) {
                swal({
                    title: 'Thất bại',
                    text: response.data.message,
                    icon: 'error',
                    button: {
                        text: 'OK',
                        className: cx('btn-success'),
                    },
                });
                setCheckboxes((prevCheckboxes) =>
                    prevCheckboxes.map((checkbox) => {
                        return { ...checkbox, isChecked: false };
                    }),
                );
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
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) =>
                checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox,
            ),
        );

        if (checked) {
            setGuid([...guid, guid_value]);
            setSubjects([...subjects, subjects_value]);
        } else {
            setGuid((pre) => {
                return [...pre.filter((preGuid) => preGuid !== guid_value)];
            });

            setSubjects((pre) => {
                return [...pre.filter((preSubject) => preSubject !== subjects_value)];
            });
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h1>Học kỳ I (2023-2024)</h1>
                    <div className={cx('content')}>
                        <div className={cx('table-options')}>
                            <div className={cx('option')}>
                                <ClassLimit
                                    checkboxesPerPage={checkboxesPerPage}
                                    onClick={handleSetCheckboxesPerPage}
                                />
                            </div>
                            <div className={cx('option')}>
                                <Search onSearch={handleSearch} />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <TableData
                                displayData={displayData}
                                checkboxState={checkboxState}
                                count={count}
                                handleChange={handleChange}
                                filteredData={filteredData}
                            />
                        </form>
                        <div className={cx('table-footer')}>
                            <div className={cx('showing-item')}>
                                <span>
                                    Showing {filteredData.length > 0 ? firstIndex + 1 : 0} to{' '}
                                    {firstIndex + displayData.length} of {filteredData.length} classes
                                </span>
                            </div>
                            <div>
                                <div className={cx('pagination')}>
                                    <CustomPagination
                                        count={numbers.length}
                                        onChange={(e, value) => setCurrentPage(value)}
                                        hidePrevButton={currentPage === 1}
                                        hideNextButton={currentPage === numbers.at(-1)}
                                    />
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
