FROM alpine

# Installs latest Chromium (100) package.
RUN apk add --no-cache \
  chromium \
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

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0
COPY . .
RUN yarn install --frozen-lockfile --network-timeout 100000
RUN npm run build

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /node_modules \
  && chown -R pptruser:pptruser /package.json \
  && chown -R pptruser:pptruser /yarn.lock \
  && chown -R pptruser:pptruser /dist 

# Run everything after as non-privileged user.
USER pptruser


CMD ["google-chrome-stable"]