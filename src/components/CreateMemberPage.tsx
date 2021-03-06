import React, {useState} from "react";
import "../styles/CreateMemberPage.scss"
import {asyncJSONPostFetch} from "../helpers/AsyncJsonFetcher";
import {useForm} from "../helpers/useForm";
import {Redirect} from "react-router-dom";


interface ICreateMemberForm {
    firstName: string,
    lastName: string,
    employeeNumber: string,
    email: string
}

export default function CreateMemberPage() {

    const valuesInitialState: ICreateMemberForm = {
        firstName: "",
        lastName: "",
        employeeNumber: "",
        email: ""
    };

    const {handleChange, handleSubmit, values, errors, handleValidationErrorsAfterSubmit} = useForm(submit, valuesInitialState);
    const [userId, setUserId] = useState(-1);
    const [serverError, setServerError] = useState(false);

    async function submit() {
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            employeeNumber: values.employeeNumber,
            email: values.email
        };
        const response = await asyncJSONPostFetch(`${process.env.REACT_APP_HBA_API_URL}/admin/members/create`, JSON.stringify(data));
        if (response.status === 200) {
            response.json()
                .then(value => setUserId(value.userId));
        } else if (response.status === 400) {
            response.json()
                .then(value => handleValidationErrorsAfterSubmit(value));
        } else {
            setServerError(true);
        }

    }

    if (userId > 0) {
        return <Redirect to={`/admin/members/${userId}`}/>
    }

    return (
        <section className="create-member-page">
            <h1>Create member</h1>
            <div>
                <label>First Name</label>
                <input className={`${errors.firstName ? "input invalid" : "input"}`}
                       type="text"
                       data-testid="FirstName"
                       value={values.firstName}
                       name="firstName"
                       onChange={handleChange}/>
                <p className={`${errors.firstName && "error"}`}>{errors.firstName}</p>

                <label>Last Name</label>
                <input className={`${errors.lastName ? "input invalid" : "input"}`}
                       type="text"
                       name="lastName"
                       data-testid="LastName"
                       value={values.lastName}
                       onChange={handleChange}/>
                <p className={`${errors.lastName && "error"}`}>{errors.lastName}</p>

                <label>Employee number</label>
                <input className={`${errors.employeeNumber ? "input invalid" : "input"}`}
                       type="text"
                       name="employeeNumber"
                       data-testid="EmployeeNumber"
                       value={values.employeeNumber}
                       onChange={handleChange}/>
                <p className={`${errors.employeeNumber && "error"}`}>{errors.employeeNumber}</p>

                <label>Email</label>
                <input className={`${errors.email ? "input invalid" : "input"}`}
                       type="text"
                       name="email"
                       data-testid="Email"
                       value={values.email}
                       onChange={handleChange}/>
                <p className={`${errors.email && "error"}`}>{errors.email}</p>

                <button className="submit" data-testid="SubmitButton" onClick={handleSubmit}>Submit</button>

                <p className={serverError ? "server-error visible" : "server-error"}>Error submitting your request.
                    Please try again later</p>
            </div>
        </section>
    );
}