import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMemberById} from "../../helpers/AsyncJsonFetcher";
import PageNotFound from "../PageNotFound";
import "../../styles/MemberDetailsPage.scss"
import {MemberFunctions} from "./MemberFunctions";

export interface IMember {
    id:string,
    firstName: string,
    lastName: string,
    employeeNumber: string,
    username: string,
    shift: string,
    jobRole: string,
    department: string,
    area: string,
    email: string,
    active: boolean,
    pendingAccountRegistration: boolean
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
    }, [id, member?.active]);

    if (error) {
        return <PageNotFound/>;
    }

    if (member) {
        return (
            <div>
                <MemberFunctions member={member} setMember={setMember}/>
                 {/*<EditMember/>*/}
                {/* <MemberHolidayBookings/>*/}

                <p className="member">{member.username}</p>
                <p className="member">{member.firstName} {member.lastName}</p>
                <p className="member">{member.employeeNumber}</p>
                <p className="member">{member.email}</p>
            </div>
        );

    }
    return null;
}