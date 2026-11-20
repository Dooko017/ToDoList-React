"use client";

import { useState } from "react";

export default function Home() {
  const [InputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [selectedCategorey, setSelectedCategorey] = useState("ALL");

  const AddJob = () => {
    if (InputValue.trim()) {
      const newJob = {
        id: Date.now(),
        title: InputValue.trim(),
        isDone: false,
      };
      setToDoList([...toDoList, newJob]);
      setInputValue("");
    }
  };

  const deleteJob = (id) => {
    const updatedList = toDoList.filter((job) => {
      return id !== job.id;
    });
    setToDoList(updatedList);
  };

  const changeSelectedCatergorey = (newCategory) => {
    setSelectedCategorey(newCategory);
  };

  const changeJobStatus = (id, status) => {
    const result = toDoList.map((todo) => {
      if (todo.id === id) {
        const newJob = { id: todo.id, title: todo.title, isDone: status };
        return newJob;
      } else {
        return todo;
      }
    });
    setToDoList(result);
  };

  const filteredList = toDoList.filter((job) => {
    if (selectedCategorey === "DONE") return job.isDone === true;
    if (selectedCategorey === "PENDING") return job.isDone === false;
    if (selectedCategorey === "ALL") return true;
  });

  return (
    <div className="min-h-screen bg-[#f5f2eb] flex justify-center p-5">
      <div className="bg-white size-full max-w-xl rounded-3xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-7 text-black">✅ Хийх ажил</h1>
        <p className="text-gray-500 mb-3"> {toDoList.length} ажил</p>
        <div className=" flex justify-center gap-3">
          <input
            type="text"
            value={InputValue}
            placeholder="Шинэ ажил бичих..."
            onChange={(event) => setInputValue(event.target.value)}
            className="border p-3 rounded-lg w-full mb-3 text-black"
          />
          <button
            onClick={AddJob}
            className="bg-slate-500 text-white px-5 py-2 rounded-lg mb-2"
          >
            Нэмэх
          </button>
        </div>
        <div>
          <div className=" flex justify-between gap-3 mb-5">
            <div
              className={`${selectedCategorey === "ALL" ? "bg-[#030C29] " : "bg-gray-200 "} w-full  rounded-xl text-center ${selectedCategorey === "ALL" ? "text-white" : "text-black"} p-4`}
            >
              <button
                onClick={() => {
                  changeSelectedCatergorey("ALL");
                }}
              >
                Бүгд
              </button>
            </div>
            <div
              className={`${selectedCategorey === "DONE" ? "bg-[#030C29] " : "bg-gray-200 "} w-full  rounded-xl text-center ${selectedCategorey === "DONE" ? "text-white" : "text-black"}  p-4`}
            >
              <button
                onClick={() => {
                  changeSelectedCatergorey("DONE");
                }}
              >
                Хийх
              </button>
            </div>

            <div
              className={`${selectedCategorey === "PENDING" ? "bg-[#030C29] " : "bg-gray-200 "} w-full  rounded-xl text-center ${selectedCategorey === "PENDING" ? "text-white" : "text-black"}   p-4`}
            >
              <button
                onClick={() => {
                  changeSelectedCatergorey("PENDING");
                }}
              >
                Дууссан
              </button>
            </div>
          </div>
          <div>
            {filteredList.map((toDo, index) => {
              return (
                <div
                  className="text-black bg-gray-200 mt-2 rounded-xl p-4 flex justify-between "
                  key={index}
                >
                  <input
                    checked={toDo.isDone}
                    onChange={(event) => {
                      changeJobStatus(toDo.id, event.target.checked);
                    }}
                    type="checkBox"
                  />
                  <span>{toDo.title}</span>
                  <button
                    onClick={() => {
                      deleteJob(toDo.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
            {toDoList.length === 0 && (
              <div className="text-center text-black"> Ажил алга 🤷‍♀️</div>
            )}
            {filteredList.length === 0 && (
              <div className="text-center text-black">
                Энэ ангилалд ажил алга 🤷‍♀️
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
