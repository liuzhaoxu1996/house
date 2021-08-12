import React, { useState } from 'react'
import { Layout } from 'antd'
import SiderNav from '../../components/SiderNav'
import HeaderBar from '../../components/HeaderBar'
import styles from './index.module.scss';
const { Sider, Content, Header, Footer } = Layout


const Index = () => {
  const [collapsed, setsetCollapsed] = useState(false);

  // 设置Sider的minHeight可以使左右自适应对齐
  return (
    <div style={{
      height: '100%'
    }}>
      <Layout style={{
        height: '100%'
      }}>
        <Sider collapsible
          trigger={null}
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <SiderNav />
        </Sider>
        <Layout style={{ marginLeft: 200, height: '100%' }}>
          <Header style={{ background: '#fff', padding: '0 16px' }}>
            <HeaderBar collapsed={collapsed} appStore={{}} location={{}} />
          </Header>
          <Content style={{
            margin: '24px 16px 0',
            height: '100%'
          }}>
            <div className={styles.content}></div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React-Admin ©2020 Created by 1097959570@qq.com<a href='https://github.com/liuzhaoxu1996/' target='_blank' rel="noreferrer">&nbsp;github地址</a>
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}
export default Index