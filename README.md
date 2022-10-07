# Installation
- Make sure the ports "4000" and "5435" are available on your end!
```
docker-compose up -d --build --scale puppeteer-service=3
```

# Clean
```
docker-compose down --remove-orphans --rmi "local" --volumes;
```