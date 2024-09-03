import { Category, DraftExpense, Expense } from "../types";
import { v4 as uuidv4 } from "uuid";

export type BudgetAction =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "reset-app" }
  | {type: "add-filter-category", payload: {id: Category["id"]}}

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: "", //para filtrar por categoria
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetAction
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingId: "", //para que al cerrar el modal, se resetee el id de la expenses que se quiere editar
    };
  }
  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      //cerrar modal despues de agregar
      modal: false,
    };
  }
  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ), //filtrar expenses que no tienen el id que se pasa en payload
    };
  }
  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id, //actualizar el id de la expenses que se quiere editar
      modal: true, //para que se llene el formulario con la información
    };
  }
  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: false,
      editingId: "", //para que se cierre el modal y se borre la información del formulario de edición
    };
  }
  if (action.type === "reset-app") {
    return {
      ...state,
      budget: 0,
      expenses: []
    };
  }
  if(action.type === "add-filter-category"){
    return {
      ...state,
      currentCategory: action.payload.id //actualizar la categoria que se quiere filtrar
    }
  }
  return state;
};
