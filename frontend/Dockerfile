FROM node:7.2.1

# Create app folder
RUN mkdir -p /app
WORKDIR /app

# install yarn
RUN npm install -g yarn

# Cache npm dependencies
COPY package.json /app/

# Copy application files
COPY . /app

# remove the node_modules, because .dockerignore is not working
RUN rm -rf node_modules

RUN yarn install
RUN npm rebuild node-sass --force

EXPOSE 3000

CMD ["yarn", "start"]







# 4 attamp, try more one time
# RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
# RUN curl -L https://github.com/sass/node-sass/releases/download/v4.5.0/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node

# 1 try, does not work
# RUN npm rebuild node-sass

# 2 try. try one more time
# RUN npm uninstall node-sass -g && node cache clean && npm install node-sass

# 3 attemp, does not work
# RUN npm uninstall
# RUN yarn cache clean
# RUN yarn add node-sass --dev
