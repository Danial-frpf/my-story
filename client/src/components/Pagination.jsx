import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/posts";

import useStyles from "./styles";

const Paginate = ({ page }) => {
    const classes = useStyles();

    const { numberOfPages } = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page, dispatch]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            //Number of pages
            count={numberOfPages}
            //Current page
            page={Number(page) || 1}
            color="secondary"
            shape="rounded"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    );
};

export default Paginate;
