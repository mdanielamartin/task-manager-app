"use client"
import useUserStore from "@/store/userStore";
import { List, ListItem, TextInput, Textarea, Button, Label, Checkbox } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const TaskDashboard = () => {

    const params = useParams()
    const slug = Number(params.slug)

    const [editing, setEditing] = useState<number | null>(null)
    const { printsomething } = useUserStore()
    const taskSchema = yup.object().shape({
        name: yup.string().min(1).max(80, "Task name cannot exceed 80 characters").required("Task must have a name"),
        description: yup.string().max(255, "Task description cannot exceed 500 characters.")
    })

    interface TaskData {
        name: string;
        description: string;
    }


    const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(taskSchema) })
    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
        formState: { errors: editErrors },
        getValues
    } = useForm({ resolver: yupResolver(taskSchema) });

    const onSubmit = async (data: TaskData) => {
        console.log(data)
    };

    const TASKS = [{ "name": "Buy cheese, milk and bread", "id": 1, "description": "Cheese has to be swiss, and milk must be lactose free" },
    { "name": "Pay water and electricity", "id": 2, "description": "" }, { "name": "Buy new memory card for computer", "id": 3, "description": "Must be at least 1TB and less that $200" }
    ]

    return (

        <div className="flex flex-col justify-center px-4 sm:px-8 py-6 sm:py-10 mx-auto max-w-4xl">
            <h1>{printsomething()}</h1>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-6 w-full shadow-sm">
                <form className="mx-auto p-4">
                    <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-1 sm:grid-rows-3 gap-x-4 gap-y-0">
                        <div className=" row-start-1 items-center ">
                            <div className="mb-2 block">
                                <Label className="text-md text-gray-700 dark:text-gray-300" htmlFor="name">Task Name</Label>
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                className="dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
                                placeholder="Go grocery shopping..."
                                required
                                {...register("name")}
                            />
                            <p className="text-red-600 dark:text-red-400">{errors.name?.message}</p>

                        </div>
                        <div className="row-start-2">
                            <div className="mb-2 block">
                                <Label className="text-md" htmlFor="description">Description (optional)</Label>
                            </div>
                            <Textarea className="overflow-y-auto" id="description" rows={2} placeholder="You may provide additional information..." {...register("description")} />
                            <p className="text-red-500">{errors.description?.message}</p>
                        </div>
                        <div className="sm:col-start-1 sm:row-start-3 flex flex-col justify-center h-full">
                            <Button color="purple" className="w-full shadow-md hover:shadow-lg dark:shadow-purple-700">
                                Add Task
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="bg-white h-auto w-full rounded-xl mx-auto  my-4 justify-center">
                <List className="list-none">

                    {TASKS?.map((task) => (

                        task.id === editing ?

                            <ListItem key={task.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white rounded-lg border pl-4 py-5 border items-center justify-center flex">
                                <form className=" grid md:grid-cols-5 grid-cols-1 gap-3 mx-auto p-4 w-full flex items-center justify-center place-content-between">
                                    <div className="md:col-span-4">
                                        <div className="items-center">
                                            <div className="block">
                                                <Label className="text-md" htmlFor="name">Task Name</Label>
                                            </div>
                                            <TextInput id="name" type="text" placeholder="Make doctor's appointment..." required {...registerEdit("name")} />
                                            <p className="text-red-500">{editErrors.name?.message}</p>

                                        </div>
                                        <div className="row-start-2">
                                            <div className="mb-2 block">
                                                <Label className="text-md" htmlFor="description">Description (optional)</Label>
                                            </div>
                                            <Textarea className="overflow-y-auto" id="description" rows={2} placeholder="You may provide additional information..." {...registerEdit("description")} />
                                            <p className="text-red-500">{editErrors.description?.message}</p>
                                        </div>
                                    </div>
                                    <div className="justify-center items-center md:col-span-1">
                                        <div className="mx-auto flex space-x-2 justify-end">
                                            <Button color="red" className="shadow-lg hover:shadow-xl" onClick={() => setEditing(null)}>Cancel</Button>
                                            <Button color="yellow" className="shadow-lg hover:shadow-xl" type="submit">Edit</Button>
                                        </div>
                                    </div>
                                </form>

                            </ListItem>

                            :

                            <ListItem key={task.id} className="text-2xl place-content-between items-center text-bold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white rounded-lg border pl-4 py-5 border flex">
                                <div className="flex">
                                    <div className="p-3"><Checkbox /></div>
                                    <div className="flex flex-col">
                                        <div className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-black dark:text-white">{task.name}</div>
                                        <p className="text-gray-400 text-md">{task.description}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:w-auto gap-2 mr-5">
                                    <Button color="failure" className="shadow-md hover:shadow-lg dark:shadow-red-700">Delete</Button>
                                    <Button color="warning" className="shadow-md hover:shadow-lg dark:shadow-yellow-700">Edit</Button>
                                </div>
                            </ListItem>

                    ))}



                </List>
            </div>
        </div>
    )
}

export default TaskDashboard
