FROM mongo:6 as mongo
COPY init-repl.js /docker-entrypoint-initdb.d/
CMD ["mongod", "--replSet", "rs0", "--bind_ip_all", "--setParameter", "enableLocalhostAuthBypass=true"]
