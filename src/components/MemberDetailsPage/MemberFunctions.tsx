import React, {Dispatch, SetStateAction, useState} from "react";
import "../../styles/MemberFunctions.scss"
import LockIcon from '@material-ui/icons/Lock';
import {IMember} from "./MemberDetailsPage";
import {activateAccount, lockAccount, resendRegistrationEmail} from "../../helpers/AsyncJsonFetcher";


interface IMemberFunctionsProps {
    member: IMember,
    setMember: Dispatch<SetStateAction<IMember>> | any;
}

enum AccountState {
    PENDING, LOCKED, ACTIVE
}

export function MemberFunctions(props: IMemberFunctionsProps) {
    const [confirmMessage, setConfirmMessage] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    function handleSubmit(accountState: AccountState) {
        if (accountState === AccountState.ACTIVE) {
            lockAccount(props.member.id)
                .then(() => setConfirmMessage(false))
                .then(() => props.setMember({...props.member, active: false}))
                .catch(() => setError(true));
        }
        if (accountState === AccountState.LOCKED) {
            activateAccount(props.member.id)
                .then(() => setConfirmMessage(false))
                .then(() => props.setMember({...props.member, active: true}))
                .catch(() => setError(true));
        }
        if (accountState === AccountState.PENDING) {
            resendRegistrationEmail(props.member.id)
                .then(() => setSubmitted(true))
                .then(() => setConfirmMessage(false))
                .catch(() => setError(true));

        }
    }


    return (
        <div className="member-functions-container">
            {props.member.pendingAccountRegistration && buildComponent(AccountState.PENDING, "Pending registration", "Resend email", "Registration email has been sent to member's email.")}
            {(!props.member.active && !props.member.pendingAccountRegistration) && buildComponent(AccountState.LOCKED, "Locked", "Unlock account")}
            {props.member.active && buildComponent(AccountState.ACTIVE, "Active", "Lock account")}
        </div>
    );

    function buildComponent(accountState: AccountState, message: string, buttonMessage: string, confirmationMessage?: string) {
        return (
            <div className="account-state-container">
                <div>
                    <p className="account">ACCOUNT:</p>
                    <p className={props.member.active ? "account-state active" : "account-state locked"}>{message}</p>
                    <button className={confirmMessage ? "invisible" : "submit"}
                            onClick={() => setConfirmMessage(true)}>{buttonMessage}
                    </button>
                    <div className={(confirmMessage) ? "confirm-message" : "invisible"}>
                        <p>Are you sure?</p>
                        <button className="submit cancel" onClick={() => setConfirmMessage(false)}>Cancel
                        </button>
                        <button className="submit confirm" onClick={() => handleSubmit(accountState)}>Confirm</button>
                    </div>
                    <p className={submitted ? "submitted-message" : "invisible"}>{confirmationMessage}</p>
                    <p className={error ? "submitted-message error" : "invisible"}>Error submitting your request.</p>
                </div>
                <div>
                    < LockIcon className={props.member.active ? "invisible" : "lock-icon"}/>
                </div>
            </div>
        );
    }
}