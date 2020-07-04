import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function ResetPassword(props) {
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

//   console.log(props);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = {
          newPass: password,
          resetLink: props.match.params.token
      };
      await Axios.post("http://localhost:5000/users/ResetPassword", data,);
      const loginRes = await Axios.post("http://localhost:5000/users/ResetPassword", {
        data,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      alert('Your password has been reset, please login')
      history.push("/login");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  useEffect(() => {
        if(password && passwordCheck &&
            (password !== passwordCheck)) {
            setError('The two passwords are not the identical');
        } else {
            setError(undefined);
        }

  }, [password,passwordCheck])

  return (
    <div className="page">
      <h2>Please enter your new password</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>

        <label htmlFor="register-password">New password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Re-type password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}