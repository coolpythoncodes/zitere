import "./checkbox.css"

const CheckBox = ({ value, onChange, checked }) => {
    return (
        <label className="checkbox-container text-[10px] leading-4 font-medium">{value}
            <input type="checkbox" value={value} onChange={onChange} checked={checked} />
            <span className="checkmark"></span>
        </label>
    )
}

export default CheckBox