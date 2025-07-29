"use client"
import { List, ListItem, TextInput, Textarea, Button, Label, Checkbox } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import useTaskStore from "@/store/taskStore";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";


const TaskDashboard = () => {
    const router = useRouter()
    const [editing, setEditing] = useState<number | null>(null)
    const { addTask, deleteTask, updateTask, getTasks, setDoneTasks, setIncompleteTasks, tasks } = useTaskStore()
    const { status } = useUserStore()
    const [selection, setSelection] = useState<number[]>([])
    const taskSchema = yup.object().shape({
        name: yup.string().min(1).max(80, "Task name cannot exceed 80 characters").required("Task must have a name"),
        description: yup.string().max(255, "Task description cannot exceed 500 characters.").nullable()
    })

    interface TaskForm {
        name: string;
        description?: string | null;
    }

    interface TaskData {
        name: string;
        id: number;
        description?: string | null;
        status: boolean;
    }


    const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(taskSchema) })
    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
        formState: { errors: editErrors },
        getValues
    } = useForm({ resolver: yupResolver(taskSchema) });

    const onSubmitTask = async (data: TaskForm) => {
        await addTask(data)
        reset()
        setEditing(null)
    };

    const onDeleteTask = async (id: number) => {
        await deleteTask(id)
    }

    const editingRequest = (data: TaskData, id: number) => {
        setEditing(id)
        resetEdit({ name: data.name, description: data.description ?? undefined })
    }

    const onSubmitEdit = async (data: TaskForm, id: number, status: boolean) => {
        const updateData = { ...data, id: id, status: status }
        await updateTask(updateData)
        reset()
        setEditing(null)
    }

    const handleCheck = (id: number) => {
        setSelection(prev => prev.some(s => s === id) ? prev.filter(s => s !== id) : [...prev, id])
    }

    const markDone = async () => {
        await setDoneTasks(selection)
        setSelection([])
    }
    const markIncomplete = async () => {
        await setIncompleteTasks(selection)
        setSelection([])
    }
    useEffect(() => {
        const onLoad = async () => {
            await getTasks()
        }
        onLoad()
    }, [getTasks])


    useEffect(() => {
        if (!status) {
            router.push("/login")
        }
    }, [status, router])

    return (

        <div className="flex flex-col justify-center px-4 sm:px-8 py-6 sm:py-4 mx-auto max-w-4xl bg-gray-50 dark:bg-gray-800">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl  px-4 py-4 border w-full shadow-sm">
                <form onSubmit={handleSubmit(onSubmitTask)} className="mx-auto p-4">
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
                            <Button color="purple" className="w-full shadow-md hover:shadow-lg dark:shadow-purple-700" type="submit">
                                Add Task
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <br />
            <div className="bg-gray-50 dark:bg-gray-800 h-auto w-full rounded-xl mx-auto  my-2 justify-center">
                <div className=" justify-center space-y-5  mb-6">
                    <Button
                        color="alternative"
                        className="w-full shadow-md hover:shadow-lg hover:shadow-green-700 dark:shadow-green-700"
                        onClick={markDone}
                    >
                        Done!
                    </Button>
                    <Button
                        color="alternative"
                        className="w-full shadow-md hover:shadow-lg  hover:shadow-red-700 dark:shadow-red-700"
                        onClick={markIncomplete}
                    >
                        Mark as Undone
                    </Button>
                </div>
                <List className="list-none">

                    {tasks?.map((task) => (

                        task.id === editing ?

                            <ListItem key={task.id} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white rounded-lg border pl-4 py-5 items-center justify-between flex">
                                <form
                                    onSubmit={handleSubmitEdit(() => onSubmitEdit(getValues(), task.id, task.status))}
                                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 w-full max-w-5xl mx-auto"
                                >
                                    {/* Left Section: Inputs */}
                                    <div className="md:col-span-3">
                                        {/* Task Name */}
                                        <div className="mb-4">
                                            <Label className="text-md" htmlFor="name">Task Name</Label>
                                            <TextInput
                                                id="name"
                                                type="text"
                                                placeholder="Make doctor's appointment..."
                                                required
                                                {...registerEdit("name")}
                                            />
                                            <p className="text-red-500">{editErrors.name?.message}</p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <Label className="text-md" htmlFor="description">Description (optional)</Label>
                                            <Textarea
                                                id="description"
                                                rows={2}
                                                placeholder="You may provide additional information..."
                                                className="overflow-y-auto"
                                                {...registerEdit("description")}
                                            />
                                            <p className="text-red-500">{editErrors.description?.message}</p>
                                        </div>
                                    </div>

                                    {/* Right Section: Buttons */}
                                    <div className="md:col-span-2 flex flex-col md:justify-center md:items-center gap-2 mt-4 md:mt-0">
                                        <Button
                                            color="red"
                                            className="shadow-lg hover:shadow-xl"
                                            onClick={() => setEditing(null)}
                                        >
                                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                                            </svg>
                                        </Button>
                                        <Button
                                            color="green"
                                            className="shadow-lg hover:shadow-xl"
                                            type="submit"
                                        >
                                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd" />
                                            </svg>

                                        </Button>
                                    </div>
                                </form>

                            </ListItem>

                            :

                            <ListItem key={task.id} className="text-2xl text-bold bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white rounded-lg pl-4 py-5 border grid-cols-10 items-center flex">


                                <div className="flex col-span-6 items-center gap-4 flex-shrink-0 w-[60%]">

                                    <div className="p-2">
                                        <Checkbox
                                            checked={selection.some(c => c === task.id)}
                                            onChange={() => handleCheck(task.id)}
                                        />
                                    </div>


                                    <div className="flex flex-col">
                                        <div className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-black dark:text-white">
                                            {task.name}
                                        </div>
                                        <p className="text-gray-400 text-md">{task.description}</p>
                                    </div>


                                </div>

                                <div className="flex justify-center items-center w-[20%] col-span-2">
                                    {task.status ? (
                                        <svg className="w-8 h-8 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                        </svg>

                                    ) : (
                                        <svg className="w-8 h-8 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd" />
                                        </svg>

                                    )}
                                </div>


                                <div className="sm:max-w-none flex flex-wrap justify-end gap-2">
                                    <Button
                                        color="red"
                                        className="shadow-md hover:shadow-lg dark:shadow-red-700 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base"
                                        onClick={() => onDeleteTask(task.id)}
                                    >
                                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                                        </svg>

                                    </Button>
                                    <Button
                                        color="yellow"
                                        className="shadow-md hover:shadow-lg dark:shadow-yellow-700 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base col-span-2"
                                        onClick={() => editingRequest(task, task.id)}
                                    >
                                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                        </svg>

                                    </Button>
                                </div>

                            </ListItem>

                    ))}



                </List>
            </div>
        </div>
    )
}

export default TaskDashboard
