import React, { useState } from "react";
import { Input, Button, ButtonGroup } from "@nextui-org/react";
//import { DateRangePicker } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import useRegister from '../hooks/useRegister';
import { useSession } from 'next-auth/react';
import { Upload } from 'lucide-react';

import DateRangePicker from "../DateTimePicker";
export default function FormHackathon() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        prize1: '',
        prize2: '',
        prize3: '',
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
        <form className="flex flex-col gap-4 text-gray-700" onSubmit={handleSubmit}>
            <Input
                isRequired
                label="Name of Hackathon"
                name="name"
                value={formData.name}
                onChange={handleChange}
                color="default"
                variant="bordered"
            />
            <Input
                isRequired
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                color="default"
                variant="bordered"
            />
            <div className="flex flex-row gap-4 w-full">
                <Input
                    isRequired
                    label="Top 1"
                    name="prize1"
                    value={formData.prize1}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />
                <Input
                    isRequired
                    label="Top 2"
                    name="prize1"
                    value={formData.prize2}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />
                <Input
                    isRequired
                    label="Top 3"
                    name="prize1"
                    value={formData.prize3}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />
            </div>

            <div className="w-full max-w-xl flex flex-row gap-4">
                <div key="bordered" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <DateRangePicker />
                </div>
            </div>
            <div className="flex flex-col items-center gap-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                />
                <label htmlFor="file-upload">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary text-white rounded-full cursor-pointer transition-colors duration-200">
                        <Upload size={18} />
                        <span>Choose file</span>
                    </div>
                </label>

                {selectedFile && (
                    <div className="flex justify-center w-full">
                        <img
                            src={selectedFile}
                            alt="Preview"
                            className="object-cover w-[200px] h-[200px] rounded-lg"
                        />
                    </div>
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