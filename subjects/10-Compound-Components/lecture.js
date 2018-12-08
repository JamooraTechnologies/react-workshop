import React from "react";
import ReactDOM from "react-dom";

import * as styles from "./styles";

// class Tabs extends React.Component {
//   static defaultProps = { disabled: [] };

//   state = { activeIndex: 0 };

//   selectTabIndex(activeIndex) {
//     this.setState({ activeIndex });
//   }

//   renderTabs() {
//     return this.props.data.map((tab, index) => {
//       const isActive = this.state.activeIndex === index;
//       const isDisabled = this.props.disabled.includes(index);
//       return (
//         <div
//           key={tab.label}
//           style={
//             isDisabled
//               ? styles.disabledTab
//               : isActive
//                 ? styles.activeTab
//                 : styles.tab
//           }
//           onClick={isDisabled ? null : () => this.selectTabIndex(index)}
//         >
//           {tab.label}
//         </div>
//       );
//     });
//   }

//   renderPanel() {
//     const tab = this.props.data[this.state.activeIndex];
//     return <div>{tab.content}</div>;
//   }

//   render() {
//     const tabs = <div style={styles.tabList}>{this.renderTabs()}</div>;
//     const panels = (
//       <div style={styles.tabPanels}>{this.renderPanel()}</div>
//     );

//     return (
//       <div>
//         {this.props.tabsPlacement === "bottom"
//           ? [panels, tabs]
//           : [tabs, panels]}
//       </div>
//     );
//   }
// }

class Tabs2 extends React.Component {
  state = { activeIndex: 0 };

  selectIndex = index => this.setState({ activeIndex: index });

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, child => {
          if (child.type === TabList) {
            return React.cloneElement(child, {
              _activeIndex: this.state.activeIndex,
              _selectIndex: this.selectIndex
            });
          } else if (child.type === TabPanels) {
            return React.cloneElement(child, {
              _activeIndex: this.state.activeIndex
            });
          }

          return child;
        })}
      </div>
    );
  }
}

function TabList({ children, _activeIndex, _selectIndex }) {
  return (
    <div style={styles.tabList}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          _isActive: _activeIndex === index,
          _onSelect: () => _selectIndex(index)
        });
      })}
    </div>
  );
}

function Tab({ children, disabled, _isActive, _onSelect }) {
  return (
    <div
      style={
        disabled
          ? styles.disabledTab
          : _isActive
            ? styles.activeTab
            : styles.tab
      }
      onClick={disabled ? null : _onSelect}
    >
      {children}
    </div>
  );
}

function TabPanels({ children, _activeIndex }) {
  return (
    <div style={styles.tabPanels}>
      {React.Children.toArray(children)[_activeIndex]}
    </div>
  );
}

function TabPanel({ children }) {
  return <div>{children}</div>;
}

function Tabs({ data = [], disabled = [], tabsPlacement = "top" }) {
  const tabs = (
    <TabList>
      {data.map((item, index) => (
        <Tab key={index} disabled={disabled.includes(index)}>
          {item.label}
        </Tab>
      ))}
    </TabList>
  );

  const panels = (
    <TabPanels>
      {data.map((item, index) => (
        <TabPanel key={index}>{item.content}</TabPanel>
      ))}
    </TabPanels>
  );

  return (
    <Tabs2>
      {tabsPlacement === "bottom" ? [panels, tabs] : [tabs, panels]}
    </Tabs2>
  );
}

class App extends React.Component {
  render() {
    // return (
    //   <Tabs2>
    //     <TabList>
    //       <Tab>Tacos</Tab>
    //       <Tab disabled>Burritos</Tab>
    //       <Tab>Coconut Korma</Tab>
    //     </TabList>
    //     <TabPanels>
    //       <TabPanel>
    //         <p>Tacos are delicious</p>
    //       </TabPanel>
    //       <TabPanel>
    //         <p>Sometimes a burrito is what you really need</p>
    //       </TabPanel>
    //       <TabPanel>
    //         <p>Might be your best option</p>
    //       </TabPanel>
    //     </TabPanels>
    //     <TabList>
    //       <Tab>Tacos</Tab>
    //       <Tab disabled>Burritos</Tab>
    //       <Tab>Coconut Korma</Tab>
    //     </TabList>
    //   </Tabs2>
    // );

    const tabData = [
      {
        label: "Tacos",
        content: <p>Tacos are delicious</p>
      },
      {
        label: "Burritos",
        content: <p>Sometimes a burrito is what you really need</p>
      },
      {
        label: "Coconut Korma",
        content: <p>Might be your best option</p>
      }
    ];

    return (
      <div>
        <Tabs data={tabData} tabsPlacement="bottom" disabled={[1]} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
