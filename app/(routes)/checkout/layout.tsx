import { ReactNode } from "react";

const CheckoutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default CheckoutLayout;
