# newsificator3000

## Описание
Плагин позволяет выделять на странице любой текст и показывать тултип с заданным текстом и/или ссылкой. После установки на всех страницах в Итернете будут подсвечены имена фигуранотов дела 212 и их судей. При клике на имя, показывается краткое описание, если есть, и ссылка на петицию или открытое письмо. 

![Example](/images/example.png)

Плагин может быть расширен добавлением информации о коррупционерах, жуликах и ворах.

## Установить
Плагин скоро [будет доступен](https://chrome.google.com/webstore/search/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%803000?hl=en) в Chrome web store. Публикация плагина может занять несколько дней, потому что он проходит обязательное ревью.



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
