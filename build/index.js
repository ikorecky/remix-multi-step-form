var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url }),
      {
        onAllReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url }),
      {
        onShellReady() {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(error) {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-M335MQCD.css";

// app/root.tsx
var import_jsx_runtime2 = require("react/jsx-runtime"), meta = () => ({
  charset: "utf-8",
  title: "Remix Multi Step Form",
  viewport: "width=device-width,initial-scale=1"
}), links = () => [
  { rel: "stylesheet", href: tailwind_default }
];
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.LiveReload, {})
    ] })
  ] });
}

// app/routes/wizard.step.tsx
var wizard_step_exports = {};
__export(wizard_step_exports, {
  default: () => WizardStepsLayoutScreen
});
var import_react4 = require("@remix-run/react");

// app/hooks/use-outlet-handle.ts
var import_react3 = require("@remix-run/react");
function useOutletHandle(key) {
  let handles = (0, import_react3.useMatches)().filter((match) => match.handle && match.handle.key === key).map((match) => match.handle);
  if (handles.length === 0)
    throw new Error(`This route should export a handle with key ${key}`);
  return handles;
}

// app/routes/wizard.step.tsx
var import_classnames = __toESM(require("classnames")), import_jsx_runtime3 = require("react/jsx-runtime");
function WizardStepsLayoutScreen() {
  let { stepNumber } = useOutletHandle("onboarding")[0];
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex flex-col items-center h-screen bg-Magnolia lg:justify-around", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "h-screen w-full lg:fixed  lg:rounded-lg lg:bg-White lg:w-[58.563rem] lg:max-h-[37.5rem] lg:flex lg:flex-col lg:items-center lg:justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "h-screen lg:absolute lg:top-4 lg:bg-White lg:flex lg:flex-row lg:justify-center lg:items-center lg:w-[56.75rem] lg:max-h-[35.563rem]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative -top-3 text-White flex flex-row justify-center pt-10 gap-4  bg-mobileBg bg-cover bg-no-repeat h-[12rem] font-ubuntu lg:bg-desktopBg lg:min-h-[35.438rem] lg:min-w-[17.063rem] lg:flex-col lg:justify-start lg:top-0 lg:pt-10 lg:pl-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "lg:flex lg:items-center lg:gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "p",
          {
            className: (0, import_classnames.default)(
              "duration-300 w-8 h-8 flex items-center justify-center rounded-full border-solid border-White border",
              {
                " bg-Lightblue border-none text-Marineblue": stepNumber === 1
              }
            ),
            children: "1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex-col items-start justify-start hidden lg:flex", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs font-normal text-Pastelblue", children: "STEP 1" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm font-medium", children: "YOUR INFO" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: " lg:flex lg:items-center lg:gap-4 active:bg-Pastelblue", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "p",
          {
            className: (0, import_classnames.default)(
              " duration-300 w-8 h-8 flex items-center justify-center rounded-full border-solid border-White border",
              {
                " bg-Lightblue border-none text-Marineblue": stepNumber === 2
              }
            ),
            children: "2"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex-col items-start justify-start hidden lg:flex", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs font-normal text-Pastelblue", children: "STEP 2" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm font-medium", children: "SELECT PLAN" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: " lg:flex lg:items-center lg:gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "p",
          {
            className: (0, import_classnames.default)(
              " duration-300 w-8 h-8 flex items-center justify-center rounded-full border-solid border-White border",
              {
                " bg-Lightblue border-none text-Marineblue": stepNumber === 3
              }
            ),
            children: "3"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex-col items-start justify-start hidden lg:flex", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs font-normal text-Pastelblue", children: "STEP 3" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm font-medium", children: "ADD-ONS" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: " lg:flex lg:items-center lg:gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "p",
          {
            className: (0, import_classnames.default)(
              "duration-300 w-8 h-8 flex items-center justify-center rounded-full border-solid border-White border",
              {
                " bg-Lightblue border-none text-Marineblue": stepNumber === 4 || stepNumber === 5
              }
            ),
            children: "4"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex-col items-start justify-start hidden lg:flex", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs font-normal text-Pastelblue", children: "STEP 4" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm font-medium", children: "SUMMARY" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative flex flex-col items-center w-full text-base -top-28 font-ubuntu lg:top-0 lg:h-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react4.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Footer, { stepNumber })
    ] })
  ] }) }) });
}
function Footer(props) {
  let { stepNumber } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: stepNumber !== 5 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "footer",
    {
      className: (0, import_classnames.default)(
        "fixed bottom-0 bg-White p-4 w-full flex justify-center cursor-pointer lg:absolute  lg:bg-none lg:w-full"
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: (0, import_classnames.default)(
            "w-[21.438rem] lg:w-full",
            {
              " flex justify-end": stepNumber === 1
            },
            {
              "flex items-center justify-between  lg:px-20": stepNumber !== 1
            }
          ),
          children: [
            stepNumber !== 1 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(BackButton, {}) : null,
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(NextButton, { stepNumber })
          ]
        }
      )
    }
  ) : null });
}
function BackButton() {
  let navigate = (0, import_react4.useNavigate)();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_react4.Link,
    {
      to: "",
      onClick: (e) => {
        navigate(-1), e.preventDefault();
      },
      className: "text-sm font-medium text-Lightgray hover:text-Coolgray",
      children: "Go Back"
    }
  );
}
function NextButton(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "button",
    {
      form: `step-${props.stepNumber}`,
      className: (0, import_classnames.default)(
        "text-xs lg:text-sm font-medium bg-Marineblue text-Lightblue py-2 px-4 flex items-center justify-center  rounded duration-300  ",
        { "lg:mr-24": props.stepNumber === 1 },
        { "hover:bg-Purplishblue": props.stepNumber === 4 }
      ),
      type: "submit",
      children: props.stepNumber === 4 ? "Confirm" : "Next Step"
    }
  );
}

