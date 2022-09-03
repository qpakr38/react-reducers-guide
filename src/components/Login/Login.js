import React, {useState, useEffect, useReducer, useContext, useRef} from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";
import classes from './Login.module.css';

const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return {value: action.val, isValid: action.val.includes('@')};
    } else if (action.type === "INPUT_BLUR") {
        return {value: state.value, isValid: state.value.includes('@')}
    } else {
        return {value: '', isValid: false};
    }
};
const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return {value: action.val, isValid: action.val.trim().length > 6};
    } else if (action.type === "INPUT_BLUR") {
        return {value: state.value, isValid: state.value.trim().length > 6}
    } else {
        return {value: '', isValid: false};
    }
};
const Login = (props) => {
    const ctx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    //const [enteredEmail, setEnteredEmail] = useState('');
    //const [emailIsValid, setEmailIsValid] = useState();
    //const [enteredPassword, setEnteredPassword] = useState('');
    //const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
            value: '',
            isValid: undefined
        }
    );
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
            value: '',
            isValid: undefined
        }
    );
    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log("Checking form validity!")
            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 500);
        return () => {
            console.log('Effect Clean Up!');
            clearTimeout(identifier)
        };
    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        //setEnteredEmail(event.target.value);
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
        // setFormIsValid(
        //     event.target.value.includes('@') && passwordState.isValid
        // );
    };

    const passwordChangeHandler = (event) => {
        //setEnteredPassword(event.target.value);
        dispatchPassword({type: 'USER_INPUT', val: event.target.value});
        // setFormIsValid(
        //     event.target.value.trim().length > 6 && emailState.isValid
        // );
    };

    const validateEmailHandler = () => {
        //setEmailIsValid(emailState.isValid);
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        //setPasswordIsValid(enteredPassword.trim().length > 6);
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            ctx.onLogin(emailState.val, passwordState.val);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input id='email'
                       ref={emailInputRef}
                       label='E-Mail'
                       type='email'
                       isValid={emailIsValid}
                       value={emailState.value}
                       onChange={emailChangeHandler}
                       onBlur={validateEmailHandler}
                />
                <Input id='password'
                       ref={passwordInputRef}
                       label='Password'
                       type='password'
                       isValid={passwordIsValid}
                       value={passwordState.value}
                       onChange={passwordChangeHandler}
                       onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
