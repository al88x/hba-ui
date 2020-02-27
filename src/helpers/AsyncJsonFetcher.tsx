export async function asyncJSONPostFetch(url: string, formData: string) {
    const response = await fetch(url, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'},
        body: formData
    });
    return response;
}

export async function asyncGetUserDetails() {
    const response = await fetch("http://localhost:8080/", {
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
    const response = await fetch(`http://localhost:8080/admin/members/searchById?id=${id}`,
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
    const response = await fetch(`http://localhost:8080/admin/members/search?value=${searchValue}&filter=${filter}`,
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
    return await fetch(`http://localhost:8080/admin${pageToGo}`,
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
    return await fetch(`http://localhost:8080/register/confirm?token=${token}`,
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
    return await fetch(`http://localhost:8080/register/confirm?token=${token}&employeeNumber=${employeeNumber}`,
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
    return await fetch("http://localhost:8080/register/confirm/pageTwo", {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'},
        body: data
    })
        .then(response => {
            return response.ok ? response : Promise.reject();
        });
}

export async function saveMemberDetails(data: string) {
    return await fetch("http://localhost:8080/register/confirm/pageThree", {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'},
        body: data
    })
        .then(response => {
            return response.ok ? response : Promise.reject();
        });
}

export async function logout() {
    return await fetch("http://localhost:8080/logout",
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
        });
}

export async function sendPasswordResetEmail(email:string){
    return await fetch(`http://localhost:8080/forgot-password?email=${email}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
        });
}
export async function resetPassword(data: string) {
    return await fetch("http://localhost:8080/reset-password", {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'},
        body: data
    });
}

export async function lockAccount(id:string){
    return await fetch(`http://localhost:8080/admin/members/lock-account?id=${id}`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'},
    });
}

export async function activateAccount(id:string){
    return await fetch(`http://localhost:8080/admin/members/activate-account?id=${id}`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'},
    });
}

export async function resendRegistrationEmail(id:string){
    return await fetch(`http://localhost:8080/admin/members/send-registration-email?id=${id}`, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'},
    });
}

export async function isResetPasswordTokenValid(token:string){
    return await fetch(`http://localhost:8080/validate-reset-password-token?token=${token}`,
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



