import {
    Breadcrumb,
    Button,
    Card,
    Form,
    Input,
    message,
    Radio,
    Select,
    Space,
    Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { http } from "@/utils";

const { Option } = Select;

const Publish = () => {
    let { channelStore } = useStore();
    //存放上传文件的列表
    let [fileList, setFileList] = useState([]);

    let onUploadChange = ({ fileList }: any) => {
        console.log(fileList);
        setFileList(fileList);
        cacheImageList.current = fileList;
    };

    //使用useRef声明一个暂存仓库
    let cacheImageList = useRef([]);
    //切换图片
    let [imgCount, setImgCount] = useState(1);

    let radioChange = (e: any) => {
        let count = e.target.value;
        setImgCount(count);

        if (count === 1) {
            // 单图，只展示第一张
            const firstImg = cacheImageList.current[0];
            setFileList(!firstImg ? [] : [firstImg]);
        } else if (count === 3) {
            // 三图，展示所有图片
            setFileList(cacheImageList.current);
        }
    };

    let onFinish = async (values: any) => {
        let { channel_id, content, title, type } = values;
        let params = {
            channel_id,
            content,
            title,
            type,
            cover: {
                type: type,
                // @ts-ignore
                images: fileList.map((item) => item.response.data.url),
            },
        };
        if (id) {
            await http.put(`/mp/articles/${id}?draft=false`, params);
        } else {
            await http.post("/mp/articles?draft=false", params);
        }
        message.success("添加文章成功");
    };

    //编辑功能
    //文案适配 路由参数id 判断条件
    let [params] = useSearchParams();
    let id = params.get("id");
    //数据回填 id调用接口 1.表单回填 2.暂存列表 3.upload组件fileList
    let form: any = useRef(null);
    useEffect(() => {
        async function getArticle() {
            let res = await http.get(`/mp/articles/${id}`);
            let { cover, ...formValue } = res.data;
            form.current.setFieldsValue({ ...formValue, type: cover.type });
            //调用setFileList方法回填upload
            let formatImageList = res.data.cover.images.map((url: string) => ({
                url,
            }));
            setFileList(formatImageList);
            //暂存列表
            cacheImageList.current = formatImageList;
        }

        if (id) {
            // 拉取数据回显
            getArticle().then();
        }
    }, [id]);

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {id ? "编辑文章" : "发布文章"}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1, content: "请输入文章内容" }}
                    onFinish={onFinish}
                    ref={form}
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
                                {id ? "更新文章" : "发布文章"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default observer(Publish);
