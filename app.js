// archivo app.js
const { platziIsmScrapper, saveCookies, downloadVideo, responseHack, videoProcesor, discordController } = require('./scrappers');
const fs = require('fs');

(async () => {


  //await discordController()



  //read cursos-platzi.json file
  // const { classesData, ...curso } = require('./data/cursos-platzi-with-ism.json')

  // const clase = classesData[0]
  // await responseHack(clase.ismUrl)
  //await videoProcesor()
  
  //await downloadVideo(clase.ismUrl)
  
  
  //const classesWithISM = await platziIsmScrapper(classesData)

  // //save to cursos-platzi.json file
  // curso.classesData = classesWithISM
  // fs.writeFileSync(`${__dirname}/./data/cursos-platzi-with-ism.json`, JSON.stringify(curso, null, 2))

})();