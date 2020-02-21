import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMemberIdFromToken, isEmployeeNumberValid} from "../helpers/AsyncJsonFetcher";
import PageNotFound from "./PageNotFound";
import {useForm} from "../helpers/useForm";
import {ConfirmPageTwo} from "./ConfirmPageTwo";
import "../styles/ConfirmationPageOne.scss"


interface IMemberDetails {
    memberId: number
}

interface IConfirmPageOne {
    employeeNumber: string
}

export function ConfirmPageOne() {
    const {token} = useParams();
    const valuesInitialState = {employeeNumber: ""};
    const {handleChange, handleSubmit, values, errors, handleErrorsAfterSubmit} = useForm(submit, validateConfirmPageOneForm, valuesInitialState);
    const [validEmployeeNumber, setValidEmployeeNumber] = useState(false);
    const [memberDetails, setMemberDetails] = useState<IMemberDetails>({memberId: -1});
    const [error, setError] = useState(false);

    useEffect(() => {
        if (token) {
            getMemberIdFromToken(token)
                .then(value => setMemberDetails(value))
                .catch(() => setError(true));
        }
    }, []);

    function validateConfirmPageOneForm(values: IConfirmPageOne) {
        let errors = {hasErrors: false, employeeNumber: ""};
        if (values.employeeNumber.length === 0) {
            errors.employeeNumber = "Employee number cannot be empty";
            errors.hasErrors = true;
        } else if (isNaN(+values.employeeNumber)) {
            errors.employeeNumber = "Employee number should be a number";
            errors.hasErrors = true;
        }
        if(errors.hasErrors){
            return errors;
        }
        return {};
    }

    async function submit() {
        if(token){
            isEmployeeNumberValid(token, values.employeeNumber)
                .then(() => setValidEmployeeNumber(true))
                .catch(value => handleErrorsAfterSubmit(value))
        }
    }
    if(validEmployeeNumber && token){
        return <ConfirmPageTwo token={token}/>;
    }

    if (error) {
        return <PageNotFound/>
    }

    if (memberDetails.memberId > 0) {
        return (
            <div className="confirm-page-one">
                <h1>Finish registration</h1>
                <label>Employee number</label>
                <input className={`${errors.employeeNumber ? "input invalid" : "input"}`}
                       type="text"
                       name="employeeNumber"
                       data-testid="EmployeeNumber"
                       value={values.employeeNumber}
                       onChange={handleChange}/>
                <p className={`${errors.employeeNumber && "error"}`}>{errors.employeeNumber}</p>
                <button className="submit" data-testid="SubmitButton" onClick={handleSubmit}>Submit</button>
            </div>)
    }
    return null;
}