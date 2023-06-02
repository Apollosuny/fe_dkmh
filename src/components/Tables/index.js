import { useEffect, useState } from "react";
import { fetchData } from "../../pages/Home/Data/api";
import Data from '../../Data/getClass.json';
import styles from './Tables.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function TableData({ displayData, count, checkboxState, handleChange, filteredData }) {

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
            <div className={cx('table-wrapper')}>
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
            </div>
            {filteredData.length > 0 ? 
                <div className={cx('btn-submit')}>
                    <button type="submit">Submit</button>
                </div> :
                <h4 className={cx('classes_not_found')}>Không có lớp học nào</h4>
            }
        </>
    );
}

export default TableData;