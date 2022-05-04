import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const Paginate = () => {
    const classes = useStyles();

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            //Number of pages
            count={5}
            //Current page
            page={1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${1}`}
                />
            )}
        />
    );
};

export default Paginate;