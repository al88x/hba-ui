import React from "react";
import {useForm} from "../../helpers/useForm";
import "../../styles/ConfirmPageThree.scss"
import {saveMemberDetails} from "../../helpers/AsyncJsonFetcher";
import {IConfirmPageProps} from "./ConfirmPageTwo";


interface IConfirmPageThree {
    shift: string,
    jobRole: string,
    department:string,
    area:string
}

export function ConfirmPageThree(props: IConfirmPageProps) {

    const valuesInitialState: IConfirmPageThree = {shift:"", jobRole:"", department:"", area:""};
    const {handleChange, handleSubmit, values, errors, serverError, setServerError, submittedSuccessfully, setSubmittedSuccessfully} = useForm(submit, validateCreateMemberForm, valuesInitialState);

    function validateCreateMemberForm(values: IConfirmPageThree) {
        let errors = {hasErrors: false, shift:"", jobRole:"", department:"", area:""};

        if (values.shift.length === 0) {
            errors.shift = "Please select your shift";
            errors.hasErrors = true;
        }
        if (values.jobRole.length === 0) {
            errors.jobRole = "Please select your role";
            errors.hasErrors = true;
        }
        if (values.department.length === 0) {
            errors.department = "Please select your department";
            errors.hasErrors = true;
        }
        if (values.area.length === 0) {
            errors.area = "Please select your area";
            errors.hasErrors = true;
        }
        if (errors.hasErrors) {
            return errors;
        }
        return {};
    }

    function submit() {
        const data = {token: props.token, shift: values.shift, jobRole:values.jobRole, department:values.department, area:values.area};
        saveMemberDetails(JSON.stringify(data))
            .then(()=> setSubmittedSuccessfully(true))
            .catch(()=>setServerError(true))
    }

    return (
        <section className="confirm-page-three">
            <h1>Employee details</h1>

            <label>Shift</label>
            <select name="shift" onChange={handleChange} className={`${errors.shift ? "select invalid-select" : "select"}`}>
                <option>SELECT</option>
                <option value="DAYS1">Days 1</option>
                <option value="DAYS2">Days 2</option>
                <option value="NIGHTS1">Nights 1</option>
                <option value="NIGHTS2">Nights 2</option>
            </select>
            <p className={`${errors.shift && "error"}`}>{errors.shift}</p>

            <label>Role</label>
            <select name="jobRole" onChange={handleChange} className={`${errors.jobRole ? "select invalid-select" : "select"}`}>
                <option>SELECT</option>
                <option value="TM1">Team Member 1</option>
                <option value="TM2">Team Member 2</option>
                <option value="ATM">Advanced Team Member</option>
                <option value="MANAGER">Team Manager</option>
            </select>
            <p className={`${errors.jobRole && "error"}`}>{errors.jobRole}</p>

            <label>Department</label >
            <select name="department" onChange={handleChange} className={`${errors.department ? "select invalid-select" : "select"}`}>
                <option>SELECT</option>
                <option value="BISCUITS">Biscuits</option>
                <option value="RICHTEA">RichTea</option>
                <option value="SNACKS">Snacks</option>
            </select>
            <p className={`${errors.department && "error"}`}>{errors.department}</p>

            <label>Area</label>
            <select name="area" onChange={handleChange} className={`${errors.area ? "select invalid-select" : "select"}`}>
                <option>SELECT</option>
                <option value="MIXING_ROOM">Mixing Room</option>
                <option value="PROCESS">Process</option>
                <option value="PACKING_HALL">Packing Hall</option>
            </select>
            <p className={`${errors.area && "error"}`}>{errors.area}</p>

            <button className="submit" data-testid="SubmitButton" onClick={handleSubmit}>Submit</button>

            <div className={submittedSuccessfully ? "submit" : "submit invisible"}>
                <p className="account-created">Account successfully created.</p>
                <a href="/" className="homepage-link">Go to Homepage</a>
            </div>
            <p className={serverError ? "server-error visible" : "server-error"}>Error submitting your request. Please
                try again later</p>

            <div className="circle-container">
                <span className="circle"/>
                <span className="circle"/>
                <span className="circle current-page"/>
            </div>

        </section>
    );
}