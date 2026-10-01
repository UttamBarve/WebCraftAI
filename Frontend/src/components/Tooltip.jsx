export default function Tooltip({ children, text }) {
  return (
    <div className="relative group">
      {children}

      <span className="
        absolute
        top-full
        left-1/2
        -translate-x-1/2
        mt-2
        px-2.5
        py-1
        text-xs
        text-white
        bg-zinc-800
        rounded-md
        whitespace-nowrap
        opacity-0
        group-hover:opacity-100
        transition-opacity
        pointer-events-none
        z-50
      ">
        {text}
      </span>
    </div>
  );
}