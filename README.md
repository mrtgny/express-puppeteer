# Installation
- Make sure the ports "6000","6001", "6002", and "6003" are available on your end!
```
docker-compose up -d --build
```

# Clean
```
docker-compose down --remove-orphans --rmi "local" --volumes;
```