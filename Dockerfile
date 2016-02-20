FROM node:latest

ENV PORT 3000

EXPOSE 3000

COPY package.json /app/
WORKDIR /app

# improve npm install speed
RUN npm set progress=false
RUN npm install

ENV NODE_ENV production

COPY . /app/
RUN npm run compile

CMD ["npm", "run", "start", "--silent"]
