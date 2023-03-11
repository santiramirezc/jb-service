const puppeteer = require('puppeteer');
const fs = require('fs');

class Scrapper {
  constructor(props) {
    props = props || {};
    const { width, height } = props;
    this.browser = null;
    this.page = null;
    this.width = width ? width : 1920;
    this.height = height ? height : 1080;
  }

  async initialize() {
    const browserWSEndpoint = fs.readFileSync(`${__dirname}/../Data/browserWSEndpoint.txt`, 'utf8');
    
    this.browser = await puppeteer.connect({
      browserWSEndpoint,
    });

    console.log("conected to browser")

    const pages = await this.browser.pages()
    this.page = pages[0]
    this.page.setViewport({ width: this.width, height: this.height })

  }

  async listenForResponse() {
    this.page.on('response', async response => {
      const url = response.url()
      
      if (url.includes('Fragments(')) {
        //write to file
        let buffer = await response.buffer()
        fs.writeFileSync(`${__dirname}/../scrappers/test3/${url.split('/').pop()}.mp4`, buffer)
      }

      //get las element of array 


      
      //response data:
      //console.log(await response.text())
      console.log('Response is fired', url)
    })
  }
}

module.exports = Scrapper;