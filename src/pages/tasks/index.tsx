import * as React from "react";
import Layout from "../../components/Layout";
import { Task } from "../../interfaces/Task";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks/");
  const tasks = await res.json();
  return {
    props: {
      tasks: tasks,
    },
  };
};

interface TaskProps {
  tasks: Task[];
}

const Tasks: React.FunctionComponent<TaskProps> = ({ tasks }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => router.push(`/tasks/edit/${task.id}`)}
            className=" p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-left "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {task.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {task.description}
            </p>
            {task.created_on && (
              <pre>
                {new Date(task.created_on).toLocaleDateString()}
              </pre>
            )}
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Tasks;
