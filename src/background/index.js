/* eslint-disable no-undef,no-unused-vars,no-console */
import _ from 'lodash'

const isDevelopment = process.env.NODE_ENV === 'development'

/*
 * Handle messages from popup and content script
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`request=${JSON.stringify(request)}`)

  switch (request.action) {
    default:
      console.warn(`unknown action ${request.action}`)
      break
  }

  return false // indicate this is a sync response
})

/*
 * things to do upon installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  console.log(`installed reason=${details.reason}`)
})
/*
 * clean up upon unloaded / onsuspended
 * things to do
 */
chrome.runtime.onSuspend.addListener(() => {
  console.log('onSuspend of the extension')
})
