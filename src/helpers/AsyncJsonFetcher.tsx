export async function asyncJSONPostFetch(url: string, formData: string) {
    const response = await fetch(url, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': `${process.env.REACT_APP_HBA_UI_BASE_URL}`, 'Content-Type': 'application/json'},
        body: formData
    });
    return response;
}

export async function asyncGetUserDetails() {
    const response = await fetch(`${process.env.REACT_APP_HBA_API_URL}/`, {
        method: 'GET',
        credentials: "include",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        }
    });
    return await response.json()
}

export async function getMemberById(id: string) {
    const response = await fetch(`${process.env.REACT_APP_HBA_API_URL}/admin/members/searchById?id=${id}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            }
        });
    return response.ok ? response.json() : Promise.reject("Member not found");
}

export async function getMembersWithFilter(searchValue: string, filter: string) {
    const response = await fetch(`${process.env.REACT_APP_HBA_API_URL}/admin/members/search?value=${searchValue}&filter=${filter}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            }
        });
    return await response.json();
}

export async function getMemberList(pageToGo:string) {
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/admin${pageToGo}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
        return response.ok ? response.json() : Promise.reject("Nothing found...");
    });
}

export async function getMemberIdFromToken(token: string) {
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/register/confirm?token=${token}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
        })
        .then(response => {
            return response.ok ? response.json() : Promise.reject("Invalid Token");
        });

}

export async function isEmployeeNumberValid(token: string, employeeNumber: string) {
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/register/confirm?token=${token}&employeeNumber=${employeeNumber}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
        })
        .then(response => {
            return response.ok ? response : Promise.reject({employeeNumber: "Invalid employee number"});
        });
}

export async function savePasswordToDatabase(data: string) {
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/register/confirm/pageTwo`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': `${process.env.REACT_APP_HBA_UI_BASE_URL}`, 'Content-Type': 'application/json'},
        body: data
    })
        .then(response => {
            return response.ok ? response : Promise.reject();
        });
}

export async function saveMemberDetails(data: string) {
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/register/confirm/pageThree`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': `${process.env.REACT_APP_HBA_UI_BASE_URL}`, 'Content-Type': 'application/json'},
        body: data
    })
        .then(response => {
            return response.ok ? response : Promise.reject();
        });
}

export async function logout() {
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/logout`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
        });
}

export async function sendPasswordResetEmail(email:string){
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/forgot-password?email=${email}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
        });
}
export async function resetPassword(data: string) {
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/reset-password`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': `${process.env.REACT_APP_HBA_UI_BASE_URL}`, 'Content-Type': 'application/json'},
        body: data
    });
}

export async function lockAccount(id:string){
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/admin/members/lock-account?id=${id}`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': `${process.env.REACT_APP_HBA_UI_BASE_URL}`, 'Content-Type': 'application/json'},
    });
}

export async function activateAccount(id:string){
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/admin/members/activate-account?id=${id}`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': `${process.env.REACT_APP_HBA_UI_BASE_URL}`, 'Content-Type': 'application/json'},
    });
}

export async function resendRegistrationEmail(id:string){
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/admin/members/send-registration-email?id=${id}`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': `${process.env.REACT_APP_HBA_UI_BASE_URL}`, 'Content-Type': 'application/json'},
    });
}

export async function isResetPasswordTokenValid(token:string){
    return await fetch(`${process.env.REACT_APP_HBA_API_URL}/validate-reset-password-token?token=${token}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
        })
        .then(response => {
            return response.ok ? response : Promise.reject();
        });
}


