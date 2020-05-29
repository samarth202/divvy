FROM node:8-alpine

EXPOSE 3000

RUN mkdir /app
WORKDIR /app
ADD package.json package-lock.json /app/
RUN npm i
ADD . /app

RUN npm run test #Can comment this if you do not want to run tests during the build process

CMD ["npm", "start"]