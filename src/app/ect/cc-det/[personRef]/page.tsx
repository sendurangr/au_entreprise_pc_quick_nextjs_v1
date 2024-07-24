"use client";
import * as React from "react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel,} from '@/components/ui/form';
import {Label} from "@/components/ui/label";
import {useToast} from "@/components/ui/use-toast"
import {LoaderCircleIcon, SendIcon} from "lucide-react";

const formSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/),
    cardName: z.string().regex(/^[a-zA-Z\s]+$/),
    secretKey: z.string().regex(/^\d{3}$/),
    cardExpirationMonth: z.string().regex(/^\d{2}$/),
    cardExpirationYear: z.string().regex(/^\d{2}$/),
});

export default function Home({params}: { params: { personRef: string } }) {

    const {toast} = useToast()

    const [loading, setLoading] = React.useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardNumber: "",
            cardName: "",
            secretKey: "",
            cardExpirationMonth: '',
            cardExpirationYear: '',
        },
    });

    const onSubmitFormData = (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        postCC(data);
    }

    const onReset = () => {
        form.reset();
    }


    // post method to /api/pass-cc
    function postCC(data: z.infer<typeof formSchema>) {
        fetch('/ect/cc-det/api', {
            method: 'POST',
            body: JSON.stringify({
                refNumber: params.personRef,
                cardNumber: data.cardNumber,
                cardName: data.cardName,
                secretKey: data.secretKey,
                cardExpirationMonth: data.cardExpirationMonth,
                cardExpirationYear: data.cardExpirationYear,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                setLoading(false);
                toast({
                    title: 'Success',
                    description: 'Credit Card Information has been sent',
                    variant: "default",
                })
            }
        ).catch(
            (error) => {
                setLoading(false);
                toast({
                    title: 'Error',
                    description: 'Failed to send Credit Card Information',
                    variant: "destructive",
                })
            }
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
            <div className={"md:flex w-full md:justify-evenly"}>
                <div className={'flex align-middle'}>
                    <div className={'items-center self-center'}>
                        <h2 className="text-3xl font-semibold tracking-tight">
                            Entreprise Corporate Traveller
                        </h2>
                        <h4 className="text-xl font-semibold">
                            Secured Credit Card Information Portal
                        </h4>
                    </div>

                </div>
                <div>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                            <CardDescription>Please enter your credit or debit card details</CardDescription>
                            <hr/>
                        </CardHeader>
                        <Form {...form}>
                            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmitFormData)}>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-y-8">
                                        <FormField
                                            control={form.control}
                                            name="cardName"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Name on Card</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="cardNumber"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Card Number</FormLabel>
                                                    <FormControl>
                                                        <Input className="border" type="text"
                                                               placeholder="" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="secretKey"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Secret Key</FormLabel>
                                                    <FormControl>
                                                        <Input className="border" type="text"
                                                               placeholder="" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div>
                                            <Label>Card Expiration (MM/YY)</Label>
                                            <div className={'grid grid-cols-2 gap-2'}>
                                                <FormField
                                                    control={form.control}
                                                    name="cardExpirationMonth"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input type="text"
                                                                       placeholder="Month Ex: 01" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="cardExpirationYear"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input type="text"
                                                                       placeholder="Year Ex: 24" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </div>
                                    </div>

                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" onClick={onReset}>Reset</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading && (
                                            <>
                                                <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin"/>
                                                Please wait
                                            </>
                                        )}
                                        {!loading && (
                                            <>
                                                <SendIcon type="submit" className="mr-2 h-4 w-4"/> Submit
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>

    );
}
