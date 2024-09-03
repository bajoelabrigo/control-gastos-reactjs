import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="bg-red-600 text-white p-2 font-bold text-sm text-center">
      {children}
    </p>
  );
}
