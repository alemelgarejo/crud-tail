import * as React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { Task } from "../../interfaces/Task";
import { Dialog, Transition } from "@headlessui/react";

const CreateTask: React.FunctionComponent = () => {
  const [task, setTask] = React.useState({
    title: "",
    description: "",
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTask({ ...task, [name]: value });

  const createTask = async (task: Task) => {
    await fetch("http://localhost:3000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const updateTask = async (id: string, task: Task) => {
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  const loadTask = async (id: string) => {
    const response = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await response.json();
    setTask({ title: task[0].title, description: task[0].description });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === "string") {
        updateTask(router.query.id, task);
      } else {
        createTask(task);
      }
      router.push("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (typeof router.query.id === "string") {
      loadTask(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout>
      <div className="">
        <form className="grid grid-cols-1 gap-4 w-full" onSubmit={handleSubmit}>
          <div>
            <label className=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Title
            </label>
            <input
              name="title"
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
              placeholder="Enter your title"
              onChange={handleChange}
              value={task.title}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Description
            </label>

            <textarea
              name="description"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter the description"
              onChange={handleChange}
              value={task.description}
              rows={2}
              required
            ></textarea>
          </div>
          {router.query.id ? (
            <button className="font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700">
              Update
            </button>
          ) : (
            <button className="font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              Create
            </button>
          )}
        </form>
        {router.query.id ? (
          <div>
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="mt-4 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Delete
            </button>
            <Transition appear show={isOpen} as={React.Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsOpen(false)}
              >
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={React.Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Are you sure you want to delete task{" "}
                          <i>{task.title}</i>?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-md text-gray-500 mb-2">
                            {" "}
                            <span className="font-bold">Title:</span>{" "}
                            {task.title}{" "}
                          </p>
                          <p className="text-md text-gray-500 mb-2">
                            {" "}
                            <span className="font-bold">Description:</span>
                            {task.description}{" "}
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => setIsOpen(false)}
                          >
                            Got it, thanks!
                          </button>
                          <button
                            onClick={() =>
                              typeof router.query.id === "string" &&
                              deleteTask(router.query.id)
                            }
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          >
                            Delete it!
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Layout>
  );
};

export default CreateTask;
