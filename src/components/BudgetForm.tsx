import { useState, ChangeEvent, useMemo } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {

  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit =(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type:"add-budget", payload: {budget}})


  }

  return (
    <form className="space-y-5"
    onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />

        <input type="submit"  value="Definir Presupuesto" className="bg-blue-600 hover:bg-blue-700 w-full p-2 text-white font-bold uppercase disabled:opacity-40"
        disabled={isValid}
        />
      </div>
    </form>
  );
}
