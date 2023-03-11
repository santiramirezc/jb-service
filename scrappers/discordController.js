const Scrapper = require('../classes/Scrapper')
const discordController = new Scrapper({ width: 1270, height: 720})
const fs = require('fs')

module.exports = async () => {

  await discordController.initialize()
  const { page } = discordController
  
  console.log("scraping!")

  // Replace "your-selector" with the selector that matches the element you want to click
  const channel = await page.$('li[data-dnd-name="General"] a');

  try {
    await channel.click();
  } catch (error) {
    console.log(error)
  } 


  // Check if the button exists
  const hideMembersButton = await page.$('button[aria-label="Hide Members"]');
  const fullScreenButton = await page.$('button[aria-label="Full Screen"]');
  const optionsButton = await page.$('button[aria-label="More"]');

  if (hideMembersButton) {
    await hideMembersButton.click();  
  }
  if (fullScreenButton) {
    await fullScreenButton.click();  
  } 

  if (optionsButton) {
    // Click the button 
    await optionsButton.click();  

    //
    const showNonVideoParticipants = await page.$('div[id="channel-call-overflow-popout-no-video-hide"]');
    const dontShowToasts = await page.$('div[id="channel-call-overflow-popout-show-call-chat-toasts"]');
    let isChecked = await page.evaluate(el => el.getAttribute("aria-checked") === "true", showNonVideoParticipants);
    if (isChecked) { 
      await showNonVideoParticipants.click();
    }
    isChecked = await page.evaluate(el => el.getAttribute("aria-checked") === "true", dontShowToasts);
    if (isChecked) {
      await dontShowToasts.click(); 
    }

    await optionsButton.click();   
    await page.mouse.move(0, 0); 
    
  }

  let waitTime = 5000
  while (true) {
    try {

      //if element exists, click it
      const userVideo = await page.$('div[data-selenium-video-tile="479353639035731968"]');
      const allUsersView = await page.$('div.flex-2S1XBF.flex-3BkGQD.horizontal-112GEH.horizontal-1Piu5-.flex-3BkGQD.directionRow-2Iu2A9.justifyCenter-rrurWZ.alignCenter-14kD11.noWrap-hBpHBz.videoGridWrapper-2WpXPj');
      if(userVideo && allUsersView) {
        await userVideo.click();
        console.log("clicking user video when all users view is visible")
      }
      if(userVideo && !allUsersView) {
        //Lets wait longer
        waitTime = 600000
        console.log("video working! let's wait longer")
      }
      if(!userVideo) {
        //Lets wait longer
        waitTime = 3000
        console.log("video is NOT working! let's wait less")
      }
      console.log("waiting "+waitTime+" seconds for user video to appear")
      //wait 5 seconds using setTimeout
      await new Promise(resolve => setTimeout(resolve, waitTime));

    } catch (error) {
      console.log('Element not found, continuing search...');
    }
  }




}