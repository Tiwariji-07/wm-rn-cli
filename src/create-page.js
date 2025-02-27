#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// Utility to write file with given content
function createFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created file: ${filePath}`);
}

// Utility to append content to a file
function appendToFile(filePath, content) {
  fs.appendFileSync(filePath, content, "utf8");
  console.log(`Updated file: ${filePath}`);
}

const pageName = process.argv[2];
if (!pageName) {
  console.error("Usage: node create-page.js <PageName>");
  process.exit(1);
}

// Define the base directories
const projectRoot = process.cwd();
const pagesDir = path.join(projectRoot, "src", "pages");
const newPageDir = path.join(pagesDir, pageName);

// Check if src/pages exists
if (!fs.existsSync(pagesDir)) {
  console.error("Error: src/pages directory does not exist.");
  process.exit(1);
}

// Ensure the new page folder does not already exist
if (fs.existsSync(newPageDir)) {
  console.error(`Error: A folder for page "${pageName}" already exists.`);
  process.exit(1);
}

// Create the new page folder
fs.mkdirSync(newPageDir);
console.log(`Created folder: ${newPageDir}`);

// --- Boilerplate Templates ---
// Note: The original templates refer to "WmNewPage". We will replace that with the provided pageName.

const componentTemplate = `import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { AssetProvider } from '@wavemaker/app-rn-runtime/core/asset.provider';
import BasePage from '@wavemaker/app-rn-runtime/runtime/base-page.component';
import { useWatcher } from '@wavemaker/app-rn-runtime/runtime/watcher';
import { WmMemo } from '@wavemaker/app-rn-runtime/runtime/memo.component';
import { ThemeProvider } from '@wavemaker/app-rn-runtime/styles/theme';
import WmAnchor from '@wavemaker/app-rn-runtime/components/basic/anchor/anchor.component';
import WmAppNavbar from '@wavemaker/app-rn-runtime/components/navigation/appnavbar/appnavbar.component';
import WmContent from '@wavemaker/app-rn-runtime/components/page/content/content.component';
import WmLabel from '@wavemaker/app-rn-runtime/components/basic/label/label.component';
import WmLeftPanel from '@wavemaker/app-rn-runtime/components/page/left-panel/left-panel.component';
import WmLinearlayout from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayout.component';
import WmLinearlayoutitem from '@wavemaker/app-rn-runtime/components/container/linearlayout/linearlayoutitem/linearlayoutitem.component';
import WmList from '@wavemaker/app-rn-runtime/components/data/list/list.component';
import WmListTemplate from '@wavemaker/app-rn-runtime/components/data/list/list-template/list-template.component';
import WmPage from '@wavemaker/app-rn-runtime/components/page/page.component';
import WmPageContent from '@wavemaker/app-rn-runtime/components/page/page-content/page-content.component';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import WmPicture from '@wavemaker/app-rn-runtime/components/basic/picture/picture.component';
import WmTabbar from '@wavemaker/app-rn-runtime/components/page/tabbar/tabbar.component';
import { isWebPreviewMode } from '@wavemaker/app-rn-runtime/core/utils';
import WmButton from '@wavemaker/app-rn-runtime/components/basic/button/button.component';
import { merge, get as _get } from 'lodash';
import ResourceResolver from '../../resolve/resource.resolver';
import addPageScript from './${pageName}.script';
import styles from './${pageName}.style';
import getVariables from './${pageName}.variables';

const FragmentContext = React.createContext();

const PC_Mobile_navbar1 = ({ fragment }) => {
  return (
    <WmAppNavbar
      name="mobile_navbar1"
      title="${pageName}"
      backbutton={true}
      show={true}
      onBackbtnclick={() => {
        fragment.goBack();
      }}
      onDrawerbuttonpress={() => {
        fragment.toggleDrawer();
      }}
      listener={fragment}
      showDrawerButton={fragment.hasDrawer}>
      <WmAnchor
        caption=""
        name="AddLink"
        iconclass="wi wi-gear"
        classname="navbarAnchorItem"
        listener={fragment}></WmAnchor>
    </WmAppNavbar>
  );
};

