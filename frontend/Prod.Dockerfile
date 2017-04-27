FROM node:7.2.1

ENV API_HOST http://adsfserver:8080

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# install yarn
RUN npm install -g yarn

# Cache npm dependencies
COPY package.json /app/
RUN yarn install

RUN npm rebuild node-sass

# Copy application files
COPY . /app

RUN yarn global add pushstate-server

RUN yarn build

EXPOSE 9000

CMD ["pushstate-server", "build"]
