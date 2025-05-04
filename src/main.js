import '@logseq/libs'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

/**
 * user model
 */
function createModel() {
  return {
    openWindsurfPicker() {
      logseq.showMainUI()
    },
  }
}

/**
 * app entry
 */
function main() {
  logseq.setMainUIInlineStyle({
    position: 'fixed',
    zIndex: 11,
  })

  const key = logseq.baseInfo.id
  console.log(key);

  logseq.provideStyle(`
  div[data-injected-ui=open-in-windsurf-${key}] {
    display: flex;
    align-items: center;
    font-weight: 500;
    position: relative;
    top: 0px;
    opacity: 0.7;
  }

  div[data-injected-ui=logseq-open-in-windsurf--${key}]:hover a {
    opacity: 1;
  }
  
  div[data-injected-ui=logseq-open-in-windsurf--${key}] a.button {
    padding: 2px 6px 0 6px;
  }

  div[data-injected-ui=logseq-open-in-windsurf--${key}] iconfont {
    font-size: 18px;
  }
  `)

  // external btns
  logseq.App.registerUIItem('toolbar', {
    key: 'logseq-open-in-windsurf',
    template: `
      <a id="open-in-windsurf-anchor" class="button" data-on-click="openWindsurfPicker" style="padding-bottom: 0px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4285F4"/>
        <path d="M2 17L12 22L22 17V7L12 12L2 7V17Z" fill="#34A853"/>
        <path d="M12 12L2 7V17L12 12Z" fill="#FBBC05"/>
        <path d="M12 12L22 7V17L12 12Z" fill="#EA4335"/>
      </svg>
      </a>
    `,
  })

  // main UI
  createApp(App).mount('#app')
}

// bootstrap
logseq
  .useSettingsSchema([{
    key: 'distro',
    type: 'enum',
    title: 'URL Scheme',
    description: 'Open the files in Windsurf',
    default: 'windsurf',
    enumChoices: ['windsurf'],
    enumPicker: 'select'
  }, {
    key: 'window',
    type: 'enum',
    title: 'Windsurf Window',
    description: 'Where do you want to open the page?',
    default: 'new',
    enumChoices: ['Always in a new window', 'Reuse the last active window', 'In the graph folder', 'In the graph folder (as workspace)'],
    enumPicker: 'select'
  },
  {
    key: 'key_open_line',
    type: 'string',
    title: 'Shortcut: open current line',
    description: 'Shortcut to open the current line in Windsurf (default `ctrl+alt+o`)',
    default: 'mod+alt+o',
  },
  {
    key: 'key_open_page',
    type: 'string',
    title: 'Shortcut: open current page',
    description: 'Shortcut to open the current page in Windsurf (default `ctrl+o`)',
    default: 'mod+o',
  },
  {
    key: 'key_open_graph',
    type: 'string',
    title: 'Shortcut: open current graph',
    description: 'Shortcut to open the current graph in Windsurf (default `ctrl+shift+o`)',
    default: 'mod+shift+o',
  }]).ready(createModel()).then(main)
