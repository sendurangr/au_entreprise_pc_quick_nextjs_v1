"use client";
import * as React from "react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

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

    /*
    <button onClick={() => postCC()}
                        className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}>
                    Send CC
                </button>
    * */

    return (
        <div className="h-screen flex items-center">
            <div className={"flex w-2/3 mx-auto"}>
                <div className={"w-1/2"}>
                    <div>
                        <h2>
                            Entreprise Corporate Traveller
                        </h2>
                        <h6>Secured Credit Card Information Portal</h6>
                    </div>
                </div>
                <div className={"w-1/2"}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Create project</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Name of your project"/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">Framework</Label>
                                        <Select>
                                            <SelectTrigger id="framework">
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="next">Next.js</SelectItem>
                                                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                                <SelectItem value="astro">Astro</SelectItem>
                                                <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>

    );
}
