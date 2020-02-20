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

export async function getMemberById(id:string){
    const response = await fetch(`http://localhost:8080/admin/members/searchById?id=${id}`,
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            }
        });
    return response.ok ?  response.json() :  Promise.reject("Member not found");
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

export async function getMemberList() {
  return await fetch("http://localhost:8080/admin/members?page=1&pageSize=10",
        {
            method: 'GET',
            credentials: "include",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
        return response.ok ?  response.json() :  Promise.reject("Nothing found...");
    });
}


