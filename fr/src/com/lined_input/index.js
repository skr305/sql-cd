import './index.css';
export default (props) => {

    console.log(props.label)

    return (
        <div style={
            {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           
        }
        }>
            <div style={{
                fontSize: "1.2rem",
                fontWeight: "100"
            }}>
                {props.label || ""}
            </div>
            <input className="lined-input-body"
            onChange={props.onChange} 
            onInput={props.onInput}
            placeholder={props.placeholder}
            type={props.type || "text"}
            style={{
                textAlign:  props.textAlign || "left"
            }}/>
        </div>
    )
}