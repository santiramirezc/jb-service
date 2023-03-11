const puppeteer = require('puppeteer');
const fs = require('fs');

class Browser {
  constructor() {
    this.browser = null;
    this.browserWSEndpoint = null;
  }

  async launch() {

    if(!PROCESS.ENV.CHROME_DIR){
      throw new Error('CHROME_DIR Enviroment variable not set');
    }
    executablePath = PROCESS.ENV.CHROME_DIR;
    this.browser = await puppeteer.launch({
      headless: false,
      executablePath,
    });

    //get browser id
    const browserWSEndpoint = this.browser.wsEndpoint();
    console.log(browserWSEndpoint)

    //write to file for use in other scripts
    fs.writeFile('./data/browserWSEndpoint.txt', browserWSEndpoint, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }

  async close() {
    await this.browser.close();
  }

}

module.exports = Browser;