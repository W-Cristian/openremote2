const SelectorInput = (props) =>{

    const label = props.label;
    const options = props.options;
    const required = props.noRequired ? !props.noRequired : true;

return(<div className="w-full">
    <label className="block mb-2 text-base font-small text-gray-900 dark:text-white">
      {label}
    </label>
    <select
      onChange={(e) => props.handle(e)}
      className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {required && <p className="text-red-500 text-xs italic">* required field</p>}

  </div>);
};

export default SelectorInput;