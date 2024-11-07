package main

import (
	"log"
	"net/http"
	"os"
	"time"
)

type timeHandler struct {
	format string
}

func (th timeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	tm := time.Now().Format(th.format)
	w.Write([]byte("The time is: " + tm))
}

func main() {
	th := timeHandler{format: time.RFC1123}
	mux := http.NewServeMux()
	mux.Handle("/", th)

	server := &http.Server{
		Addr:    ":" + os.Getenv("PORT"),
		Handler: mux,
	}

	log.Println("Starting HTTP server")

	log.Fatal(server.ListenAndServe())
}
