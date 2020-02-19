import React, {useEffect, useState} from "react";
import "../styles/MembersPage.scss"
import {getMemberList, getMembersWithFilter} from "../helpers/AsyncJsonFetcher";

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

export function MembersPage() {
    const [searchValue, setSearchValue] = useState("");
    const [filter, setFilter] = useState<IFilter>(IFilter.NAME);
    const [members, setMembers] = useState<IMember[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getMemberList()
            .then(jsonResponse => setMembers(jsonResponse.items));
    }, []);

    function handleSubmit() {
        setErrorMessage("");
        if (searchValue.length === 0) {
            setErrorMessage("Search value should not be empty")
        } else if (filter === IFilter.EMPLOYEE_NUMBER && isNaN(+searchValue)) {
            setErrorMessage("Search value should be a number")
        } else {
            getMembersWithFilter(searchValue, filter)
                .then(jsonResponse => setMembers(jsonResponse))
                .catch(() => setErrorMessage("No match found..."));
        }
        setSearchValue("");
    }

    return (
        <div className="members-page">
            <div className="createUser-form-container">

                <a href="/admin/members/create" className="create-member">Create member</a>

                <form className="search-form" onSubmit={e => {e.preventDefault(); handleSubmit()}}>

                    <input className="members-page-search" type="text" placeholder="Search member"
                           value={searchValue}
                           onChange={e => setSearchValue(e.target.value)} />

                    <p className={errorMessage.length > 0 ? "error-message visible" : "error-message"}>{errorMessage}</p>

                    <div className="radio-container">
                        <label className="radio-label">Name
                            <input className="radio-button" type="radio" defaultChecked={true} name="filter"
                                   value="name"
                                   onClick={() => setFilter(IFilter.NAME)}/>
                        </label>
                        <label className="radio-label">Employee number
                            <input className="radio-button" type="radio" name="filter" value="number"
                                   onClick={() => (setFilter(IFilter.EMPLOYEE_NUMBER))}/>
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
                    </li>))}
            </ul>

        </div>
    );
}