import { useState } from 'react';
import PayInput from './pay_ipt/index';

const view = (props) => {
    return (
        <>
            <PayInput onInput={props.onInput}></PayInput>

        </>
    )
}

export default (props) => {
    const [pwd, set_pwd] = useState("");
    
    const onInput = (value) => {
        props.onInput(value);
        set_pwd(value);
    }



    return view({
        onInput
    });
}