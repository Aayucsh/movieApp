import React from 'react';

const Dropdown = ({options, func}) => {

  return (
    <div className=" m-0 sm:m-3 pt-2 flex justify-start items-center ">
      <label htmlFor="categoryDropdown" className="mr-2">Category:</label>
      <select
        id="categoryDropdown"
        onChange={func}
        className="p-2 bg-black rounded border border-gray-700"
      >
        {options.map((items, index)=>{
          return <option key={index} value={items} >{items.replace('_', ' ').toUpperCase()}</option>
        })}
      </select>
    </div>
  );
};

export default Dropdown;