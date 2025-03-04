import React from 'react'

interface Props {
    callback: () => void;
    children: any;
}

const Button = ({ callback, children }: Props) => {
  return (
    <>
    <button className="p-2 flex items-center gap-2 text-white hover:bg-gray-700 rounded" onClick={() => callback()}>
        {children}
      </button>
    </>
  )
}

export default Button
