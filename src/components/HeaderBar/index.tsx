import React, { useState } from 'react'
import { Badge, Dropdown, Menu, Modal } from 'antd'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../utils/session'

type TProps = {
  appStore: any;
  history?: any;
  location: any;
  collapsed?: any;
}

const HeaderBar = (props: TProps) => {
  const [count, setCount] = useState(100);
  const [visible, setVisible] = useState(false);

  const logout = () => {
    props.appStore.toggleLogin(false)
    props.history.push(props.location.pathname)
  }

  const { appStore, location } = props

  const notLogin = (
    <div>
      <Link to={{ pathname: '/login', state: { from: location } }} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>登录</Link>&nbsp;
      <img src={""} alt="" />
    </div>
  )

  const menu = (
    <Menu className='menu'>
      <Menu.ItemGroup title='用户中心' className='menu-group'>
        <Menu.Item>你好 - {isAuthenticated()}</Menu.Item>
        <Menu.Item>个人信息</Menu.Item>
        <Menu.Item><span onClick={logout}>退出登录</span></Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title='设置中心' className='menu-group'>
        <Menu.Item>个人设置</Menu.Item>
        <Menu.Item>系统设置</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  )
  const login = (
    <Dropdown overlay={menu}>
      <img onClick={() => setVisible(true)} src={""} alt="" />
    </Dropdown>
  )
  return (
    <div id='headerbar'>
      <div style={{ lineHeight: '64px', float: 'right' }}>
      </div>
      <Modal
        footer={null} closable={false}
        visible={visible}
        wrapClassName="vertical-center-modal"
        onCancel={() => setVisible(false)}>
        <img src={''} alt="" width='100%' />
      </Modal>
    </div>
  )
}

export default HeaderBar