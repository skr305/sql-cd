import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  React  from 'react';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ fileList }) => {
    this.setState({ fileList })
    if(typeof this.props.onChange == "function") {
        const base64Result = [];
        for(let img of fileList) {
          base64Result.push(await getBase64(img.originFileObj))
        }
        this.props.onChange(base64Result);
    }
    
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={null}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {(this.props.maxCount && fileList.length < this.props.maxCount) || 
          fileList.length < 1 ? uploadButton : null}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '200%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}