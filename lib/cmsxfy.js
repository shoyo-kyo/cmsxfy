/*
 * cmsxfy
 * git@github.com:shoyo-kyo/cmsxfy.git
 *
 * Copyright (c) 2014 Jens Krause
 * Licensed under the MIT license.
 */

'use strict';

var cmsx = require('cmsx'),
  through = require('through');

function hasMithrilExtension(file) {
  return /\.(js|coffee|msx)$/.test(file);
}

function mithrilify(file, opts) {
  opts = opts || {};
  if (!hasMithrilExtension(file)) {
    return through();
  }

  var data = '';

  function write(buf) {
    data += buf;
  }

  function end() {
    try {
      var src = cmsx(data, opts.msx_opts);
      this.queue(src);
    } catch (error) {
      this.emit('error', error);
    }

    this.queue(null);
  }

  return through(write, end);
}

mithrilify.hasMithrilExtension = hasMithrilExtension;

module.exports = mithrilify;
