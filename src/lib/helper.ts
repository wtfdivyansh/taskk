export const getRandomColor = () => {
  const colors = [
    "bg-sky-500/20 text-sky-500",
    "bg-blue-500/20 text-blue-500",
    "bg-emerald-500/20 text-emerald-500",
    "bg-red-500/20 text-red-500",
    "bg-yellow-500/20 text-yellow-500",
    "bg-violet-500/20 text-violet-500",
    "bg-purple-500/20 text-purple-500",
    "bg-pink-500/20 text-pink-500",
    "bg-orange-500/20 text-orange-500",
    "bg-teal-500/20 text-teal-500",
    "bg-green-500/20 text-green-500",
    "bg-indigo-500/20 text-indigo-500",
    "bg-lime-500/20 text-lime-500",
    "bg-amber-500/20 text-amber-500",
    "bg-cyan-500/20 text-cyan-500",
    "bg-rose-500/20 text-rose-500",
    "bg-fuchsia-500/20 text-fuchsia-500",
    "bg-gray-500/20 text-gray-500",
    "bg-stone-500/20 text-stone-500",
    "bg-neutral-500/20 text-neutral-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const colors = [
  {
    label: "sky",
    value: "sky-500",
  },
  {
    label: "red",
    value: "red-500",
  },
  {
    label: "green",
    value: "emerald-500",
  },
  {
    label: "blue",
    value: "blue-500",
  },
  {
    label: "yellow",
    value: "yellow-500",
  },
  {
    label: "purple",
    value: "purple-500",
  },
  {
    label: "pink",
    value: "pink-500",
  },
  {
    label: "indigo",
    value: "indigo-500",
  },
  {
    label: "orange",
    value: "orange-500",
  },
  {
    label: "teal",
    value: "teal-500",
  },
];
