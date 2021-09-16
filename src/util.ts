import { UseFormRegisterReturn } from 'react-hook-form';

export const registerMui = (res: UseFormRegisterReturn) => {
  return {
    inputRef: res.ref,
    onChange: res.onChange,
    onBlur: res.onBlur,
    name: res.name,
  };
}

const util = {

  hasProperty: <K extends string>(
    x: unknown,
    ...name: K[]
  ): x is { [M in K]: unknown } => {
    return (
      x instanceof Object && name.every(prop => prop in x)
    );
  }

}

export default util;