// app/routes/wizard.step/1.tsx
var __exports = {};
__export(__exports, {
  action: () => action,
  default: () => WizardStep1Screen,
  handle: () => handle,
  loader: () => loader,
  meta: () => meta2
});
var import_node3 = require("@remix-run/node"), import_node4 = require("@remix-run/node"), import_react5 = require("@remix-run/react");

// app/sessions/wizard-session.server.ts
var import_node2 = require("@remix-run/node"), SESSION_KEY = "wizardSession", sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__wizardSession",
    httpOnly: !0,
    path: "/wizard",
    sameSite: "lax",
    secrets: ["s3cr3t"],
    secure: !0
  }
});
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getWizardSession(request) {
  return (await getSession(request)).get(SESSION_KEY);
}
async function getMaybeWizardSession(request) {
  return await getWizardSession(request) || null;
}
async function commitWizardSession(request, wizardSession) {
  let session = await getSession(request);
  return wizardSession ? session.set(SESSION_KEY, {
    ...session.get(SESSION_KEY) || {},
    ...wizardSession
  }) : session.set(SESSION_KEY, null), sessionStorage.commitSession(session);
}
async function destroyWizardSession(request) {
  let session = await getSession(request);
  return (0, import_node2.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/routes/wizard.step/1.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), handle = {
  key: "onboarding",
  title: "Personal Info",
  stepNumber: 1
};
function meta2() {
  return {
    title: `Step ${handle.stepNumber} | ${handle.title}`
  };
}
async function loader({ request }) {
  let onboardingWizardSession = await getMaybeWizardSession(request);
  return (0, import_node3.json)(onboardingWizardSession);
}
async function action({ request }) {
  let formData = await request.formData(), { name, email, phone, nextStep } = Object.fromEntries(
    formData
  );
  return (0, import_node4.redirect)(`/wizard/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, { name, email, phone })
    }
  });
}
function WizardStep1Screen() {
  let data = (0, import_react5.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_react5.Form, { id: "step-1", method: "post", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("fieldset", { className: "bg-White flex flex-col items-center w-80 h-max pb-8 px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-3 pb-7", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { className: "text-2xl font-bold text-Marineblue", children: handle.title }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-Coolgray", children: "Please provide your name, email address, and phone number." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-[1.125rem] w-full lg:px-12 ", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "text-xs font-medium text-Marineblue after:content-['*'] after:ml-1 after:text-Strawberryred", children: "Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "input",
            {
              type: "text",
              placeholder: "e.g. Stephen King",
              defaultValue: data == null ? void 0 : data.name,
              name: "name",
              required: !0,
              className: "px-4 py-2 font-medium border rounded border-Coolgray focus:outline-Strawberryred focus:bg-White text-Marineblue"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-1 ", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "text-xs font-medium text-Marineblue after:content-['*'] after:ml-1 after:text-Strawberryred", children: "Email Address" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "input",
            {
              type: "email",
              placeholder: "e.g. stephenking@lorem.com",
              defaultValue: data == null ? void 0 : data.email,
              name: "email",
              required: !0,
              className: "px-4 py-2 font-medium border rounded border-Coolgray focus:outline-Strawberryred focus:bg-White text-Marineblue"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-1 ", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { className: "text-xs font-medium text-Marineblue after:content-['*'] after:ml-1 after:text-Strawberryred", children: "Phone Number" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "input",
            {
              type: "tel",
              placeholder: "e.g +1 234 567 890",
              name: "phone",
              defaultValue: data == null ? void 0 : data.phone,
              required: !0,
              className: "px-4 py-2 font-medium border rounded border-Coolgray focus:outline-Strawberryred focus:bg-White text-Marineblue"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { type: "hidden", name: "nextStep", value: "2" })
  ] });
}

// app/routes/wizard.step/2.tsx
var __exports2 = {};
__export(__exports2, {
  action: () => action2,
  default: () => WizardStep2Screen,
  handle: () => handle2,
  loader: () => loader2,
  meta: () => meta3
});
var import_node5 = require("@remix-run/node"), import_node6 = require("@remix-run/node"), import_react6 = require("@remix-run/react");
var import_classnames2 = __toESM(require("classnames")), import_react7 = require("react");

// app/images/icon-arcade.svg
var icon_arcade_default = "/build/_assets/icon-arcade-N5GNUKGC.svg";

// app/images/icon-advanced.svg
var icon_advanced_default = "/build/_assets/icon-advanced-DKFNGD4O.svg";

// app/images/icon-pro.svg
var icon_pro_default = "/build/_assets/icon-pro-DYSMVTQJ.svg";

// app/routes/wizard.step/2.tsx
var import_jsx_runtime5 = require("react/jsx-runtime"), handle2 = {
  key: "onboarding",
  title: "Select Your Plan",
  stepNumber: 2
};
function meta3() {
  return {
    title: `Step ${handle2.stepNumber} | ${handle2.title}`
  };
}
async function loader2({ request }) {
  let onboardingWizardSession = await getMaybeWizardSession(request);
  return (0, import_node5.json)(onboardingWizardSession);
}
async function action2({ request }) {
  let formData = await request.formData(), { subscription, period, planCost, nextStep } = Object.fromEntries(
    formData
  );
  return console.log(subscription, period, planCost, nextStep), (0, import_node6.redirect)(`/wizard/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, {
        subscription,
        period,
        planCost
      })
    }
  });
}
function WizardStep2Screen() {
  let data = (0, import_react6.useLoaderData)(), [subscription, setSubscription] = (0, import_react7.useState)({
    arcade: (data == null ? void 0 : data.subscription) === "arcade" || (data == null ? void 0 : data.subscription) === "on",
    advance: (data == null ? void 0 : data.subscription) === "advance",
    pro: (data == null ? void 0 : data.subscription) === "pro"
  }), selectArcade = () => {
    setSubscription({
      arcade: !0,
      advance: !1,
      pro: !1
    });
  }, selectAdvance = () => {
    setSubscription({
      arcade: !1,
      advance: !0,
      pro: !1
    });
  }, selectPro = () => {
    setSubscription({
      arcade: !1,
      advance: !1,
      pro: !0
    });
  }, ArcadeStyle = {
    borderColor: subscription.arcade ? "hsl(243, 100%, 62%)" : "hsl(231, 11%, 63%, 50%)",
    background: subscription.arcade ? "hsl(206, 94%, 87%)" : "white"
  }, AdvanceStyle = {
    borderColor: subscription.advance ? "hsl(243, 100%, 62%)" : "hsl(231, 11%, 63%, 50%)",
    background: subscription.advance ? "hsl(206, 94%, 87%)" : "white"
  }, ProStyle = {
    borderColor: subscription.pro ? "hsl(243, 100%, 62%)" : "hsl(231, 11%, 63%, 50%)",
    background: subscription.pro ? "hsl(206, 94%, 87%)" : "white"
  }, [cost, setCost] = (0, import_react7.useState)({
    arcade: (data == null ? void 0 : data.period) === "yr" ? 90 : 9,
    advance: ((data == null ? void 0 : data.period) === "yr", 120),
    pro: (data == null ? void 0 : data.period) === "yr" ? 150 : 15
  }), [istoggled, setIsToggle] = (0, import_react7.useState)(!1), [period, setPeriod] = (0, import_react7.useState)((data == null ? void 0 : data.period) || "mo"), onToggle = () => {
    setPeriod(period === "mo" ? "yr" : "mo"), setIsToggle(!istoggled), setCost({
      arcade: period === "mo" ? cost.arcade * 10 : cost.arcade / 10,
      advance: period === "mo" ? cost.advance * 10 : cost.advance / 10,
      pro: period === "mo" ? cost.pro * 10 : cost.pro / 10
    });
  }, [selectedCost, setSelectedCost] = (0, import_react7.useState)(0);
  return (0, import_react7.useEffect)(() => {
    !subscription.arcade && !subscription.pro ? setSelectedCost(cost.advance) : !subscription.advance && !subscription.pro ? setSelectedCost(cost.arcade) : !subscription.arcade && !subscription.advance ? setSelectedCost(cost.pro) : setSelectedCost(0);
  }, [
    subscription.advance,
    subscription.arcade,
    subscription.pro,
    cost.advance,
    cost.arcade,
    cost.pro
  ]), /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react6.Form, { id: "step-2", method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-White  flex flex-col items-center w-[21.438rem] h-auto pb-8 px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col gap-5 pb-7 lg:w-full lg:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h1", { className: "text-2xl font-bold text-Marineblue", children: handle2.title }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: " text-Coolgray", children: "You have the option of monthly or yearly bill." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        role: "group",
        "aria-labelledby": "subscription-radio-group",
        className: "flex flex-col w-full gap-3 lg:px-12 lg:grid lg:grid-cols-3 lg:gap-8",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "label",
            {
              className: "flex flex-row gap-3 items-start pl-3 py-[1.125rem] rounded-md border-[0.063rem] border-opacity-50  border-Coolgray lg:flex-col lg:gap-[2.625rem] cursor-pointer",
              style: ArcadeStyle,
              onClick: selectArcade,
              htmlFor: "arcade",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "input",
                  {
                    className: "sr-only",
                    type: "radio",
                    id: "arcade",
                    value: "arcade",
                    name: "subscription",
                    defaultChecked: (data == null ? void 0 : data.subscription) === "arcade"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center ", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { src: icon_arcade_default, alt: "arcade icon" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-start ", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: "font-medium cursor-pointer text-Marineblue", children: "Arcade" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: " text-Coolgray", children: [
                    "$",
                    cost.arcade,
                    "/",
                    period
                  ] }),
                  period === "yr" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs font-medium text-Marineblue", children: "2 months free" }) : null
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "label",
            {
              htmlFor: "advance",
              className: "  flex flex-row gap-3 items-start pl-3 py-[1.125rem] rounded-md border-[0.063rem] border-opacity-50  border-Coolgray lg:flex-col lg:gap-[2.625rem] cursor-pointer",
              style: AdvanceStyle,
              onClick: selectAdvance,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "input",
                  {
                    className: "sr-only",
                    type: "radio",
                    id: "advance",
                    value: "advance",
                    name: "subscription",
                    defaultChecked: (data == null ? void 0 : data.subscription) === "advance"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center h-full ", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { src: icon_advanced_default, alt: "advance icon" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-start ", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: "font-medium cursor-pointer text-Marineblue", children: "Advanced" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: " text-Coolgray", children: [
                    "$",
                    cost.advance,
                    "/",
                    period
                  ] }),
                  period === "yr" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs font-medium text-Marineblue", children: "2 months free" }) : null
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "label",
            {
              htmlFor: "pro",
              className: "  flex flex-row gap-3 items-start pl-3 py-[1.125rem] rounded-md border-[0.063rem] border-opacity-50  border-Coolgray lg:flex-col lg:gap-[2.625rem] cursor-pointer",
              style: ProStyle,
              onClick: selectPro,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "input",
                  {
                    className: "sr-only",
                    type: "radio",
                    id: "pro",
                    value: "pro",
                    name: "subscription",
                    defaultChecked: (data == null ? void 0 : data.subscription) === "pro"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center h-full ", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { src: icon_pro_default, alt: "pro icon" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-start ", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: "font-medium cursor-pointer text-Marineblue", children: "Pro" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: " text-Coolgray", children: [
                    "$",
                    cost.pro,
                    "/",
                    period
                  ] }),
                  period === "yr" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs font-medium text-Marineblue", children: "2 months free" }) : null
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-row items-center justify-center h-12 gap-6 rounded-md bg-Magnolia lg:col-span-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "div",
              {
                className: (0, import_classnames2.default)("font-bold text-Coolgray", {
                  " text-Marineblue": period === "mo"
                }),
                children: "Monthly"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
              "label",
              {
                htmlFor: "period",
                className: "relative h-5 rounded-full cursor-pointer w-9 bg-Marineblue",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "input",
                    {
                      type: "checkbox",
                      id: "period",
                      name: "period",
                      value: "mo",
                      className: "sr-only",
                      defaultChecked: (data == null ? void 0 : data.period) === "mo",
                      onClick: onToggle
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "input",
                    {
                      type: "hidden",
                      name: "period",
                      value: period,
                      defaultChecked: (data == null ? void 0 : data.period) === "yr"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "span",
                    {
                      className: (0, import_classnames2.default)(
                        " bg-White h-3 w-3 rounded-full absolute top-1 left-1 peer-checked:bg-Purplishblue duration-300",
                        {
                          "translate-x-4": period === "yr"
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "div",
              {
                className: (0, import_classnames2.default)("font-bold text-Coolgray", {
                  "text-Marineblue": period === "yr"
                }),
                children: "Yearly"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "hidden", name: "planCost", value: selectedCost }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "hidden", name: "nextStep", value: "3" })
        ]
      }
    )
  ] }) });
}

