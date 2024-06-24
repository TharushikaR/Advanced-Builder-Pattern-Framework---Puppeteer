import { expect } from 'chai'
import { step } from "mocha-steps";
import { Page } from "../builder";
import LoginPage from '../pages/LoginPage'

describe("Mocha Steps Demo", function () {
  let page,loginPage;

  before(async function () {
    page = await Page.build("Desktop");
    // mobile = await Page.build("Mobile");
    loginPage = await new LoginPage(page)
  });

  after(async function () {
    await page.close();
   // await mobile.close();
  });

  step("should load google homepage", async () => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    const signInButton = await page.isElementVisible('#signin_button')
    expect(signInButton).to.be.true
  });

  step('should display login form', async () => {
    await page.waitAndClick('#signin_button')
    const loginForm = await page.isElementVisible('#login_form')
    expect(loginForm).to.be.true
    const signInButton = await page.isElementVisible('#signin_button')
    expect(signInButton).to.be.false
  })

  step('should login to application', async () => {
    await loginPage.login('username', 'password')
    const navbar = await page.isElementVisible('.nav-tabs')
    expect(navbar).to.be.true
  })

  step('should have 6 navabr links', async () => {
    expect(await page.getCount('.nav-tabs li')).to.equal(6)
  })


});
