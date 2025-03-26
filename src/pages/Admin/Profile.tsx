import React, {useEffect, useState} from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Input } from "../../components/ui/input";

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import {request} from "../../lib/apiManagerAdmin";
import AppHeader from "../../components/appheader";

export function Profile() {

    const adminDataString = localStorage.getItem("adminToken");
    const adminData = JSON.parse(adminDataString);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({
        access_token: adminData.access_token,
        username: adminData.username,
        email: adminData.email,
        role: adminData.role,
        first_name: adminData.first_name,
        last_name: adminData.last_name,
        phone_number: adminData.phone_number,
        address: adminData.address,
        date_of_birth: adminData.date_of_birth,
        gender: adminData.gender
    });

    // Handle form submission
    const onSubmit = async (data) => {
        // Here you can make the API call for updating the profile
        setLoading(true);

        const response = await request({
            method: "put",
            path: "/users/" + adminData.id,
            requestBody: data,
        });
        const dataall ={
            ...data, access_token: adminData.access_token,
            username: adminData.username, role: adminData.role, id: adminData.id
        }
        console.log(dataall)
        await localStorage.setItem("adminToken", JSON.stringify(dataall));
        setLoading(false);
    };


    const formSchema = z.object({
        firstName: z.string().min(2, {
            message: "First name must be at least 2 characters.",
        }),
        lastName: z.string().min(2, {
            message: "Last name must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Please enter a valid email.",
        }),
        mobile: z.string().min(10, {
            message: "Mobile number must be at least 10 characters.",
        }),
        newPassword: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        confirmPassword: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        })
    }).refine(data => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: adminData.first_name,
            lastName: adminData.last_name,
            email: adminData.email,
            mobile: adminData.phone_number,
            newPassword: "",
            confirmPassword: ""
        },
    });

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="border border-[var(--primary-border-color)] rounded-lg shadow-md xs:rounded-none">
                    <AppHeader name={"Profile"} subName={""}/>
                    <div className="flex flex-1 flex-col p-3 pt-3">

                        <div className="flex flex-1 flex-col pt-3">
                            <div className="flex flex-col gap-3 p-3">
                                <h2 className="text-2xl font-semibold uppercase">PROFILE</h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-3 mt-0">
                                <div className="space-y-4">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="first_name" className="block text-sm font-medium">First Name</label>
                                        <input
                                            type="text"
                                            {...register("first_name", { required: "First name is required" })}
                                            defaultValue={formData.first_name}
                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                        />
                                        {errors.first_name && <span className="text-red-500 text-xs">{errors.first_name.message}</span>}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="last_name" className="block text-sm font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            {...register("last_name", { required: "Last name is required" })}
                                            defaultValue={formData.last_name}
                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                        />
                                        {errors.last_name && <span className="text-red-500 text-xs">{errors.last_name.message}</span>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            {...register("email", { required: "Email is required" })}
                                            defaultValue={formData.email}
                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                        />
                                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                                    </div>

                                    {/* Mobile Number */}
                                    <div>
                                        <label htmlFor="phone_number" className="block text-sm font-medium">Mobile Number</label>
                                        <input
                                            type="text"
                                            {...register("phone_number", { required: "Mobile number is required" })}
                                            defaultValue={formData.phone_number}
                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                        />
                                        {errors.phone_number && <span className="text-red-500 text-xs">{errors.phone_number.message}</span>}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium">Address</label>
                                        <input
                                            type="text"
                                            {...register("address", { required: "Address is required" })}
                                            defaultValue={formData.address}
                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                        />
                                        {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
                                    </div>

                                    {/* Date of Birth */}
                                    <div>
                                        <label htmlFor="date_of_birth" className="block text-sm font-medium">Date of Birth</label>
                                        <input
                                            type="date"
                                            {...register("date_of_birth", { required: "Date of birth is required" })}
                                            defaultValue={formData.date_of_birth}
                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                        />
                                        {errors.date_of_birth && <span className="text-red-500 text-xs">{errors.date_of_birth.message}</span>}
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                                        <select
                                            {...register("gender", { required: "Gender is required" })}
                                            defaultValue={formData.gender}
                                            className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"
                                        >
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                        </select>
                                        {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
                                    </div>

                                    {/* Role */}
                                    {/*<div>*/}
                                    {/*    <label htmlFor="role" className="block text-sm font-medium">Role</label>*/}
                                    {/*    <select*/}
                                    {/*        {...register("role", { required: "Role is required" })}*/}
                                    {/*        defaultValue={formData.role}*/}
                                    {/*        className="border border-[var(--primary-border-color)] rounded-md p-2 lg:w-1/2"*/}
                                    {/*    >*/}
                                    {/*        <option value="admin">Admin</option>*/}
                                    {/*        <option value="user">User</option>*/}
                                    {/*    </select>*/}
                                    {/*    {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}*/}
                                    {/*</div>*/}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <button
                                            type="submit"
                                            className={`bg-blue-500 text-white rounded-md py-2 px-4 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                  </svg>
                  Updating...
                </span>
                                            ) : (
                                                "Update Profile"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
