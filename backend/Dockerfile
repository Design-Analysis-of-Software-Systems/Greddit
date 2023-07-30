FROM node:16.16.0

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 5000
# Exports

CMD ["npm","start"]