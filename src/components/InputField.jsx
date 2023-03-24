const InputField = ({text,handelInput, handelSubmit}) => {

  return (
    <label>
      <input value={text} onChange={(e) => handelInput(e.target.value)} />
      <button onClick={handelSubmit}>add</button>
  
    </label>
  );


}
export default InputField ;