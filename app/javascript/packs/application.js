// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import "core-js/stable";
import "regenerator-runtime/runtime";
import $ from 'jquery';
import toastr from 'toastr';
import 'popper.js';
import 'bootstrap';
import './store/configureStore'

window.$ = $;
toastr.options = {
  'closeButton': true,
  'progressBar': true,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "slideDown",
  "hideMethod": "slideUp",
}
window.toastr = toastr;

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
