import { Form, Input, Button,  Modal, notification } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useState } from 'react';
import get_ivk from '../../api/common/lib/get_ivk';
import syn from '../../util/syn_ipt';
import valireg from '../../api/request/valireg';
import becown from '../../api/request/becown';
import GroupInput from '../../com/group_input';
import SelectService from '../../com/service_sel';
import Upload from '../../com/upload'
import {get_usr} from '../../lib/session';
import LinedInput from '../../com/lined_input';
import './index.css'
import { useHistory } from 'react-router-dom';

export default () => {

  const [ser, set_ser] = useState([]);
  const [hedImg, setHedImg] = useState("");
  const [imgs, setImgs] = useState([]);

  const history=useHistory();

  const [service, setService] = useState([]);
  const [instruction, setInstruction] = useState({});
  const [roomCode, setRoomCode] = useState([]);

  const [inValidateModal, setInValidateModal] = useState(false);

  const [registerCode, setRegisterCode] = useState("");
  const [validateCode, setValidateCode] = useState("");

  const [inShowRegCode, setInShowRegCode] = useState(false);
  const [RegisterCodeJustGet, setRegisterCodeJustGet] = useState("");


  const [r_name, set_r_name] = useState("");
  const [pos, set_pos] = useState("");
  const [prc, set_prc] = useState(0);
  const [itr, set_itr] = useState("");


  const openRegCodeModal = () => {
    setInShowRegCode(true);
  }

  const closeRegCodeModal = () => {
    setInShowRegCode(false);
  }

  const onHedImgChange = (FileList) => {
    setHedImg(FileList[0])
  }

  const onImgsChange = (FileList) => {
    setImgs(FileList);

  }

  const onServiceChange = (currentService) => {
      setService(currentService);
  }

  const onInstructionChange = (currentInstruction) => {
    const new_ins = {}
    for(let ins of currentInstruction) {
      new_ins[ins[0]] = ins[1];
    }
    setInstruction(new_ins);
  }

  const onRoomCodeChange = (currentRoomCode) => {
    const newRoomCode = [];
    for(let code of currentRoomCode) {
      newRoomCode.push({head: code[0], begin: code[1], end: code[2]})
    }
    setRoomCode(newRoomCode)
  }

  const onValidate = () => {
    const on_suc = (res) => {
      notification.open({
        message:"????????????,2s?????????????????????"
      })
      closeValidate();

      setTimeout(() => {
        history.replace("/rec")
      }, 1500)
    }


    const api = get_ivk(valireg)(on_suc);
    api(registerCode, validateCode);
  }

  const closeValidate = () => {
    setInValidateModal(false);
  }

  const openValidate = () => {
    setInValidateModal(true);
  }

  const onFinish = () => {
    const stringfyImgs = JSON.stringify(imgs);
    const stringfyInstruction = JSON.stringify(instruction);

    const on_suc = (res) => {
      console.log(res.data);
      setRegisterCodeJustGet(res.data);
      setInShowRegCode(true);

      
    }

    const on_err = (res) => {
      console.error(res)
    }

    const api = get_ivk(becown)(on_suc, on_err, on_err);


    api({r_name, imgs: stringfyImgs, hed_img: hedImg, itr, own: get_usr().usr,
    pos, ins: stringfyInstruction, ser: service,cells: JSON.stringify(roomCode), prc})
    
  };

  const onFinishFailed = (errorInfo) => {
  
  };

  return (
    <div className="bec-total">
      <Form
        name="basic"
        size="large"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >  

      <Form.Item
          // label="??????????????????"
          name="pos"
          rules={[
          {
              required: true,
              message: '??????????????????!',
          },
          ]}
          className="bec-des"
      >
          <LinedInput label={"??????????????????"} onChange={syn(set_pos)}/>
        </Form.Item>



        <Form.Item
          // label="??????????????????"
          name="r_name"
          rules={[
          {
              required: true,
              message: '??????????????????!',
          },
          ]}

          className="bec-des"
        >
          <LinedInput  label={"??????????????????"} onChange={syn(set_r_name)}/>
        </Form.Item>


        <Form.Item
          // label="?????????????????????"
          name="itr"
          rules={[
          {
              required: true
          },
          ]}

          className="bec-des"
        >
          <LinedInput   label={"??????????????????"}  onChange={syn(set_itr)}/>
        </Form.Item>


        <Form.Item
          // label="?????????????????????"
          name="prc"
          rules={[
          {
              required: true
          },
          ]}
          className="bec-des"
        >
          <LinedInput type="number"  label={"?????????????????????"}  onChange={syn(set_prc)}/>
        </Form.Item>
        

          <div style ={{
            display: "flex",
            width: "50vw",
            justifyContent: "space-around",
            margin: "0 auto"
          }}> 
            <div className="bec-des"> 
            ??????????????????
            <Upload maxCount={1} onChange={onHedImgChange}/>
          </div>

          <div className="bec-des">
            ?????????????????????
            <Upload maxCount={4} onChange={onImgsChange}/>
          </div>

          </div>


      
        <div>
          <div style={{
            fontSize: "1.6rem",
            fontWeight: "800",
            margin: "1.2em auto"
          }}>
            ????????????  
          </div>
          <SelectService onChange={onServiceChange}/>
        </div>

        <div>
          <div  style={{
            fontSize: "1.6rem",
            fontWeight: "800",
            margin: "1.2em auto"
          }}>??????????????????</div>
          <GroupInput labels={["??????", "??????"]} onChange={onInstructionChange}/>
        </div>

        <div>
          <div  style={{
            fontSize: "1.6rem",
            fontWeight: "800",
            margin: "1.2em auto"
          }}>??????????????????</div>
          <GroupInput labels = {["??????", "??????", "??????"]} onChange={onRoomCodeChange}
          specifiedInputs = {[null, "number", "number"]}/>
        </div>
        

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >

          <div style={{
            marginTop: "6em"
          }}></div>
          <div type="primary" htmlType="submit" className="lgn-btn"
          style={{
            // margin: "2em auto !important",
            position: "fixed",
            left: "50%",
            bottom: "20px",
            transform: "translate(-50%, 0)",
            fontSize: "1.4rem",
            width: "12em"
            // padding: "2em 5em"
          }}
          onClick={onFinish}>
            ????????????
          </div>
        </Form.Item>
      </Form>

      <div>
        <a onClick={openValidate}>?????????????</a>
      </div>  

      <Modal visible={inValidateModal} onOk={onValidate} onCancel={closeValidate}>
          <div style={{
            textAlign: "center",
            fontWeight: "100",
            fontSize: "2rem",
            marginBottom: "1rem"            
          }}> ???????????? </div>
          ????????????????????? <Input onChange={syn(setRegisterCode)}></Input>
          ????????????????????? <Input onChange={syn(setValidateCode)}></Input>
      </Modal>

      <Modal visible={inShowRegCode} onOk={closeRegCodeModal} onCancel={closeRegCodeModal}>
          <div> < BulbOutlined/> </div>
          <div> ???????????? </div>

          <div style={{
            fontSize: "1.5rem",
            fontWeight: "800"
          }}> 
            ?????????????????? { RegisterCodeJustGet }
          </div>
      </Modal>

    
      
    </div>
  );
};