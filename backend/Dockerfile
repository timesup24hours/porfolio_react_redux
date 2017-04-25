FROM node:6.7.0

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
RUN ./node_modules/.bin/babel src --out-dir lib

EXPOSE 8080

CMD ["yarn", "run", "dev"]
