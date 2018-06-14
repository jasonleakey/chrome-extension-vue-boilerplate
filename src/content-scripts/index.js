/* eslint-disable no-undef,global-require,func-names */


(function () {
  if (window['content-script-injected']) {
    // duplicated inject, the second and after scripts do nothing
  } else {
    window['content-script-injected'] = true

    // TODO: require your content scripts
  }
}())
