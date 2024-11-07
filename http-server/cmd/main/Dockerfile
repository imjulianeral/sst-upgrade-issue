FROM golang:1.23.1-alpine3.20 AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o bin/http-server cmd/main/main.go

FROM scratch
WORKDIR /app
COPY --from=builder /app/bin/ .
ARG PORT=80
ENV PORT=$PORT
EXPOSE ${PORT}
CMD [ "./http-server" ]