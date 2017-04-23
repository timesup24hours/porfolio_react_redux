FROM node

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# install yarn
# RUN npm install -g yarn

# Cache npm dependencies
COPY package.json /app/
# COPY yarn.lock /app/
RUN npm install

# Copy application files
COPY . /app

# Precompile javascript
RUN ./node_modules/.bin/babel src --out-dir lib

EXPOSE 8080

CMD ["npm", "run", "dev"]