const PC_Page_content1 = ({ fragment }) => {
  return (
    <WmPageContent
      columnwidth={12}
      name="page_content1"
      listener={fragment}
      showskeleton={
        fragment.App.isSkeletonEnabled() && !fragment.startUpVariablesLoaded
      }>
    
    </WmPageContent>
  );
};

const PC_${pageName} = ({ fragment }) => {
  return (
    <WmPage name="${pageName}page" listener={fragment}>
      <PC_Mobile_navbar1 fragment={fragment} />
      <WmContent name="content1" listener={fragment}>
        <>
          {fragment.setDrawerContent(
            <ThemeProvider value={fragment.theme}>
              <WmLeftPanel
                content="leftnav"
                name="left_panel1"
                listener={fragment}
                renderPartial={(props, onLoad) => (
                  <WmPartialContainer
                    onLoad={onLoad}
                    listener={fragment}
                    name={props.name + '_partial_container'}
                    partial_name={props.name + '_partial'}
                    content={props.content}
                    serviceDefinitions={fragment.serviceDefinitions}
                    parentWatcher={fragment.watcher}
                    invokeVariables={props.invokeVariables}
                    themeToUse={fragment.theme}
                  />
                )}></WmLeftPanel>
            </ThemeProvider>,
            'slide-in'
          )}
        </>
        <PC_Page_content1 fragment={fragment} />
      </WmContent>
      <WmTabbar
        name="mobile_tabbar1"
        morebuttoniconclass="wi wi-more-horiz"
        dataset={fragment.Variables.svNavigation.dataSet}
        itemlabel="label"
        itemicon="icon"
        itemlink="link"
        listener={fragment}
        getDisplayExpression={label =>
          label && (fragment.appLocale[label.trim()] || label)
        }
        isActive={item =>
          fragment.appConfig.currentPage?.isActiveTabbarItem({
            label: item.label,
            link: item.link,
            links: [
              ...(item.childnavigation
                ? item.childnavigation.map(i => i.link)
                : []),
              item.link,
            ],
          })
        }
        activePage={fragment.appConfig.currentPage.pageName}></WmTabbar>
    </WmPage>
  );
};

export default class ${pageName} extends BasePage {
  components;

  constructor(props) {
    super(props);
    const _this = this.proxy;
    this.name = '${pageName}';
    this.theme = props.themeToUse || this.appConfig.theme;
    const styleOverrides = this.theme.getStyle(props.classname);
    this.theme = this.theme.$new('${pageName}-styles', styles);
    if (styleOverrides) {
      this.theme = this.theme.$new('${pageName}-styleOverrides', styleOverrides);
    }
  }

  init() {
    const data = getVariables(this.proxy);
    this.fragmentVariables = data.Variables;
    this.fragmentActions = data.Actions;
    this.Variables = Object.assign(this.Variables, data.Variables);
    this.Actions = Object.assign(this.Actions, data.Actions);
    this.startUpVariables = [];
    this.startUpActions = [];
    this.autoUpdateVariables = [];
    addPageScript(this.App, this.proxy);
  }

  provideAsset = path => this.handleUrl(path);

  componentDidMount() {
    this.init();
    super.componentDidMount();
    super.onFragmentReady();
  }

  handleUrl(url) {
    return (
      this.App.handleUrl(url) ||
      ResourceResolver.resolve(url, this.resourceBaseUrl) ||
      super.handleUrl(url)
    );
  }

  renderPage() {
    const fragment = this.proxy;
    return (
      <FragmentContext.Provider value={this.proxy}>
        <AssetProvider value={this.provideAsset}>
          <PC_${pageName} fragment={fragment} />
        </AssetProvider>
      </FragmentContext.Provider>
    );
  }
}
`;

const scriptTemplate = `import moment from 'moment';
import * as _ from 'lodash';
import { Alert } from 'react-native';

