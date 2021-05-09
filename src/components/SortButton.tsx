import React, { FC } from "react";

type Props = {
  label: string;
  clickHandler: () => void;
};

const SortButton: FC<Props> = ({ label, clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className="bg-gray-500 hover:bg-gray-700 text-white whitespace-nowrap font-bold py-2 px-4 my-1 mx-1 rounded"
    >
      {label}
    </button>
  );
};

export default SortButton;
