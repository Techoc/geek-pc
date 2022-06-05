import "./index.scss";
// 思路：
// 1.看官方文档把echarts加入项目
// 如何在react获取dom --> useRef
// 在什么地方获取dom节点 --> useEffect
// 2.不抽离定制化的参数先把最小化的demo跑起来
// 3.按照需求，哪些参数需要自定义抽象出来
import Bar from "@/components/Bar";

const Home = () => {
  return (
    <div>
      <Bar
        style={{ width: "500px", height: "400px" }}
        xData={["Java", "Golang", "Python"]}
        sData={[50, 60, 70]}
        title="主流后端语言"
      />

      <Bar
        style={{ width: "500px", height: "400px" }}
        xData={["vue", "angular", "react"]}
        sData={[50, 60, 70]}
        title="三大框架使用度"
      />
    </div>
  );
};
export default Home;
