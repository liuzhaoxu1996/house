import React, { useState, useEffect } from 'react';
import { Menu, MenuTheme } from 'antd';
import PrivateRoute from "../../routes/PrivateRoute";
type TProps = {
  location: {
    pathname: string,
  },
  theme: MenuTheme,
  menus: any[],
}



const CustomMenu = (props: TProps) => {
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  useEffect(() => {
    // 防止页面刷新侧边栏又初始化了
    const pathname = props.location.pathname;
    //获取当前所在的目录层级
    const rank = pathname.split('/')
    switch (rank.length) {
      case 2:  //一级目录
        setSelectedKeys([pathname]);
        break;
      case 5: //三级目录，要展开两个subMenu
        setSelectedKeys([pathname]);
        setOpenKeys([rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')])
        break;
      default:
        setSelectedKeys([pathname]);
        setOpenKeys([pathname.substr(0, pathname.lastIndexOf('/'))])
    }
    return () => {
      setSelectedKeys([]);
      setOpenKeys([]);
    }
  }, [props.location.pathname]);

  const onOpenChange = () => {
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      setOpenKeys(openKeys);
      return;
    }

    //最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1]
    //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    //只适用于3级菜单
    if (latestOpenKey.includes(openKeys[0])) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey);
    }
  }

  const renderMenuItem = ({ key, title, }: { key: number, title: string }) => {
    return (
      <Menu.Item key={key}>
        <PrivateRoute to={key}>
          <span>{title}</span>
        </PrivateRoute>
      </Menu.Item>
    )
  }

  const renderSubMenu = ({ key, title, subs }: { key: number, title: string, subs?: any[] }) => {
    return (
      <Menu.SubMenu key={key} title={<span><span>{title}</span></span>}>
        {
          subs && subs.map(item => {
            return item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
          })
        }
      </Menu.SubMenu>
    )
  }

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={({ key }) => setSelectedKeys([key])}
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      theme={props.theme ? props.theme : 'dark'}
      mode='inline'>
      {
        props.menus && props.menus.map(item => {
          return item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
        })
      }
    </Menu>
  );
};

export default CustomMenu;
