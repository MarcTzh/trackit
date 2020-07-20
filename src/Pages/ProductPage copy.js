import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import UserContext from '../context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import CatMaterialTable from '../Table/CatMaterialTable';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
    //   backgroundColor: theme.palette.background.paper,
      backgroundColor: "#212029"
    },
    inline: {
      display: 'inline',
    },
    paper: {
        padding: theme.spacing(1),
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
        backgroundColor: "#212029",
        // opacity: 0.95,
      },
  }));

 export default function ProductPage() {

    const { userData } = useContext(UserContext);

    const classes = useStyles();

    return (
        <>
            {
                userData.user ? (
                    <div className={classes.paper} style={{ margin: 30 , padding: 30}}>
                        <CatMaterialTable userID = {userData.user.id}/>
                    </div>
                ) : (
                    <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Log in</Link>
                    </>
                )
            }
         </>

    )
}
    