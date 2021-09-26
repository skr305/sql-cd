import './index.css';
import {BankTwoTone} from '@ant-design/icons'
const view = (props) => {
    return (
        <div onClick={props.onClick} style ={{
            textAlign: "center",
            fontWeight: "100",
            fontSize: "1rem"
        }} className={"single-rec-block"}>
            <div className = "img_wrp"
            style ={{
                
            }}>
                <img src={props.hed_img} style={
                    {
                        width: "21em",
                        height: "14em",
                        overflow: "hidden",
                        objectFit: "cover"
                    }
                }>
                </img>
            </div>

            <div className="name" style={{
                fontSize: "2rem",
                fontWeight: "800"
            }}>
                { props.name }
            </div>

            <div className="intro" style={{
                fontWeight: "100",
                fontSize: ".7rem",
            
            }}>
                {props.itr}
            </div>

            <div className="position" style={{
                fontSize: "1.2rem",
                fontWeight: "300"
            }}>
            <BankTwoTone />
                {props.pos}
            </div>
        </div>        
    );
};


const HtlContainer = (props) => {

    const onClick = () => {
        props.onClick(props.id);
    }

    return view({...props, onClick})
};


export default HtlContainer;