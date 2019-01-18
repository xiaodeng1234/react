import React, { Component } from 'react'
import {
  Layout, Menu, Icon,
} from 'antd'

import {
  withRouter
} from 'react-router-dom'

import './AppFrame.less'

import routes from '../../routes'

const menus = routes.filter(route => route.isMenu === true)

const { Header, Content, Sider } = Layout

class AppFrame extends Component {
  handleMenuClick = ({ key }) => {
    const {
      history,
      match
    } = this.props

    history.push(`${match.path}${key}`)
  }
  render() {
    const defaultSelectedKey=[this.props.location.pathname.split('/').slice(2).join('/')];
    console.log(defaultSelectedKey);
    console.log(this.props,this.props.match.path)
    return (
      <Layout>
        <Header className="header">
          <div className="cp-logo">二手书管理系统</div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[`/${defaultSelectedKey[0]}`]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleMenuClick}
            >
              {
                menus.map(item => {
                  return (
                    <Menu.Item key={item.path}>
                      <Icon type="pie-chart" />
                      <span>{item.title}</span>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(AppFrame)
