import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMemberById} from "../helpers/AsyncJsonFetcher";
import PageNotFound from "./PageNotFound";
import "../styles/MemberDetailsPage.scss"

interface IMember {
    firstName: string,
    lastName: string,
    username: string,
    employeeNumber: string,
    email: string
}

export function MemberDetailsPage() {
    const {id} = useParams();
    const [member, setMember] = useState<IMember>();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            getMemberById(id)
                .then(value => setMember(value))
                .catch(error => setError(true));
        }
    }, []);

    if (error) {
        return <PageNotFound/>;
    }

    if (member) {
        return (
            <div>
                    <p className="member">{member.username}</p>
                    <p className="member">{member.firstName} {member.lastName}</p>
                    <p className="member">{member.employeeNumber}</p>
                    <p className="member">{member.email}</p>
            </div>
        );

    }
    return null;
}