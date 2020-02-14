export async function asyncJSONPostFetch(url: string, formData: FormData) {
    let jsonObject:any = {};
    formData.forEach((value, key) => {jsonObject[key] = value});
    let json = JSON.stringify(jsonObject);



    // let json = JSON.stringify(Object.fromEntries(formData));
    const response = await fetch(url, {
        credentials: "include",
        mode: 'cors',
        method: 'POST',
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'},
        body: json
    });
    return response;
}

export async function asyncGetUserDetails(){
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


