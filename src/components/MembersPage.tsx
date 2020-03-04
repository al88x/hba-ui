import React, {useEffect, useState} from "react";
import "../styles/MembersPage.scss"
import {getMemberList, getMembersWithFilter} from "../helpers/AsyncJsonFetcher";
import {useForm} from "../helpers/useForm";
import LockIcon from '@material-ui/icons/Lock';
import SearchIcon from '@material-ui/icons/Search';

interface IMember {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    active:boolean
}

export enum IFilter {
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
    const {handleChange, handleSubmit, values, errors} = useForm(submit, valuesInitialState);
    const [members, setMembers] = useState<IMember[]>([]);
    const [pageToGo, setPageToGo] = useState("/members?page=1&pageSize=10");
    const [nextPage, setNextPage] = useState("");
    const [previousPage, setPreviousPage] = useState("");
    const [notFoundMessage, setNotFoundMessage] = useState("");

    useEffect(() => {
        getMemberList(pageToGo)
            .then(jsonResponse => {
                setNextPage(jsonResponse.nextPage);
                return jsonResponse;
            })
            .then(jsonResponse => {
                setPreviousPage(jsonResponse.previousPage);
                return jsonResponse;
            })
            .then(jsonResponse => setMembers(jsonResponse.items));
    }, [pageToGo]);


    function submit() {
        setNotFoundMessage("");
        getMembersWithFilter(values.searchValue, values.filter)
            .then(jsonResponse => setMembers(jsonResponse))
            .catch(() => setNotFoundMessage("No match found..."));
    }


    return (
        <div className="members-page">
            <div className="createUser-form-container">

                <a href="/admin/members/create" className="create-member">+</a>

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
                    <SearchIcon className="search-button"/>
                </button>
            </div>

            <ul className="members-list">
                {members.map(member => (
                    <li key={member.id}>
                        <a className="member-container" href={`members/${member.id}`}>
                            <div className="member-name-container">
                                <p className="member-name">{member.firstName} {member.lastName}</p>
                                <p className="member-username">({member.username})</p>
                            </div>
                            <LockIcon className={member.active ? "invisible" : "lock-icon"}/>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="next-previous-page-container">
                <button className={(members.length > 0 && previousPage != null) ? "next-previous-page-button" : "invisible"}
                        onClick={() => setPageToGo(previousPage)}>Previous
                </button>
                <button className={(members.length > 0 && nextPage != null) ? "next-previous-page-button right" : "invisible"}
                        onClick={() => setPageToGo(nextPage)}>Next
                </button>
            </div>
        </div>
    );
}