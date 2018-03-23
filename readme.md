Could perhaps be used as proof of concept for a "pull based" system. Even though this is with queues. It's a bit of a "everything's a nail" approach to the problem but I think it solves some concerns nicely.

Some features:

* system is decoupled. producers and consumers do not _have_ to know about each other, just agree on a queue name. I know this is stringly typed but in any system we need ip/port that's stringly typed anyways.
* modules of the system are testable in isolation, with only rabbitmq (+ docker) as dependency.
* state is persistent with the rabbitmq instance instead of with the producer (even though it's still in-memory). Keeps some consistency if e.g. someone writes a system that crashes all the time. This way consumers still have a defined "desired state" even when a producer is unresponsive.
* as currently configured, consumers don't send acks (I think). This is perhaps a bit hacky but it keeps the last message in queue. There are other ways to do this more cleanly, e.g. lvc plugin: https://github.com/rabbitmq/rabbitmq-lvc-exchange
* queues are limited to one message which is replaced by incoming messages (`drop head` policy), but could potentially be useful to have more?
* the system still appear to be push based for a producer
* there's a lot of configuration available. I guess this is both good and bad. But for example:
    * can dump entire state (i.e. all queues) whenever we want
    * single producer <-> single consumer could be configured via policy if desired
    * different user access levels, perhaps we don't want producers creating queues, just consumers etc.
    * while testing, rabbitmq management console is a powerful tool. even though it's "windowsy/click buttony" it provides a nice realtime overview of system messages/state. first test of a producer is a matter of implementing, running and validating correct messages/state in the management console.

still have a lot to learn about rabbitmq but this far it's been a good hammer.
