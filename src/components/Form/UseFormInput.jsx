import { Input } from "reactstrap";

const UseFormInput = ({ register, name, validation, ...rest }) => {
    const { ref, ...registerField } = register(name, validation);
    return <Input innerRef={ref} autoComplete={'off'} {...registerField} {...rest} />
}

export default UseFormInput