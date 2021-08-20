<div align="center">
  <a href="https://github.com/sebmandal/mando" target="_blank">
    <img height="180" alt="mando" src="https://github.com/sebmandal/assets/blob/master/mando/mando%20transparent.svg">
  </a>
</div>

### I was using an outdated version of TypeScript, and mistook it for discord.js not complying with TS, but now that I've found out the issue, I'm going back to TypeScript 🥂

**Mando** is an open source, utility Discord bot for fun, administration and utility purposes.
Feel free to contribute, and by any means reach out to me using my social links and I'll be as fast as I can to respond to any and all inquiries :)

Mando was made with developers in mind. Implementing a new command is strict, yet easy once you start doing it. Simply, make a file which exports the name, description, example usage, aliases and a run function. Then add the file path to said command into the command registry file, and everything should work flawlessly.

Keep up with the latest commits and features on the [working-branch](https://github.com/sebmandal/mando/tree/working-branch)

## <div align="center">**Commands**</div>

#### Moderation commands

- The `kick` command kick a specified user from the guild.

#### API fetching commands

- The `covid` command returns information about the pandemic in a specified country.
- The `shorten` command returns a shortened URL.
- The `genius` command returns 5 search results from the Genius API.
- The `food` command returns information about a specific food.
- The `donald` command returns a random Trump quote.

#### Utility commands

- The `avatar` command returns a user's avatar.
- The `source` command returns the Mando GitHub link.
- The `help` command returns a list of commands, or if a command is specified, information about said command.

## <div align="center">**Local installation for developers**</div>

```
github clone https://github.com/sebmandal/mando.git
cd mando
npm i
npm start
```

<div align="center">
  <table>
    <thead>
      <tr>
        <th colspan="2">Add a .env file with the following information.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Variable name (case sensitive)</td>
        <td>Function</td>
      </tr>
      <tr>
        <td>PREFIX</td>
        <td>Your bot's prefix</td>
      </tr>
      <tr>
        <td>TOKEN</td>
        <td>Your bot's OAuth2 app token</td>
      </tr>
      <tr>
        <td>RAPIDAPI_KEY</td>
        <td>Your RAPIDAPI key</td>
      </tr>
    </tbody>
  </table>
  <h6>Grab your RAPID API key from https://rapidapi.com/</h6>
</div>