// app/routes/wizard.step/3.tsx
var __exports3 = {};
__export(__exports3, {
  action: () => action3,
  default: () => WizardStep3Screen,
  handle: () => handle3,
  loader: () => loader3,
  meta: () => meta4
});
var import_node7 = require("@remix-run/node"), import_node8 = require("@remix-run/node"), import_react8 = require("@remix-run/react");
var import_classnames3 = __toESM(require("classnames")), import_jsx_runtime6 = require("react/jsx-runtime"), handle3 = {
  key: "onboarding",
  title: "Pick add-ons",
  stepNumber: 3
};
function meta4() {
  return {
    title: `Step ${handle3.stepNumber} | ${handle3.title}`
  };
}
async function loader3({ request }) {
  let onboardingWizardSession = await getMaybeWizardSession(request);
  return (0, import_node7.json)(onboardingWizardSession);
}
async function action3({ request }) {
  let formData = await request.formData(), { addon1, addon2, addon3, nextStep } = Object.fromEntries(
    formData
  );
  return (0, import_node8.redirect)(`/wizard/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, {
        addon1,
        addon2,
        addon3
      })
    }
  });
}
function WizardStep3Screen() {
  let data = (0, import_react8.useLoaderData)(), addonsCost = {
    addon1: (data == null ? void 0 : data.period) === "yr" ? 10 : 1,
    addon2: (data == null ? void 0 : data.period) === "yr" ? 20 : 2,
    addon3: (data == null ? void 0 : data.period) === "yr" ? 20 : 2
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react8.Form, { id: "step-3", method: "post", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-White  flex flex-col  items-center w-[21.438rem] h-auto pb-8 px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col gap-5 pb-7 lg:w-full lg:px-12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { className: "text-2xl font-bold text-Marineblue", children: handle3.title }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { className: "text-Coolgray", children: "Addons help enhance gaming experience" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        "div",
        {
          role: "group",
          "aria-labelledby": "addons-checkbox-group",
          className: "flex flex-col gap-3",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "label",
              {
                htmlFor: "multiplayerGames",
                className: (0, import_classnames3.default)(
                  " p-[0.938rem] rounded-md border-[0.063rem] border-Coolgray lg:w-[28rem] cursor-pointer",
                  {
                    "bg-Lightblue border-Purplishblue": (data == null ? void 0 : data.addon1) === "multiplayerGames"
                  }
                ),
                children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-row items-center justify-start", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-row items-center justify-start w-full gap-4 ", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                      "input",
                      {
                        type: "checkbox",
                        name: "addon1",
                        value: "multiplayerGames",
                        id: "multiplayerGames",
                        defaultChecked: (data == null ? void 0 : data.addon1) === "multiplayerGames",
                        className: "w-5 h-5 rounded-sm "
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col items-start ", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm font-bold text-Marineblue", children: "Online Services" }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs text-Coolgray w-[9.688rem]", children: "Access to multiplayer games" })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-xs font-medium text-Purplishblue", children: [
                    "+$",
                    addonsCost == null ? void 0 : addonsCost.addon1,
                    "/",
                    data == null ? void 0 : data.period
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "label",
              {
                htmlFor: "storage",
                className: (0, import_classnames3.default)(
                  " flex flex-row  items-start justify-center p-[0.938rem] rounded-md border-[0.063rem] border-Coolgray lg:w-[28rem] cursor-pointer",
                  { "bg-Lightblue border-Purplishblue": (data == null ? void 0 : data.addon2) === "storage" }
                ),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-row items-center justify-start w-full gap-4 ", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                      "input",
                      {
                        type: "checkbox",
                        value: "storage",
                        name: "addon2",
                        id: "storage",
                        defaultChecked: (data == null ? void 0 : data.addon2) === "storage",
                        className: "w-5 h-5 rounded-sm "
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col items-start", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm font-bold text-Marineblue", children: "Larger storage" }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-Coolgray w-[9.688rem] text-xs", children: "Extra 1tb of cloud space" })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center h-full text-Purplishblue", children: [
                    "+$",
                    addonsCost == null ? void 0 : addonsCost.addon2,
                    "/",
                    data == null ? void 0 : data.period
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "label",
              {
                htmlFor: "customize",
                className: (0, import_classnames3.default)(
                  " flex flex-row  items-start justify-center p-[0.938rem] rounded-md border-[0.063rem] border-Coolgray lg:w-[28rem] cursor-pointer",
                  {
                    "bg-Lightblue border-Purplishblue": (data == null ? void 0 : data.addon3) === "customize"
                  }
                ),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-row items-center justify-start w-full gap-4 ", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                      "input",
                      {
                        type: "checkbox",
                        name: "addon3",
                        value: "customize",
                        id: "customize",
                        defaultChecked: (data == null ? void 0 : data.addon3) === "customize",
                        className: "w-5 h-5 rounded-sm "
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col items-start ", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm font-bold text-Marineblue", children: "Customizable profile" }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: " text-Coolgray w-[10.688rem] text-xs", children: "Custom theme in your profile" })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center h-full text-Purplishblue", children: [
                    "+$",
                    addonsCost == null ? void 0 : addonsCost.addon3,
                    "/",
                    data == null ? void 0 : data.period
                  ] })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { type: "hidden", name: "nextStep", value: "4" })
  ] });
}

// app/routes/wizard.step/4.tsx
var __exports4 = {};
__export(__exports4, {
  action: () => action4,
  default: () => WizardStep4Screen,
  handle: () => handle4,
  loader: () => loader4,
  meta: () => meta5
});
var import_node9 = require("@remix-run/node"), import_node10 = require("@remix-run/node"), import_react9 = require("@remix-run/react");
var import_classnames4 = __toESM(require("classnames")), import_jsx_runtime7 = require("react/jsx-runtime"), handle4 = {
  key: "onboarding",
  title: "Finishing up",
  stepNumber: 4
};
function meta5() {
  return {
    title: `Step ${handle4.stepNumber} | ${handle4.title}`
  };
}
async function loader4({ request }) {
  let onboardingWizardSession = await getMaybeWizardSession(request);
  return (0, import_node9.json)(onboardingWizardSession);
}
async function action4({ request }) {
  let formData = await request.formData(), { totalCost, nextStep } = Object.fromEntries(formData);
  return (0, import_node10.redirect)(`/wizard/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, { totalCost })
    }
  });
}
function WizardStep4Screen() {
  let data = (0, import_react9.useLoaderData)();
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function transformToWord(str) {
    return str === "yr" ? "Yearly" : "Monthly";
  }
  let addonsCost = {
    addon1: (data == null ? void 0 : data.period) === "mo" ? 1 : 10,
    addon2: (data == null ? void 0 : data.period) === "mo" ? 2 : 20,
    addon3: (data == null ? void 0 : data.period) === "mo" ? 2 : 20
  }, totalCost = ((data == null ? void 0 : data.addon1) === "multiplayerGames" ? addonsCost.addon1 : 0) + ((data == null ? void 0 : data.addon2) === "storage" ? addonsCost.addon2 : 0) + ((data == null ? void 0 : data.addon3) === "customize" ? addonsCost.addon3 : 0) + Number(data == null ? void 0 : data.planCost);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_react9.Form, { id: "step-4", method: "post", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-White flex flex-col items-center w-[21.438rem] h-auto pb-8 px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex flex-col gap-5 pb-7 lg:w-full lg:px-12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h1", { className: "text-2xl font-bold text-Marineblue", children: "Finishing up" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { className: "text-Coolgray", children: "Double check everything looks OK before confirming" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: " flex flex-row  items-start justify-center w-[18.25rem] p-[0.938rem] rounded-md bg-Magnolia lg:w-[28rem] lg:px-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-row items-center justify-start w-full gap-4 ", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex flex-col items-start ", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "font-bold text-Marineblue", children: [
            capitalizeFirstLetter((data == null ? void 0 : data.subscription) || ""),
            "(",
            transformToWord((data == null ? void 0 : data.period) || ""),
            ")"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            import_react9.Link,
            {
              to: "/wizard/step/2",
              className: "underline duration-300 text-Coolgray hover:text-Purplishblue",
              children: "change"
            }
          )
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center h-full font-bold text-Marineblue", children: [
          "+$",
          data == null ? void 0 : data.planCost,
          "/",
          data == null ? void 0 : data.period
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: " flex flex-row  items-start justify-center w-[18.25rem] p-[0.938rem] rounded-md bg-Magnolia lg:w-[28rem]", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: " flex flex-col gap-5 lg:w-[28rem] ", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
          "div",
          {
            className: (0, import_classnames4.default)(
              " flex w-[16.375rem] lg:w-[28rem] lg:px-6",
              { hidden: (data == null ? void 0 : data.addon1) !== "multiplayerGames" }
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-row items-center justify-start w-full gap-4 text-Coolgray", children: "Online service" }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center h-full text-Marineblue", children: [
                "+$",
                addonsCost.addon1,
                "/",
                data == null ? void 0 : data.period
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
          "div",
          {
            className: (0, import_classnames4.default)(
              " flex w-[16.375rem] lg:w-[28rem] lg:px-6",
              { hidden: (data == null ? void 0 : data.addon2) !== "storage" }
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-row items-center justify-start w-full gap-4 text-Coolgray", children: "Larger storage" }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center h-full text-Marineblue", children: [
                "+$",
                addonsCost.addon2,
                "/",
                data == null ? void 0 : data.period
              ] })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
          "div",
          {
            className: (0, import_classnames4.default)(
              " flex w-[16.375rem] lg:w-[28rem] lg:px-6",
              { hidden: (data == null ? void 0 : data.addon3) !== "customize" }
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-row items-center justify-start w-full gap-4 text-Coolgray", children: "Customizable Profile" }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center h-full text-Marineblue", children: [
                "+$",
                addonsCost.addon3,
                "/",
                data == null ? void 0 : data.period
              ] })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "py-7 flex w-[16.375rem] lg:py-8 lg:w-[28rem] lg:px-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex flex-row items-center justify-start w-full gap-4 text-Coolgray", children: [
          "Total(",
          transformToWord((data == null ? void 0 : data.period) || ""),
          ")"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center h-full text-Marineblue", children: [
          "+$",
          totalCost,
          "/",
          data == null ? void 0 : data.period
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { type: "hidden", name: "totalCost", value: totalCost }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { type: "hidden", name: "nextStep", value: "5" })
  ] });
}

// app/routes/wizard.step/5.tsx
var __exports5 = {};
__export(__exports5, {
  action: () => action5,
  default: () => WizardStep3Screen2,
  handle: () => handle5,
  loader: () => loader5,
  meta: () => meta6
});
var import_node12 = require("@remix-run/node"), import_react10 = require("@remix-run/react");

// app/utils/assert-referer.server.ts
var import_node11 = require("@remix-run/node");
function assertReferer(request, { redirectTo }) {
  if (!request.headers.get("referer"))
    throw (0, import_node11.redirect)(redirectTo);
}

// app/images/icon-thank-you.svg
var icon_thank_you_default = "/build/_assets/icon-thank-you-YYLNJNOY.svg";

// app/routes/wizard.step/5.tsx
var import_framer_motion = require("framer-motion"), import_jsx_runtime8 = require("react/jsx-runtime"), handle5 = {
  key: "onboarding",
  title: "Thank You",
  stepNumber: 5
};
function meta6() {
  return {
    title: `Step ${handle5.stepNumber} | ${handle5.title}`
  };
}
async function loader5({ request }) {
  assertReferer(request, { redirectTo: "/wizard" });
  let onboardingWizardSession = await getWizardSession(request);
  return (0, import_node12.json)(onboardingWizardSession);
}
async function action5({ request }) {
  return destroyWizardSession(request);
}
function WizardStep3Screen2() {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react10.Form, { id: "step-5", method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    import_framer_motion.motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
      className: "bg-White flex flex-col items-center justify-center w-[21.438rem] h-full pb-8 px-[1.625rem] pt-9 rounded-lg font-ubuntu lg:w-[39.875rem] lg:h-[35.438rem] lg:pt-12 lg:px-12",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", { src: icon_thank_you_default, alt: "check mark", className: "pb-5" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h1", { className: "pb-4 text-2xl font-bold text-Marineblue", children: handle5.title }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-center lg:w-[27rem] text-Coolgray", children: "Thanks for confirming your subscription! We hope you have fun using our platform. if you ever need support, please feel free to email us at support@loremgaming.com" })
      ]
    }
  ) }) });
}

