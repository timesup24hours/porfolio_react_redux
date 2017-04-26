FROM node:7.2.1

ENV DB_NAME adsfdb
ENV DB_HOST mongodb://adsfdb:27017/adsfDB

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# install yarn
RUN npm install -g yarn

# Cache npm dependencies
COPY package.json /app/
# COPY yarn.lock /app/
RUN yarn install

# Copy application files
COPY . /app

# Precompile javascript
# RUN ./node_modules/.bin/babel src --out-dir lib
RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]
