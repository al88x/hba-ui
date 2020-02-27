import React, {Dispatch, SetStateAction, useState} from "react";
import {IMember} from "./MemberDetailsPage";
import "../../styles/EditMember.scss"
import {useForm} from "../../helpers/useForm";
import {asyncJSONPostFetch} from "../../helpers/AsyncJsonFetcher";

interface IEditMemberProps {
    member: IMember,
    setMember: Dispatch<SetStateAction<IMember>> | any,
    setMemberUpdated: Dispatch<SetStateAction<boolean>>
}

export function EditMember(props: IEditMemberProps) {
    const valuesInitialInputState = props.member;
    const [editMember, setEditMember] = useState(false);
    const {handleChange, handleSubmit, values, errors, handleValidationErrorsAfterSubmit, serverError, setServerError} = useForm(submit, valuesInitialInputState);

    async function submit() {
        const data = {
            id: values.id,
            firstName: values.firstName,
            lastName: values.lastName,
            employeeNumber: values.employeeNumber,
            email: values.email,
            username: values.username,
            shift: values.shift,
            jobRole: values.jobRole,
            department: values.department,
            area: values.area,
        };
        const response = await asyncJSONPostFetch("http://localhost:8080/admin/members/update", JSON.stringify(data));
        if (response.status === 200) {
            props.setMemberUpdated(true);
            setEditMember(false);
        } else if (response.status === 400) {
            response.json()
                .then(value => handleValidationErrorsAfterSubmit(value));
        } else {
            setServerError(true);
        }
    }

    return (
        <div className="edit-member-container">
            <p className="edit-member-subtitle">MEMBER INFO</p>
            {(editMember) ? editComponent() : infoComponent()}
            <button className={editMember ? "invisible" : "edit-member-button"} onClick={() => setEditMember(true)}>Edit
                member
            </button>
            <button className={editMember ? "edit-member-button cancel" : "invisible"}
                    onClick={() => setEditMember(false)}>Cancel
            </button>
            <button className={editMember ? "edit-member-button" : "invisible"} onClick={handleSubmit}>Confirm</button>
            <p className={serverError ? "server-error" : "server-error invisible"}>Error submitting your request. Please
                try again later</p>
        </div>
    );

    function editComponent() {
        return (
            <div>
                <div className="edit-member-line">
                    <label>First Name: </label>
                    <div className="edit-input-container">
                        <input className={`${errors.firstName ? "input invalid" : "input"}`}
                               type="text"
                               data-testid="FirstName"
                               value={values.firstName}
                               name="firstName"
                               onChange={handleChange}/>
                        <p className={`${errors.firstName && "error"}`}>{errors.firstName}</p>
                    </div>
                </div>
                <div className="edit-member-line">
                    <label>Last Name: </label>
                    <div className="edit-input-container">
                        <input className={`${errors.lastName ? "input invalid" : "input"}`}
                               type="text"
                               name="lastName"
                               data-testid="LastName"
                               value={values.lastName}
                               onChange={handleChange}/>
                        <p className={`${errors.lastName && "error"}`}>{errors.lastName}</p>
                    </div>
                </div>

                <div className="edit-member-line">
                    <label>Username: </label>
                    <div className="edit-input-container">
                        <input className={`${errors.username ? "input invalid" : "input"}`} type="text"
                               data-testid="Username"
                               name="username"
                               value={values.username}
                               onChange={handleChange}/>
                        <p className={`${errors.username && "error"}`}>{errors.username}</p>
                    </div>
                </div>

                <div className="edit-member-line">
                    <label>Employee number: </label>
                    <div className="edit-input-container">
                        <input className={`${errors.employeeNumber ? "input invalid" : "input"}`}
                               type="text"
                               name="employeeNumber"
                               data-testid="EmployeeNumber"
                               value={values.employeeNumber}
                               onChange={handleChange}/>
                        <p className={`${errors.employeeNumber && "error"}`}>{errors.employeeNumber}</p>
                    </div>
                </div>

                <div className="edit-member-line">
                    <label>Email: </label>
                    <div className="edit-input-container">
                        <input className={`${errors.email ? "input invalid" : "input"}`}
                               type="text"
                               name="email"
                               data-testid="Email"
                               value={values.email}
                               onChange={handleChange}/>
                        <p className={`${errors.email && "error"}`}>{errors.email}</p>
                    </div>
                </div>

                <div className="edit-member-line">
                    <label>Shift: </label>
                    <div className="edit-input-container">
                        <select name="shift" onChange={handleChange} value={values.shift}
                                className={`${errors.shift ? "select invalid-select" : "select"}`}>
                            <option value="">SELECT</option>
                            <option value="DAYS1">Days 1</option>
                            <option value="DAYS2">Days 2</option>
                            <option value="NIGHTS1">Nights 1</option>
                            <option value="NIGHTS2">Nights 2</option>
                        </select>
                        <p className={`${errors.shift && "error"}`}>{errors.shift}</p>
                    </div>
                </div>

                <div className="edit-member-line">
                    <label>Job Role: </label>
                    <div className="edit-input-container">
                        <select name="jobRole" onChange={handleChange} value={values.jobRole}
                                className={`${errors.jobRole ? "select invalid-select" : "select"}`}>
                            <option value="">SELECT</option>
                            <option value="TM1">Team Member 1</option>
                            <option value="TM2">Team Member 2</option>
                            <option value="ATM">Advanced Team Member</option>
                            <option value="MANAGER">Team Manager</option>
                        </select>
                        <p className={`${errors.jobRole && "error"}`}>{errors.jobRole}</p>
                    </div>
                </div>
                <div className="edit-member-line">
                    <label>Department: </label>
                    <div className="edit-input-container">
                        <select name="department" onChange={handleChange} value={values.department}
                                className={`${errors.department ? "select invalid-select" : "select"}`}>
                            <option value="">SELECT</option>
                            <option value="BISCUITS">Biscuits</option>
                            <option value="RICHTEA">RichTea</option>
                            <option value="SNACKS">Snacks</option>
                        </select>
                        <p className={`${errors.department && "error"}`}>{errors.department}</p>
                    </div>
                </div>
                <div className="edit-member-line">
                    <label>Area: </label>
                    <div className="edit-input-container">
                        <select name="area" onChange={handleChange} value={values.area}
                                className={`${errors.area ? "select invalid-select" : "select"}`}>
                            <option value="">SELECT</option>
                            <option value="MIXING_ROOM">Mixing Room</option>
                            <option value="PROCESS">Process</option>
                            <option value="PACKING_HALL">Packing Hall</option>
                        </select>
                        <p className={`${errors.area && "error"}`}>{errors.area}</p>
                    </div>
                </div>
            </div>

        );
    }

    function infoComponent() {
        return (
            <div>
                <div className="edit-member-line">
                    <label className="label">First Name: </label>
                    <p className="edit-member-value">{props.member.firstName}</p>
                </div>
                <div className="edit-member-line">
                    <label>Last Name: </label>
                    <p className="edit-member-value">{props.member.lastName}</p>
                </div>
                <div className="edit-member-line">
                    <label>Username: </label>
                    <p className="edit-member-value">{props.member.username}</p>
                </div>
                <div className="edit-member-line">
                    <label>Employee number: </label>
                    <p className="edit-member-value">{props.member.employeeNumber}</p>
                </div>
                <div className="edit-member-line">
                    <label>Email: </label>
                    <p className="edit-member-value">{props.member.email}</p>
                </div>
                <div className="edit-member-line">
                    <label>Shift: </label>
                    <p className="edit-member-value">{props.member.shift}</p>
                </div>
                <div className="edit-member-line">
                    <label>Job Role: </label>
                    <p className="edit-member-value">{props.member.jobRole}</p>
                </div>
                <div className="edit-member-line">
                    <label>Department: </label>
                    <p className="edit-member-value">{props.member.department}</p>
                </div>
                <div className="edit-member-line">
                    <label>Area: </label>
                    <p className="edit-member-value">{props.member.area}</p>
                </div>
            </div>
        );
    }
}