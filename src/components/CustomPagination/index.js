import { Pagination } from "@mui/material";
import './CustomPagination.scss';

const CustomPagination = ({ count, page, onChange, hidePrevButton, hideNextButton }) => {
    return (
        <Pagination
            count={count}
            page={page}
            onChange={onChange}
            classes={{
                root: "custom-pagination",
            }}
            hidePrevButton={hidePrevButton}
            hideNextButton={hideNextButton}
        />
    );
};

export default CustomPagination;
