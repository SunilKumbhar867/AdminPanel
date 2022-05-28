import React, { Component } from 'react';
import { Route } from "react-router-dom";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { Root, getHeader, getDrawerSidebar, getSidebarTrigger, getSidebarContent, getCollapseBtn, getContent } from "@mui-treasury/layout";
import { getFixedScheme } from "@mui-treasury/layout/presets";
import NavContentEx from "../components/NavContentEx";
import HeaderEx from "../components/HeaderEx";
import Title from "../pages/title";
import Sliding from "../pages/sliding";
import AddAdminUser from "../pages/addadminuser";
import AdminUser from "../pages/adminuser";
import SmallLayout from "../pages/smalllayout";

import BrideMaidLayout from "../pages/bridemaidgift";
import FireworkLayout from "../pages/fireworks";

import QuizLayout from "../pages/quiz";
import BlogsLayout from "../pages/blogs";
import ContactUsLayout from "../pages/contactus"

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);
const presets = { createFixedLayout: getFixedScheme() };


class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preset: "createFixedLayout"
    };
  }
  render() {
    return (
      <StylesProvider>
        <CssBaseline />
        <Root scheme={presets[this.state.preset]}>
          {({ state: { sidebar } }) => (
            <>
              <Header style={{ position: "sticky" }}
              >
                <Toolbar >
                  <SidebarTrigger sidebarId="primarySidebar" />
                  <HeaderEx {...this.props} />
                </Toolbar>
              </Header>
              <DrawerSidebar sidebarId="primarySidebar" >
                <SidebarContent style={{ backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)' }} >
                  <NavContentEx  {...this.props} />
                </SidebarContent>
                <CollapseBtn style={{ backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)', border: 0 }} />
              </DrawerSidebar>
              <Content >
                <Route path={this.props.match.url} exact render={(props) => <h1>Hello World</h1>} />
                <Route path={this.props.match.url + "/title"} render={(props) => <Title/>} />
                <Route path={this.props.match.url + "/sliding"} render={(props) => <Sliding/>} />
                <Route path={this.props.match.url + "/addadminuser"} render={(props) => <AddAdminUser/>} />
                <Route path={this.props.match.url + "/adminuser"} render={(props) => <AdminUser/>} />
                <Route path={this.props.match.url + "/smalllayout"} render={(props) => <SmallLayout/>} />
                <Route path={this.props.match.url + "/bridemaidgift"} render={(props) => <BrideMaidLayout/>} />
                <Route path={this.props.match.url + "/fireworks"} render={(props) => <FireworkLayout/>} />
                <Route path={this.props.match.url + "/quiz"} render={(props) => <QuizLayout/>} />
                <Route path={this.props.match.url + "/blogs"} render={(props) => <BlogsLayout/>} />
                <Route path={this.props.match.url + "/contactus"} render={(props) => <ContactUsLayout/>} />
                

                
              </Content>
            </>
          )}
        </Root>
      </StylesProvider>
    );
  }
}

export default home;
