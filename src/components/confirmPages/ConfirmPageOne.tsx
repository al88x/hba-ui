import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMemberIdFromToken, isEmployeeNumberValid} from "../../helpers/AsyncJsonFetcher";
import PageNotFound from "../PageNotFound";
import {useForm} from "../../helpers/useForm";
import {PasswordSetUpPage, SetupPasswordMethod} from "./PasswordSetUpPage";
import "../../styles/ConfirmationPageOne.scss"


interface IMemberDetails {
    memberId: number
}

interface IConfirmPageOne {
    employeeNumber: string
}

export function ConfirmPageOne() {
    const {token} = useParams();
    const valuesInitialState = {employeeNumber: ""};
    const {handleChange, handleSubmit, values, errors, handleValidationErrorsAfterSubmit} = useForm(submit, valuesInitialState);
    const [validEmployeeNumber, setValidEmployeeNumber] = useState(false);
    const [memberDetails, setMemberDetails] = useState<IMemberDetails>({memberId: -1});
    const [error, setError] = useState(false);

    useEffect(() => {
        if (token) {
            getMemberIdFromToken(token)
                .then(value => setMemberDetails(value))
                .catch(() => setError(true));
        }
    }, [token]);

    async function submit() {
        if (token) {
            isEmployeeNumberValid(token, values.employeeNumber)
                .then(() => setValidEmployeeNumber(true))
                .catch(value => handleValidationErrorsAfterSubmit(value));
        }
    }

    if (validEmployeeNumber) {
        return <PasswordSetUpPage account={SetupPasswordMethod.NEW}/>;
    }

    if (error) {
        return <PageNotFound/>
    }

    if (memberDetails.memberId > 0) {
        return (
            <section className="confirm-page-one">
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
                <div className="circle-container">
                    <span className="circle current-page"/>
                    <span className="circle"/>
                    <span className="circle"/>
                </div>
            </section>
        )
    }
    return null;
}