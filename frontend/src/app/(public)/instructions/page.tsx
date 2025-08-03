

import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, List, ListItem } from "flowbite-react"


const Instructions = () => {

    return (



        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-8 sm:px-16">
            <h1 className="text-4xl font-bold mb-10 text-center leading-relaxed">📋 How to Use Task Manager</h1>
            <Accordion collapseAll>
                <AccordionPanel>
                    <AccordionTitle className="text-xl">Create an Account</AccordionTitle>
                    <AccordionContent className="text-base">
                        <p>
                            Sign up using your email and a secure password to access your personal task dashboard.
                        </p>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel>
                    <AccordionTitle className="text-xl">Manage Tasks</AccordionTitle>
                    <AccordionContent className="text-base">
                        <List className="space-y-2">
                            <ListItem>📝 <strong>Create:</strong> Fill out the task form with a name and optional description.</ListItem>
                            <ListItem>✏️ <strong>Edit:</strong> Click the edit icon to modify an existing task.</ListItem>
                            <ListItem>🗑️ <strong>Delete:</strong> Click the trash icon to remove a task.</ListItem>
                            <ListItem>✅ <strong>Status Toggle:</strong> Use the status icon to mark tasks as done or undone.</ListItem>
                        </List>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel>
                    <AccordionTitle className="text-xl">Bulk Actions</AccordionTitle>
                    <AccordionContent className="text-base">
                        <p>Select multiple tasks using their checkboxes, then:</p>
                        <List className="mt-3 space-y-2">
                            <ListItem><strong>Mark as Done:</strong> ✅ Set selected tasks as complete.</ListItem>
                            <ListItem><strong>Mark as Incomplete:</strong> ❌ Reset tasks back to undone.</ListItem>
                        </List>
                        <p className="mt-4">Perfect for managing multiple tasks with speed and ease.</p>
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel>
                    <AccordionTitle className="text-xl">Switch Theme & Logout</AccordionTitle>
                    <AccordionContent className="text-base">
                        <List className="space-y-2">
                            <ListItem>🌓 <strong>Dark/Light Mode:</strong> Toggle themes using the navbar icon.</ListItem>
                            <ListItem>🚪 <strong>Logout:</strong> {"Sign out via the navbar button when you're finished"}.</ListItem>
                        </List>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>



    )


}


export default Instructions
