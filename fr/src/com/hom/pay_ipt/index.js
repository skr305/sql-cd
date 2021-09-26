import { useState, useRef, useEffect } from "react";

const view = (props) => {
    return (
        <div>
            {
                (() => {
                    const res = [];
                    
                    res.push(<input 
                        style = {{
                            maxWidth: "1.5rem",
                            outline: "none",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: ".1rem"
                        }}
                        className="pay-ipt"
                        type="password" maxLength="1" id={`pay_pwd_0`} key="0"
                        onInput={props.onInput} onKeyDown={props.onKeyDown}/>)

                    for(let i=1; i<6; i++) {
                        res.push(<input disabled type="password" maxLength="1"  key={`${i}`}
                        id={`pay_pwd_${i}`} onInput={props.onInput} onKeyDown={props.onKeyDown}
                        style = {{
                            maxWidth: "1.5rem",
                            outline: "none",
                            borderRadius: "3px",
                            border: "1px solid black",
                            padding: ".1rem"
                        }}
                        className="pay-ipt"/>)
                    }

                    return res;
                }) ()
            }
        </div>        
    );
};


export default (props) => {

    const [pwd, set_pwd] = useState("");

    const emit_input = async (value, index) => {
        console.log(index);

        const new_pwd = (() => {
            const bits = pwd.split("");
            bits[index] = value;
            console.log(bits);
            return bits.join("");
        })()
        console.log(new_pwd);

        await set_pwd(new_pwd);
        console.log(pwd)
        props.onInput(new_pwd);
    };
    
    const onInput = (e) => {
        console.log(e);
        const index = Number(e.target.id[8]);        
        const value = e.target.value;
        if(value.length == 1) {
            if(index != 5) {
                
                e.target.disabled = "true"
                const next_bit = document.getElementById(`pay_pwd_${index+1}`);
                next_bit.removeAttribute("disabled");
                next_bit.focus();
            }
        }

        emit_input(value, index);
        
    };


    const onKeyDown = (e) => {
        if(e.keyCode != 8) {
            return;
        }

        const index = Number(e.target.id[8]);        
        const value = e.target.value;

        //delete one bit
        if(value.length == 0) {
            if(index != 0) {
                e.target.disabled = "true"
                const front_bit = document.getElementById(`pay_pwd_${index-1}`);
                front_bit.removeAttribute("disabled");
                front_bit.focus();
                front_bit.value = "";
            } 
        }

       

        emit_input(value, index);
    }
    

    return view({
        onInput,
        onKeyDown,


    });
};  