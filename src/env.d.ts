type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

interface Env {
  GUESTS: KVNamespace;
  RSVPS: KVNamespace;
}

declare namespace App {
	interface Locals extends Runtime {}
}
