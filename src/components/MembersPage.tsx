import React, {useEffect, useState} from "react";
import "../styles/MembersPage.scss"
import {getMemberList, getMembersWithFilter} from "../helpers/AsyncJsonFetcher";
import {useForm} from "../helpers/useForm";

interface IMember {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
}

enum IFilter {
    NAME = "name",
    EMPLOYEE_NUMBER = "employee-number"
}

interface ISearchForm {
    searchValue: string,
    filter: IFilter
}

export function MembersPage() {
    const valuesInitialState: ISearchForm = {
        searchValue: "",
        filter: IFilter.NAME
    };
    const {handleChange, handleSubmit, values, errors} = useForm(submit, validateSearchForm, valuesInitialState);
    const [members, setMembers] = useState<IMember[]>([]);
    const [notFoundMessage, setNotFoundMessage] = useState("");

    useEffect(() => {
            getMemberList()
                .then(jsonResponse => setMembers(jsonResponse.items));
    }, []);

    function validateSearchForm(values: ISearchForm) {
        let errors = {hasErrors: false, searchValue: ""};
        if (values.searchValue.length === 0) {
            errors.searchValue = "Search value should not be empty";
            errors.hasErrors = true;
        } else if (values.filter === IFilter.EMPLOYEE_NUMBER && isNaN(+values.searchValue)) {
            errors.searchValue = "Search value should be a number";
            errors.hasErrors = true;
        }
        if (errors.hasErrors) {
            return errors;
        }
        return {};
    }

    function submit() {
        getMembersWithFilter(values.searchValue, values.filter)
            .then(jsonResponse => setMembers(jsonResponse))
            .catch(() => setNotFoundMessage("No match found..."));
    }


    return (
        <div className="members-page">
            <div className="createUser-form-container">

                <a href="/admin/members/create" className="create-member">Create member</a>

                <form className="search-form" onSubmit={event => {
                    event.preventDefault();
                    handleSubmit()
                }}>

                    <input className="members-page-search" type="text" placeholder="Search member"
                           name="searchValue"
                           value={values.searchValue}
                           onChange={handleChange}/>
                    <p className={errors.searchValue && "error-message"}>{errors.searchValue}</p>
                    <p className={(notFoundMessage && !errors.searchValue) ? "error-message" : "invisible"}>{notFoundMessage}</p>

                    <div className="radio-container">
                        <label className="radio-label">Name
                            <input className="radio-button" type="radio"
                                   checked={values.filter === IFilter.NAME}
                                   name="filter"
                                   value={IFilter.NAME}
                                   onChange={handleChange}/>
                        </label>
                        <label className="radio-label">Employee number
                            <input className="radio-button" type="radio"
                                   checked={values.filter === IFilter.EMPLOYEE_NUMBER}
                                   name="filter"
                                   value={IFilter.EMPLOYEE_NUMBER}
                                   onChange={handleChange}/>
                        </label>
                    </div>
                </form>

                <button className="submit-button" onClick={handleSubmit}>
                    <svg type="submit" className="search-button" xmlns="http://www.w3.org/2000/svg" width="36"
                         height="36" viewBox="0 0 24 24">
                        <path
                            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                </button>
            </div>

            <ul>
                {members.map(member => (
                    <li key={member.id}>
                        <a className="member-container" href={`members/${member.id}`}>
                            <p className="member-name">{member.firstName} {member.lastName}</p>
                            <p className="member-username">({member.username})</p>

                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}