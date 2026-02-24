import { Children, cloneElement, isValidElement } from "react";

export function ScrollStackItem({ children, onClick, stackIndex = 0 }) {
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
      className="sticky rounded-xl border border-gray-700 bg-[#181818] p-8 shadow-2xl cursor-pointer transition-transform hover:scale-[1.01]"
      style={{ top: `${104 + stackIndex * 14}px` }}
    >
      {children}
    </article>
  );
}

export default function ScrollStack({ children }) {
  const items = Children.toArray(children);

  return (
    <div className="relative space-y-6 pb-20">
      {items.map((child, index) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, {
          stackIndex: index,
          key: child.key ?? index,
        });
      })}
    </div>
  );
}
