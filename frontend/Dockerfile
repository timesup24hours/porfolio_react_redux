FROM node:6.7.0

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

EXPOSE 3000

CMD ["yarn", "start"]
