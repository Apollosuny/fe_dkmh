import { useEffect, useRef, useState } from 'react';
import styles from './ClassLimit.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ClassLimit({ checkboxesPerPage, onClick }) {
    const [show, setShow] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setShow(false);
            }
        }
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [selectRef]);

    const handleSelect = (e) => {
        onClick(e.target.value);
        setShow(!show);
    }

    return (  
        <>
            <div ref={selectRef}>
                <div className={cx("number_classes")} onClick={() => setShow(!show)}>
                    <span className={cx('class_per_page')}>{checkboxesPerPage}</span>
                    <div
                        className={cx("select_number_classes")}
                    >
                        <input type="text" disabled={true} style={{ backgroundColor: "transparent" }} />
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
                {show && 
                    (
                        <div className={cx("class_limit")}>
                            <ul className={cx('list_number')}>
                                <li onClick={handleSelect} value='5' className={checkboxesPerPage === 5 ? cx('number', 'active') : cx('number')}>5</li>
                                <li onClick={handleSelect} value='7' className={checkboxesPerPage === 7 ? cx('number', 'active') : cx('number')}>7</li>
                                <li onClick={handleSelect} value='10' className={checkboxesPerPage === 10 ? cx('number', 'active') : cx('number')}>10</li>
                                <li onClick={handleSelect} value='15' className={checkboxesPerPage === 15 ? cx('number', 'active') : cx('number')}>15</li>
                                <li onClick={handleSelect} value='20' className={checkboxesPerPage === 20 ? cx('number', 'active') : cx('number')}>20</li>
                                <li onClick={handleSelect} value='25' className={checkboxesPerPage === 25 ? cx('number', 'active') : cx('number')}>25</li>
                            </ul>
                        </div>
                    )
                }
            </div>
            <span className={cx("notice")}>
                &nbsp;&nbsp;classes per page
            </span>
        </>
    );
}

export default ClassLimit;