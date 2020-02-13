export function mockSuccessfulFetch(responseBody: any) {
    const response = Promise.resolve(
        {
            json: () => Promise.resolve(responseBody)
        }
    );
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => response);

}

export function mockFailedFetch() {
    const response = Promise.resolve({
        json: ()=> Promise.resolve({
            "username":null,
            "role":null
        })
    });
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => response);
}