// app/routes/wizard.tsx
var wizard_exports = {};
__export(wizard_exports, {
  default: () => WizardScreen,
  loader: () => loader6
});
var import_node13 = require("@remix-run/node");
async function loader6({ request }) {
  return (0, import_node13.redirect)("/wizard/step/1", {
    headers: {
      "Set-Cookie": await commitWizardSession(request, null)
    }
  });
}
function WizardScreen() {
  return null;
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader7
});
var import_node14 = require("@remix-run/node");
async function loader7() {
  return (0, import_node14.redirect)("/wizard");
}
function Index() {
  return null;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "025b7ad4", entry: { module: "/build/entry.client-VZP2VXWM.js", imports: ["/build/_shared/chunk-VJUYVM6J.js", "/build/_shared/chunk-G5WX4PPA.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-7CZ74CDO.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-KABE77FO.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/wizard": { id: "routes/wizard", parentId: "root", path: "wizard", index: void 0, caseSensitive: void 0, module: "/build/routes/wizard-WOKDLRZ7.js", imports: ["/build/_shared/chunk-6SVPTVQG.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/wizard.step": { id: "routes/wizard.step", parentId: "root", path: "wizard/step", index: void 0, caseSensitive: void 0, module: "/build/routes/wizard.step-S2W67PIJ.js", imports: ["/build/_shared/chunk-F2552FQP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/wizard.step/1": { id: "routes/wizard.step/1", parentId: "routes/wizard.step", path: "1", index: void 0, caseSensitive: void 0, module: "/build/routes/wizard.step/1-HTZOASWN.js", imports: ["/build/_shared/chunk-6SVPTVQG.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/wizard.step/2": { id: "routes/wizard.step/2", parentId: "routes/wizard.step", path: "2", index: void 0, caseSensitive: void 0, module: "/build/routes/wizard.step/2-5T3A6V5I.js", imports: ["/build/_shared/chunk-6SVPTVQG.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/wizard.step/3": { id: "routes/wizard.step/3", parentId: "routes/wizard.step", path: "3", index: void 0, caseSensitive: void 0, module: "/build/routes/wizard.step/3-ZJ2YI3AZ.js", imports: ["/build/_shared/chunk-6SVPTVQG.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/wizard.step/4": { id: "routes/wizard.step/4", parentId: "routes/wizard.step", path: "4", index: void 0, caseSensitive: void 0, module: "/build/routes/wizard.step/4-FQEFL2VU.js", imports: ["/build/_shared/chunk-6SVPTVQG.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/wizard.step/5": { id: "routes/wizard.step/5", parentId: "routes/wizard.step", path: "5", index: void 0, caseSensitive: void 0, module: "/build/routes/wizard.step/5-DTJT3SG2.js", imports: ["/build/_shared/chunk-6SVPTVQG.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, url: "/build/manifest-025B7AD4.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !0, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/wizard.step": {
    id: "routes/wizard.step",
    parentId: "root",
    path: "wizard/step",
    index: void 0,
    caseSensitive: void 0,
    module: wizard_step_exports
  },
  "routes/wizard.step/1": {
    id: "routes/wizard.step/1",
    parentId: "routes/wizard.step",
    path: "1",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  },
  "routes/wizard.step/2": {
    id: "routes/wizard.step/2",
    parentId: "routes/wizard.step",
    path: "2",
    index: void 0,
    caseSensitive: void 0,
    module: __exports2
  },
  "routes/wizard.step/3": {
    id: "routes/wizard.step/3",
    parentId: "routes/wizard.step",
    path: "3",
    index: void 0,
    caseSensitive: void 0,
    module: __exports3
  },
  "routes/wizard.step/4": {
    id: "routes/wizard.step/4",
    parentId: "routes/wizard.step",
    path: "4",
    index: void 0,
    caseSensitive: void 0,
    module: __exports4
  },
  "routes/wizard.step/5": {
    id: "routes/wizard.step/5",
    parentId: "routes/wizard.step",
    path: "5",
    index: void 0,
    caseSensitive: void 0,
    module: __exports5
  },
  "routes/wizard": {
    id: "routes/wizard",
    parentId: "root",
    path: "wizard",
    index: void 0,
    caseSensitive: void 0,
    module: wizard_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
