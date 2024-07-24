"use client";
export default function Home() {

    // post method to /api/pass-cc
    function postCC() {
        fetch('/ect/cc-det/api', {
            method: 'POST',
            body: JSON.stringify({
                name: 'John Doe',
                email: 'senduran',
                message: 'Hello, world!',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            (response) => response.json()
        ).then(
            (data) => console.log(data)
        ).catch(
            (error) => console.error(error)
        );
    }

    return (
        <h1>
            <button onClick={() => postCC()}>Click me</button>
        </h1>
    );
}
