import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { http } from "@/utils";

const { Option } = Select;

const Publish = () => {
    let { channelStore } = useStore();
    //存放上传文件的列表
    let [fileList, setFileList] = useState([]);

    let onUploadChange = ({ fileList }: any) => {
        console.log(fileList);
        setFileList(fileList);
    };

    //切换图片
    let [imgCount, setImgCount] = useState(1);

    let radioChange = (e: any) => {
        const count = e.target.value;
        setImgCount(count);
    };

    let onFinish = async (values: any) => {
        console.log(values);
        let { channel_id, content, title, type } = values;
        let params = {
            channel_id,
            content,
            title,
            type,
            cover: {
                type: type,
                images: fileList.map((item) => item.response.data.url),
            },
        };
        await http.post("/mp/articles?draft=false", params);
        message.success("添加文章成功");
    };

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>发布文章</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1, content: "请输入文章内容" }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: "请输入文章标题" }]}
                    >
                        <Input
                            placeholder="请输入文章标题"
                            style={{ width: 400 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: "请选择文章频道" }]}
                    >
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 400 }}
                        >
                            {channelStore.channelList.map((item: any) => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={radioChange}>
                                <Radio value={0}>无图</Radio>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imgCount > 0 && (
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList
                                action="http://geek.itheima.net/v1_0/upload"
                                fileList={fileList}
                                onChange={onUploadChange}
                                multiple={imgCount > 1}
                                maxCount={imgCount}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: "请输入文章内容" }]}
                    >
                        <ReactQuill theme="snow" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                            >
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default observer(Publish);
