import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MessageProvider } from "./lib";
import { LayoutProvider } from "./lib/layout/contexts/layout-context";
import DynamicLoadComponent from "./lib/layout/utils/dynamicLoadComponent";

const a = React.memo(() => {
  return <>123</>;
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MessageProvider>
      <LayoutProvider
        refreshTokenUrl="/auth/refresh"
        authUrl="/auth"
        menuType="multiple"
        customSettings={
          <React.Fragment>
            <div>123</div>
          </React.Fragment>
        }
        menus={[
          {
            main: true,
            key: "main",
            group: "main",
            title: "통합조회",
            iconName: "chart-simple",
            component: a,
          },
          {
            key: "masterData",
            group: "masterData",
            title: "기준정보",
            iconName: "database",
            children: [
              {
                key: "product",
                shortKey: "prd",
                group: "masterData",
                title: "품목관리",
                component: App,
              },
              {
                key: "users",
                shortKey: "usr",
                group: "masterData",
                title: "사원관리",
              },
            ],
          },
          {
            key: "delivery",
            group: "delivery",
            title: "납품관리",
            iconName: "truck",
            children: [
              {
                key: "delivery",
                shortKey: "usr",
                group: "masterData",
                title: "사원관리",
                children: [
                  {
                    key: "product",
                    shortKey: "prd",
                    group: "masterData",
                    title: "품목관리",
                    hasClose: true,
                    component: App,
                  },
                  {
                    key: "product2",
                    shortKey: "prd",
                    group: "masterData",
                    title: "품목관리",
                    component: App,
                  },
                ],
              },
              {
                key: "delivery2",
                shortKey: "usr",
                group: "masterData",
                title: "사원관리",
                children: [
                  {
                    key: "product",
                    shortKey: "prd",
                    group: "masterData",
                    title: "품목관리",
                    component: App,
                  },
                ],
              },
            ],
          },
        ]}
      >
        <App />
      </LayoutProvider>
    </MessageProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
