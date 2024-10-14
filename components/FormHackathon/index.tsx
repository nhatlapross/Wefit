import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import useRegister from '../hooks/useRegister';
import { useSession } from 'next-auth/react';
export default function FormHackathon() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        prize: '',
        startDate: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
        endDate: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
    });
    const { register: registerUser, isLoading: isRegisterLoading } = useRegister();
    const { data: session } = useSession() || {};
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you can handle the form submission, e.g., send the data to your server
        const dataToSubmit = {
            ...formData,
            image: selectedFile,
        };
        console.log(dataToSubmit);
        toast.success('Create Hackathon success!');
        // You can use fetch or axios to send dataToSubmit to your server
        registerUser(session?.user?.email)
            .catch(error => console.error('Claim error:', error));
    };

    const handleSubmitTransaction = async () => {
        try {
            const response = await fetch('/api/submitTransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: process.env.NEXT_PUBLIC_RAZOR_ADDRESS,
                    to: 'your_receiver_address',
                    amount: 1000000000000000,
                    memo: 'Hackathon registration fee',
                }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

        } catch (err) {
            //error message
        } finally {
            //finally close
        }
    };

    return (
        <form className="flex flex-col gap-4 bg-white" onSubmit={handleSubmit}>
            <Input
                isRequired
                placeholder="Name of Hackathon"
                name="name"
                value={formData.name}
                onChange={handleChange}
                color="primary"
                variant="bordered"
                classNames={{
                    input: "text-primary",
                    inputWrapper: "bg-white hover:bg-white group-data-[hover=true]:bg-white",
                }}
            />
            <Input
                isRequired
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                color="primary"
                variant="bordered"
                classNames={{
                    input: "text-primary",
                    inputWrapper: "bg-white hover:bg-white group-data-[hover=true]:bg-white",
                }}
            />
            <Input
                isRequired
                placeholder="Prize"
                name="prize"
                value={formData.prize}
                onChange={handleChange}
                color="primary"
                variant="bordered"
                classNames={{
                    input: "text-primary",
                    inputWrapper: "bg-white hover:bg-white group-data-[hover=true]:bg-white",
                }}
            />
            <div className="w-full max-w-xl flex flex-row gap-4">
                <DateRangePicker
                    label="Hackathon duration"
                    hideTimeZone
                    visibleMonths={2}
                    defaultValue={{
                        start: formData.startDate,
                        end: formData.endDate,
                    }}
                    color="primary"
                    variant="flat"
                    className="bg-white"
                    classNames={{
                        base: "bg-white text-primary",
                        input: "bg-white text-primary",
                    }}
                />
            </div>
            <div className="text-primary">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="bg-white border-primary text-primary p-2 rounded file:bg-primary file:text-white file:border-0 file:rounded file:px-2 file:py-1 hover:file:bg-primary/90"
                />
                {selectedFile && (
                    <Image src={selectedFile} alt="Preview" width={500} height={500} />
                )}
            </div>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" className="text-white">
                    Create
                </Button>
            </div>
        </form>
    );
}