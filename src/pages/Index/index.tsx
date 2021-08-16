import React, { useState } from 'react'
import { Layout, Card, Col, Row } from 'antd'
import SiderNav from '../../components/SiderNav'
import HeaderBar from '../../components/HeaderBar'
import WangqianChart from './WangqianChart'
import HuanbiChart from './HuanbiChart/index'
import TongbiChart from './TongbiChart/index'
import ZaishowChart from './ZaishouChart/index'
import styles from './index.module.scss';

const { Sider, Content, Header, Footer } = Layout


const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    // console.log(this)  状态提升后，到底是谁调用的它
    setCollapsed(!collapsed)
  }
  // 设置Sider的minHeight可以使左右自适应对齐
  return (
    <div style={{
      minHeight: '100%'
    }}>
      <Layout style={{
        minHeight: '100%'
      }}>
        <Sider collapsible
          trigger={null}
          collapsed={collapsed}
          style={{
            position: 'fixed',
            left: 0,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <SiderNav />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? '80px' : '200px', height: '100%' }}>
          <Header style={{ background: '#fff', padding: '0 16px' }}>
            <HeaderBar collapsed={collapsed} appStore={{}} location={{}} onToggle={toggle} />
          </Header>
          <Content style={{
            margin: '24px 16px 0',
            minHeight: '100%'
          }}>
            <div className={styles.content}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="近年来网签住宅数量" bordered={false}>
                    <div className={styles.chart}>
                      <WangqianChart />
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="链家在售房源数趋势图" bordered={false}>
                    <div className={styles.chart}>
                      <ZaishowChart />
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="住宅销售价格环比(上月)指数" bordered={false}>
                    <div className={styles.chart}>
                      <HuanbiChart />
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="住宅销售价格同比(上年同月)指数" bordered={false}>
                    <div className={styles.chart}>
                      <TongbiChart />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            React-Admin ©2020 Created by 1097959570@qq.com&nbsp;<a href='https://github.com/liuzhaoxu1996/' target='_blank' rel="noreferrer">github地址</a>
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}
export default Index