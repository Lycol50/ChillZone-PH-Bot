const config = require('../../config.json')
module.exports = client => {
  try{
    const stringlength = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
  }catch{ /* */ }

  try{
    const activities_list = [
    `You`,
    "You You",
    `You You You`,
    `You You You You`
    ]; // creates an arraylist containing phrases you want your bot to switch through.

    setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);

    client.user.setActivity(activities_list[index], { type: "LISTENING" });
    }, 10000);
    client.user.setStatus("dnd");
  }catch (e) {
      console.log(String(e.stack).red);
  }
  //Change status each 10 minutes
  setTimeout(()=>{
    try{
          const activities_list = [
    `You`,
    "You You",
    `You You You`,
    `You You You You`
    ]; // creates an arraylist containing phrases you want your bot to switch through.

    setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);

    client.user.setActivity(activities_list[index], { type: "LISTENING" });
    }, 10000);
    client.user.setStatus("dnd");
    }catch (e) {
        console.log(String(e.stack).red);
    }
  }, 10*60*1000)
}