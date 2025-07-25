//
import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";

export default function Home() {
 const CARDS = [
  {
    title: "Create Account",
    description: "Sign up and start organizing your tasks effortlessly.",
    url: "/signup",
    icon: (
      <svg className="h-9 w-9 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="1.5" d="M12 14a4 4 0 100-8 4 4 0 000 8zM4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" />
      </svg>
    ),
  },
  {
    title: "Manage Tasks",
    description: "Create, edit, and delete tasks to stay on top of your day.",
    url: "/login",
    icon: (
      <svg className="h-9 w-9 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="1.5" d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    ),
  },
  {
    title: "Mark as Completed",
    description: "Finish tasks and track your productivity with one click.",
    url: "/login",
    icon: (
      <svg className="h-9 w-9 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="1.5" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Track Progress",
    description: "Visualize your task history and completed goals.",
    url: "/login",
    icon: (
      <svg className="h-9 w-9 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="1.5" d="M4 4v16h16V4H4zm4 12h2v2H8v-2zm4-6h2v8h-2V10zm4-4h2v12h-2V6z" />
      </svg>
    ),
  },
]


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
      <div className="absolute inset-0 size-full">
        <div className="relative h-full w-full select-none">
          <Image
            className="absolute right-0 min-w-dvh dark:hidden"
            alt="Pattern Light"
            src="/pattern-light.svg"
            width="803"
            height="774"
          />
          <Image
            className="absolute right-0 hidden min-w-dvh dark:block"
            alt="Pattern Dark"
            src="/pattern-dark.svg"
            width="803"
            height="775"
          />
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>

      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">
        <div className="relative flex flex-col items-center gap-6">
          <h1 className="relative text-center text-4xl leading-[125%] font-bold text-gray-900 dark:text-gray-200">
            To do or not to do?
          </h1>
          <span className="inline-flex flex-wrap items-center justify-center gap-2.5 text-center">
            <span className="inline text-xl text-gray-600 dark:text-gray-400">
              That is out of the question!
            </span>
            <span className="relative inline-flex items-center gap-2">
              <Image
                className="size-6"
                alt="Flowbite React logo"
                src="/flowbite-react.svg"
                width={24}
                height={24}
              />
              <span className="relative w-fit text-xl font-semibold whitespace-nowrap text-[#111928] dark:text-white">
                TaskMD
              </span>
            </span>
            <h2 className="inline text-xl text-gray-600 dark:text-gray-400">
              is here to take all clear all doubts
            </h2>
          </span>
        </div>

        <div className="relative flex w-full flex-col items-start gap-6 self-stretch">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {CARDS.map((card) => (
              <a
                key={card.title}
                href={card.url}
                target="_blank"
                className="outline-primary-600 dark:outline-primary-500 group hover:border-primary-600 dark:hover:border-primary-500 cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gray-50 outline-offset-2 focus:outline-2 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center gap-6 p-4">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="size-9">{card.icon}</div>

                    <div className="flex flex-1 flex-col items-start justify-center gap-1.5 border-l border-gray-200 pl-3.5 dark:border-gray-700">
                      <div className="w-full font-sans text-lg leading-4 font-semibold text-gray-900 dark:text-gray-200">
                        {card.title}
                      </div>

                      <div className="w-full font-sans text-sm leading-5 font-normal text-gray-500 dark:text-gray-400">
                        {card.description}
                      </div>
                    </div>
                  </div>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:text-primary-600 dark:group-hover:text-primary-500 h-6 w-6 text-gray-500 transition-transform group-hover:translate-x-1"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.2929 7.29289C14.6834 6.90237 15.3166 6.90237 15.7071 7.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L15.7071 16.7071C15.3166 17.0976 14.6834 17.0976 14.2929 16.7071C13.9024 16.3166 13.9024 15.6834 14.2929 15.2929L16.5858 13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H16.5858L14.2929 8.70711C13.9024 8.31658 13.9024 7.68342 14.2929 7.29289Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
