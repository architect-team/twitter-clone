## Getting Started

First, download and install arcctl:

https://github.com/architect-team/arcctl

Then, create your first datacenter (if you haven't already):

```sh
arcctl apply datacenter local https://raw.githubusercontent.com/architect-team/arcctl/main/__tests__/datacenters/local.yml
```

Then, start your development server:

```sh
arcctl up . --datacenter local
```

Finally, open up the application at
[http://app.127.0.0.1.nip.io](http://app.127.0.0.1.nip.io)
