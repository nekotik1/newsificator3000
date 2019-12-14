# newsificator3000

## Development
1. [Install nvm](https://github.com/nvm-sh/nvm) to install Node.js.
2. Setup local environment:
```
nvm use
npm i
```
3. Watch: ```npm run watch```
4. Open chrome://extensions/, select "Dveloper mode", then select "Load unpacked". Specify newsificator3000/dist/ directory.
5. Build: ```npm run build```

## Upload to Google Chrome Extentions Store
1. Create a .zip file:
```
cd newsificator3000
zip -r newsificator3000.zip dist/
```
2. Upload the file to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
