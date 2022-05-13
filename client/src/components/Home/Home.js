import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

//Adding material components
import {
    Container,
    Grow,
    Grid,
    Paper,
    AppBar,
    TextField,
    Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

//Importing hook from redux
import { useDispatch } from "react-redux";

//Custom components
import { getPostsBySearch } from "../../actions/posts.js";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination.jsx";

//Adding styles
import useStyles from "./styles.js";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();

    //Query stuff
    const query = useQuery();
    const history = useHistory();
    const page = query.get("page") || 1;
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState("");

    //Initializing id state
    const [currentId, setCurrentId] = useState(null);

    //Defining dispatch
    const dispatch = useDispatch();

    //Search on enter
    const handleKeyPress = (e) => {
        //keycode 13 means enter key
        if (e.which === 13) {
            //Search
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) =>
        setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchPost = () => {
        if (search.trim() || tags) {
            //Dispatch to fetch post
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            history.push(
                `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(
                    ","
                )}`
            );
        } else {
            history.push("/");
        }
    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    className={classes.gridContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={12} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <AppBar
                            className={classes.appBarSearch}
                            position="static"
                            color="inherit"
                        >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Stories"
                                fullWidth
                                onKeyPress={handleKeyPress}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0px" }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button
                                className={classes.searchButton}
                                onClick={searchPost}
                                color="primary"
                                variant="contained"
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                        <Paper elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
