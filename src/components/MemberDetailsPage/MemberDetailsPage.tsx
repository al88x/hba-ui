import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMemberById} from "../../helpers/AsyncJsonFetcher";
import PageNotFound from "../PageNotFound";
import "../../styles/MemberDetailsPage.scss"
import {MemberFunctions} from "./MemberFunctions";
import {EditMember} from "./EditMember";

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
    const [member, setMember] = useState<IMember | null>(null);
    const [error, setError] = useState(false);
    const [memberUpdated, setMemberUpdated] = useState(false);

    useEffect(() => {
        if (id) {
            getMemberById(id)
                .then(value => setMember(value))
                .catch(error => setError(true));
        }
    }, [id, member?.active, memberUpdated]);

    if (error) {
        return <PageNotFound/>;
    }

    if (member) {
        return (
            <div className="member-details-page-container">
                <MemberFunctions member={member} setMember={setMember}/>
                 <EditMember member={member} setMember={setMember} setMemberUpdated={setMemberUpdated}/>
                {/* <MemberHolidayBookings/>*/}
            </div>
        );
    }
    return null;
}