import { Fragment } from "react";



const TextInput = (props) => {
  const inputClass = `form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;
const placeholder = props.placeholder ? props.placeholder : props.label
const required = props.noRequired ? !props.noRequired : true;

const onchangehandler = (event) => {
  props.setFunction(event.target.value);
}

  return (
    <Fragment>
      <div className="form-floating mb-1 xl:w-full">
        <label className="text-gray-700">{props.label}</label>
        <input
          type="text"
          className={inputClass}
          id="name"
          placeholder={placeholder}
          value = {props.value}
          onChange={onchangehandler}
        />
      </div>
      {required && <p className="text-red-500 text-xs italic mb-4">* required field</p>}
    </Fragment>
  );
};

export default TextInput;
