import { type FormEvent, type ChangeEvent, useState } from "react";

const GameStartForm = ({
  onSubmit,
}: {
  onSubmit: (data: { p1Name: string; p2Name: string }) => void;
}) => {
  const [formData, setFormData] = useState({
    p1Name: "",
    p2Name: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.p1Name && formData.p2Name) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="w-96 space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="p1Name">Player 1 Name</label>
        <input
          className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          type="text"
          value={formData.p1Name}
          name="p1Name"
          onChange={handleChange}
          placeholder="Enter Player 1 Name"
          required={true}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="p2Name">Player 2 Name</label>
        <input
          className="block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          type="text"
          value={formData.p2Name}
          name="p2Name"
          onChange={handleChange}
          placeholder="Enter Player 2 Name"
          required={true}
        />
      </div>

      <button
        type="submit"
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Start
      </button>
    </form>
  );
};

export default GameStartForm;
