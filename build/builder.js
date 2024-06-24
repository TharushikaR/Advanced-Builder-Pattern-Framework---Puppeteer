"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {
  _createClass(Builder, [{
    key: "build",
    value: async function build(viewport) {
      var launchOptions = {
        headless: true,
        slowMo: 0,
        args: ["--no-sandbox", "--disable-setui-sandbox", "--disable-web-security", "--start-maximized", "--incognito"]
      };

      var browser = await _puppeteer2.default.launch(launchOptions);
      var page = await browser.newPage();
      var extendedPage = new Builder(page);
      page.setDefaultTimeout(10000);
      page.setDefaultNavigationTimeout(20000);

      switch (viewport) {
        case "Mobile":
          var mobileViewPort = _puppeteer2.default.KnownDevices["iPhone X"];
          await page.emulate(mobileViewPort);
          break;
        case "Tablet":
          var tabletViewPort = _puppeteer2.default.KnownDevices["iPad landscape"];
          await page.emulate(tabletViewPort);
          break;
        case "Desktop":
          await page.setViewport({ width: 1920, height: 1080 });
          break;
        default:
          throw new Error("Supported devices are only MOBILE|TABLET|DESKTOP");
      }

      return new Proxy(extendedPage, {
        get: function get(_target, property) {
          return extendedPage[property] || browser[property] || page[property];
        }
      });
    }
  }]);

  function Builder(page) {
    _classCallCheck(this, Builder);

    this.page = page;
  }

  return Builder;
}();

exports.default = Builder;