import React from "react";
import {Collapse, Divider, Layout, Space} from "antd";
import MainLayoutFooter from "./MainLayoutFooter";
import {MainChart} from "../mainChart-feature/MainChart";
import { ChartTableData } from "../mainChart-feature/ChartTableData";

const MainLayout: React.FC = () => {

    const {Header, Footer, Sider, Content} = Layout;

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 50,
        lineHeight: '64px',
        // backgroundColor: '#7dbcea',
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        // backgroundColor: '#108ee9',
    };

    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        // backgroundColor: '#7dbcea',
    };


    return (<>
        <Space direction="vertical" style={{width: '100%', height: '100vh'}} size={[0, 48]}>
            <Layout>
                <Layout.Header style={headerStyle}>Header</Layout.Header>
                <Layout.Content style={contentStyle}>
                    <Divider orientation="left">图表展示</Divider>
                    <MainChart/>
                    <Divider orientation="left">数据展示</Divider>
                    <Collapse>
                        <Collapse.Panel header="编辑数据可以修改图表" key="1">
                            <ChartTableData/>
                        </Collapse.Panel>
                    </Collapse>
                </Layout.Content>
                <Layout.Footer style={footerStyle}><MainLayoutFooter/></Layout.Footer>
            </Layout>

        </Space>
    </>);
};

export default MainLayout;