export default function addPageScript(App, Page) {
  // auto refresh functions
  const setTimeout = App.lib.setTimeout;
  const setInterval = App.lib.setInterval;

  // Use App.getDependency for Dependency Injection
  // eg: var DialogService = App.getDependency('DialogService');

  // perform any actions on widgets/variables within this block
  Page.onReady = function () {
    // Access variables via Page.Variables, for example:
    // Page.Variables.loggedInUser.getData();
    // Access widgets via Page.Widgets, for example:
    // Page.Widgets.username.datavalue;
  };
}
`;

const styleTemplate = `export default {};`;

const variablesTemplate = `import { ModelVariable } from '@wavemaker/app-rn-runtime/variables/model-variable';
import { ServiceVariable } from '@wavemaker/app-rn-runtime/variables/service-variable';
import { LiveVariable } from '@wavemaker/app-rn-runtime/variables/live-variable';
import { NavigationAction } from '@wavemaker/app-rn-runtime/actions/navigation-action';
import { TimerAction } from '@wavemaker/app-rn-runtime/actions/timer-action';
import { NotificationAction } from '@wavemaker/app-rn-runtime/actions/notification-action';
import { DeviceVariable } from '@wavemaker/app-rn-runtime/variables/device-variable';
import { LoginAction } from '@wavemaker/app-rn-runtime/actions/login-action';
import { LogoutAction } from '@wavemaker/app-rn-runtime/actions/logout-action';
import {
  getEntityPropertyMap,
  getEntityRelatedTables,
} from '../../../metadata/entities/entity-provider';
import WmPartialContainer from '@wavemaker/app-rn-runtime/components/page/partial-container/partial-container.component';
import React from 'react';

export default Page => {
  return {
    Variables: {},
    Actions: {},
  };
};
`;

// Write the four files in the new page folder
const filesToCreate = [
  { filename: `${pageName}.component.js`, content: componentTemplate },
  { filename: `${pageName}.script.js`, content: scriptTemplate },
  { filename: `${pageName}.style.js`, content: styleTemplate },
  { filename: `${pageName}.variables.js`, content: variablesTemplate },
];

filesToCreate.forEach((file) => {
  const filePath = path.join(newPageDir, file.filename);
  createFile(filePath, file.content);
});

// --- Update pages.config ---
// Assume pages.config is at src/pages/pages.config.js
const pagesConfigPath = path.join(pagesDir, "pages-config.js");
if (fs.existsSync(pagesConfigPath)) {
  let configContent = fs.readFileSync(pagesConfigPath, "utf8");

  // Insert new component into the components object.
  // Look for the pattern: "const components = {"
  const newComponentEntry = `
  ${pageName}: {
    type: register({ loader: () => import('./${pageName}/${pageName}.component') }),
    name: '${pageName}Component',
  },`;
  configContent = configContent.replace(
    /(const\s+components\s*=\s*\{)/,
    `$1${newComponentEntry}`
  );

  // Insert new config entry into the configs array.
  // Look for the closing bracket of the configs array: "];"
  const newConfigEntry = `
  { name: '${pageName}', type: 'PAGE', params: [] },`;
  configContent = configContent.replace(
    /(\[\s*\n)([\s\S]*?)(\]\s*;)/,
    (match, p1, p2, p3) => {
      // Append the new config entry at the end of the array (before the closing bracket)
      return p1 + p2 + newConfigEntry + p3;
    }
  );

  fs.writeFileSync(pagesConfigPath, configContent, "utf8");
  console.log(`Updated pages.config.js with new entry for "${pageName}"`);
} else {
  console.error(
    `Warning: pages.config.js not found at ${pagesConfigPath}. Please update it manually.`
  );
}

// --- Update app.variables.js with the navigation action ---
const appVariablesPath = path.join(projectRoot, "src", "app.variables.js");
if (fs.existsSync(appVariablesPath)) {
  const navActionSnippet = `
  goToPage_${pageName}: new NavigationAction({
    name: 'goToPage_${pageName}',
    _context: App,
    operation: 'gotoPage',
    paramProvider: () => ({ pageName: '${pageName}' }),
    appConfig: App.appConfig,
  }),
`;
  // Insert the snippet into the Actions object before the closing "}" of Actions.
  let appVarsContent = fs.readFileSync(appVariablesPath, "utf8");
  appVarsContent = appVarsContent.replace(
    /(Actions:\s*\{)/,
    `$1${navActionSnippet}`
  );
  fs.writeFileSync(appVariablesPath, appVarsContent, "utf8");
  console.log(`Updated app.variables.js with routing action for "${pageName}"`);
} else {
  console.error(
    `Warning: app.variables.js not found at ${appVariablesPath}. Please add the routing action manually.`
  );
}

console.log(`New page "${pageName}" created successfully!`);
