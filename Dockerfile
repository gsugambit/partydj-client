FROM node:12.18-alpine

LABEL author="gsugambitcodes@gmail.com"
LABEL twitch_stream="https://twitch.tv/GSUGambitCodes"

# Default Environment. (Cloud Run defaults to 8080)
ARG NODE_PORT=8080

# Working area
WORKDIR /app

# Copy over all the config, install, build to image
COPY . /app
RUN npm ci --production \
    && npm run build

ENV NODE_PORT=$NODE_PORT

ENV PARTYDJ_SERVER_DOMAIN=http://partydj-server

EXPOSE $NODE_PORT

RUN   apk update \                                                                                                                                                                                                                        
    &&   apk add ca-certificates wget \                                                                                                                                                                                                      
    &&   update-ca-certificates    

CMD ["npm","run","start:server"]
