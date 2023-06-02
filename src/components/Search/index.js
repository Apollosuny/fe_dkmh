import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Search({ onSearch }) {
    return (  
        <div className={cx("search-box")}>
            <input
                type="text"
                onChange={onSearch}
                placeholder="Search ..."
            />
        </div>
    );
}

export default Search;