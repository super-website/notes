const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  handleChange,
  value,
}) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label '>
        <span className='label-text capitalize'>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className='input input-bordered'
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}

export default FormInput
