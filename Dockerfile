FROM alpine as base
# Installs latest Chromium (100) package.
RUN apk add chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  nodejs \
  npm \
  yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN yarn add puppeteer@13.5.0

FROM base as build

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 100000
COPY . .

RUN npm run build

FROM base as prod
# Puppeteer v13.5.0 works with Chromium 100.
COPY --from=build /dist/ ./dist
COPY --from=build /node_modules/ ./node_modules
COPY --from=build /package.json ./package.json

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /node_modules \
  && chown -R pptruser:pptruser /package.json \
  && chown -R pptruser:pptruser /dist 

# Run everything after as non-privileged user.
USER pptruser


CMD ["google-chrome-stable"]