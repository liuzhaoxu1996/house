import React, { useState } from 'react'
import { Layout } from 'antd'
import SiderNav from '../../components/SiderNav'
import ContentMain from '../../components/ContentMain'
import HeaderBar from '../../components/HeaderBar'

const { Sider, Content, Header, Footer } = Layout


const Index = () => {
  const [collapsed, setsetCollapsed] = useState(false);

  // 设置Sider的minHeight可以使左右自适应对齐
  return (
    <div id='page'>
      <Layout>
        <Sider collapsible
          trigger={null}
          collapsed={collapsed}
        >
          <SiderNav />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 16px' }}>
            <HeaderBar collapsed={collapsed} appStore={{}} location={{}} />
          </Header>
          <Content>
            <ContentMain />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React-Admin ©2018 Created by 137596665@qq.com<a href='https://github.com/zhangZhiHao1996/react-admin-master' target='_blank' rel="noreferrer">github地址</a>
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}
export default Index