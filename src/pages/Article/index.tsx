import { Link } from "react-router-dom";
import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    DatePicker,
    Select,
    Table,
    Space,
    Tag,
} from "antd";
// 引入dist下的locale
import "moment/dist/locale/zh-cn";
import "./index.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useEffect, useState } from "react";
import { http } from "@/utils";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
    //频道列表管理
    let [channelList, setChannelList] = useState([]);
    let loadChannelList = async () => {
        let res = await http.get("/channels");
        setChannelList(res.data.channels);
    };

    useEffect(() => {
        loadChannelList().then();
    }, []);

    //文章列表管理 统一管理数据 将来修改给setList传对象
    let [articleDate, setArticleDate] = useState({
        list: [],
        count: 0,
    });

    //文章参数管理
    let [params, setParams] = useState({
        page: 1,
        per_page: 10,
    });

    useEffect(() => {
        let loadList = async () => {
            let res = await http.get("/mp/articles", { params });
            console.log(res);
            // @ts-ignore
            let { results, total_count } = res.data;
            setArticleDate({
                list: results,
                count: total_count,
            });
        };
        loadList().then();
    }, [params]);

    let onFinish = (values: any) => {
        console.log(values);
        let { status, channel_id, date } = values;
        //数据处理
        let _params = {
            status: undefined,
            channel_id: undefined,
            begin_pubdate: undefined,
            end_pubdate: undefined,
        };
        if (status !== -1) {
            _params.status = status;
        }
        if (channel_id !== undefined) {
            _params.channel_id = channel_id;
        }
        if (date) {
            _params.begin_pubdate = date[0].format("YYYY-MM-DD");
            _params.end_pubdate = date[1].format("YYYY-MM-DD");
        }
        //修改params数据 引起接口重新发送
        setParams({
            ...params,
            ..._params,
        });
    };

    let pageChange = (page: any) => {
        setParams({
            ...params,
            page,
        });
    };
    const columns = [
        {
            title: "封面",
            dataIndex: "cover",
            width: 120,
            render: (cover: any) => {
                return (
                    <img
                        src={cover.images || img404}
                        width={80}
                        height={60}
                        alt=""
                    />
                );
            },
        },
        {
            title: "标题",
            dataIndex: "title",
            width: 220,
        },
        {
            title: "状态",
            dataIndex: "status",
            render: (data: any) => <Tag color="green">审核通过</Tag>,
        },
        {
            title: "发布时间",
            dataIndex: "pubdate",
        },
        {
            title: "阅读数",
            dataIndex: "read_count",
        },
        {
            title: "评论数",
            dataIndex: "comment_count",
        },
        {
            title: "点赞数",
            dataIndex: "like_count",
        },
        {
            title: "操作",
            render: (data: any) => {
                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                );
            },
        },
    ];

    return (
        <div>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form onFinish={onFinish} initialValues={{ status: -1 }}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            {channelList.map((item: any) => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        <RangePicker></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginLeft: 80 }}
                        >
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/*文章列表区域*/}
            <Card title={`根据筛选条件共查询到 ${articleDate.count} 条结果：`}>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={articleDate.list}
                    pagination={{
                        position: ['bottomCenter'],
                        pageSize: params.per_page,
                        total: articleDate.count,
                        onChange: pageChange,
                    }}
                />
            </Card>
        </div>
    );
};

export default Article;
