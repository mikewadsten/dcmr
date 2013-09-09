Device Cloud Monitor Receiver (dcmr)
====

A simple receiving-end for HTTP push monitors from Device Cloud by Etherios.

This is a result of what we have deemed to be poor documentation of Device Cloud's
push monitor APIs --- monitor topics and push message formats in particular.

Be aware, if you wish to deploy this application somewhere, that the websocket
handling in the server is a bit broken at the moment. And by that I mean that
the server can only have one active session at a time. So don't deploy this and
share the application URL with your friends -- bad things will happen.
