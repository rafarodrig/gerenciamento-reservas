import { CircleAlert } from "lucide-react";
import Select from "react-select";

export default function SelectInput({
    id,
    name,
    value,
    onChange,
    options,
    placeholder = "Selecione uma opção",
    isDisabled = false,
    isSearchable = false,
    error,
}) {

    return (
        <div className={`position-relative react-select-container ${error ? "is-invalid" : ""}`}>
            <Select
                inputId={id}
                name={name}
                options={options}
                value={options.find((opt) => opt.value === value) || null}
                onChange={(selectedOption) =>
                    onChange({
                        target: {
                            name,
                            value: selectedOption ? selectedOption.value : "",
                        },
                    })
                }
                isSearchable={isSearchable}
                isDisabled={isDisabled}
                classNamePrefix="react-select"
                placeholder={placeholder}

            />
            {error && (
                <CircleAlert className="invalid-icon" size={18} />
            )}
        </div>
    );
}