import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "30px 0",
        display: "flex",
        padding: "10px 50px",
    },
    title: {
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center",
        },
    },
    heading: {
        color: "rgba(0,183,255, 1)",
        textDecoration: "none",
        [theme.breakpoints.down("xs")]: {
            fontSize: "2.5rem",
        },
    },
    image: {
        marginLeft: "15px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    },
    profile: {
        display: "flex",
    },
    userName: {
        margin: "auto 15px",
    },
    brandContainer: {
        display: "flex",
        alignItems: "center",
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    signInButton: {
        fontSize: "1rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.7rem",
        },
    },
}));
