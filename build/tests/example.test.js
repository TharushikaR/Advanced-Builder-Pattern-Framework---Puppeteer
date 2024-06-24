"use strict";

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Mocha Steps Demo", function () {
  var page = void 0;

  before(async function () {
    page = await _builder2.default.build("Desktop");
    // mobile = await Page.build("Mobile");
  });

  // after(async function () {
  //   await page.close();
  //  // await mobile.close();
  // });

  (0, _mochaSteps.step)("should load google homepage", async function () {
    await page.goto("https://google.com");
  });

  (0, _mochaSteps.step)("step 2-should fail", async function () {
    await page.waitForSelector("#abc");
  });

  // step("step 3", async () => {
  //   console.log("step 3");
  // });

  // step("step 4", async () => {
  //   console.log("step 4");
  // });
});