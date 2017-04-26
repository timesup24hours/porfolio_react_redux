FROM node:7.2.1

ENV DB_NAME adsfdb_dev

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

EXPOSE 8080

CMD ["yarn", "dev"]
