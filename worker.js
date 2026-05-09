export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "thebubbleletter.com") {
      url.hostname = "www.thebubbleletter.com";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
