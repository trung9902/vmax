/* In-view muted preview: local MP4 first, official YouTube otherwise. */
(() => {
  "use strict";
  const section = document.querySelector("#gioi-thieu");
  if (!section) return;
  const config = window.VMAX_CONFIG || {};
  const dialog = section.querySelector("#about-video-dialog");
  const player = dialog.querySelector(".about-video-player");
  const fallback = dialog.querySelector(".about-video-fallback");
  const trigger = section.querySelector("[data-about-video]");
  const poster = trigger.querySelector("img").src;
  const mp4 = config.videoUrl?.trim();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const source = config.videoWatchUrl || fallback.href;
  fallback.href = source;
  let videoId;
  try {
    const url = new URL(source);
    const candidate =
      url.hostname === "youtu.be"
        ? url.pathname.slice(1)
        : url.searchParams.get("v");
    if (/^[\w-]{11}$/.test(candidate || "")) videoId = candidate;
  } catch {
    /* The direct link remains available. */
  }

  const preview = document.createElement("span");
  preview.className = "about-video-inline";
  preview.setAttribute("aria-hidden", "true");
  trigger.append(preview);
  trigger.dataset.previewState = "idle";
  let inView = false;
  let nativePreview;
  let youtubePreview;
  let youtubeReady = false;
  let youtubePending = false;
  let youtubeAPI;
  let mp4Failed = false;
  let modalSession = 0;

  const canPreview = () =>
    config.videoAutoplay !== false &&
    inView &&
    !document.hidden &&
    !reduced.matches &&
    !document.querySelector("dialog[open]");
  const setState = (state) => {
    trigger.dataset.previewState = state;
    if (state === "playing") trigger.dataset.previewLoaded = "true";
  };

  function pausePreview() {
    nativePreview?.pause();
    if (youtubeReady) youtubePreview.pauseVideo();
    if (trigger.dataset.previewState === "playing") setState("paused");
  }
  function makeNative(muted) {
    const video = document.createElement("video");
    video.src = mp4;
    video.poster = poster;
    video.preload = "metadata";
    video.muted = muted;
    video.defaultMuted = muted;
    video.playsInline = true;
    video.controls = !muted;
    if (muted) video.setAttribute("muted", "");
    return video;
  }
  function ensureYouTube() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (youtubeAPI) return youtubeAPI;
    youtubeAPI = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previous === "function") previous();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => reject(new Error("YouTube could not load"));
      document.head.append(script);
    });
    return youtubeAPI;
  }
  function buildYouTubePreview() {
    if (!videoId || youtubePending || youtubePreview) return;
    youtubePending = true;
    ensureYouTube()
      .then((YT) => {
        youtubePending = false;
        if (!canPreview()) return;
        const mount = document.createElement("span");
        preview.replaceChildren(mount);
        youtubePreview = new YT.Player(mount, {
          width: "100%",
          height: "100%",
          videoId,
          playerVars: {
            controls: 0,
            playsinline: 1,
            rel: 0,
            fs: 0,
            disablekb: 1,
            mute: 1,
            origin: location.origin,
          },
          events: {
            onReady(event) {
              youtubeReady = true;
              const frame = event.target.getIframe();
              frame.tabIndex = -1;
              frame.setAttribute("aria-hidden", "true");
              frame.title = "Bản xem trước VMAX tắt tiếng";
              event.target.mute();
              syncPreview();
            },
            onStateChange(event) {
              if (event.data === YT.PlayerState.PLAYING) {
                if (canPreview()) setState("playing");
                else pausePreview();
              } else if (event.data === YT.PlayerState.ENDED) setState("ended");
              else if (event.data === YT.PlayerState.PAUSED) setState("paused");
            },
            onAutoplayBlocked() {
              setState("blocked");
            },
            onError() {
              trigger.dataset.previewLoaded = "false";
              setState("error");
            },
          },
        });
      })
      .catch(() => {
        youtubePending = false;
        setState("error");
      });
  }
  function buildNativePreview() {
    nativePreview = makeNative(true);
    nativePreview.tabIndex = -1;
    preview.replaceChildren(nativePreview);
    nativePreview.addEventListener("playing", () => {
      if (canPreview()) setState("playing");
      else pausePreview();
    });
    nativePreview.addEventListener("pause", () => setState("paused"));
    nativePreview.addEventListener("ended", () => setState("ended"));
    nativePreview.addEventListener("error", () => {
      mp4Failed = true;
      nativePreview?.pause();
      nativePreview?.remove();
      nativePreview = undefined;
      trigger.dataset.previewLoaded = "false";
      setState("error");
      syncPreview();
    });
  }
  function syncPreview() {
    if (!canPreview()) {
      pausePreview();
      return;
    }
    if (mp4 && !mp4Failed) {
      if (!nativePreview) buildNativePreview();
      nativePreview
        .play()
        .then(() => {
          if (!canPreview()) pausePreview();
        })
        .catch(() => {
          if (nativePreview && canPreview()) setState("blocked");
        });
    } else if (videoId) {
      if (!youtubePreview) buildYouTubePreview();
      else if (youtubeReady) {
        youtubePreview.mute();
        youtubePreview.playVideo();
      }
    }
  }
  function openYouTube(start = 0) {
    if (!videoId) return;
    const frame = document.createElement("iframe");
    const url = new URL(`https://www.youtube.com/embed/${videoId}`);
    url.search = new URLSearchParams({
      autoplay: "1",
      rel: "0",
      playsinline: "1",
      start: String(Math.floor(start)),
      origin: location.origin,
    });
    frame.src = url.href;
    frame.title = "Video giới thiệu VMAX — kênh VMAX Tech";
    frame.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allowFullscreen = true;
    player.replaceChildren(frame);
  }
  trigger.addEventListener("click", () => {
    const start =
      nativePreview?.currentTime ||
      (youtubeReady ? youtubePreview.getCurrentTime() : 0);
    pausePreview();
    const session = ++modalSession;
    player.replaceChildren();
    dialog.showModal();
    document.body.classList.add("modal-open");
    if (mp4 && !mp4Failed) {
      const video = makeNative(false);
      video.autoplay = true;
      video.addEventListener(
        "loadedmetadata",
        () => {
          if (start > 0 && start < video.duration) video.currentTime = start;
        },
        { once: true },
      );
      video.addEventListener(
        "error",
        () => {
          if (!dialog.open || session !== modalSession) return;
          mp4Failed = true;
          openYouTube();
        },
        { once: true },
      );
      player.append(video);
      video.play().catch(() => {
        /* Native controls remain available. */
      });
    } else openYouTube(start);
  });
  dialog
    .querySelector(".about-video-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    ++modalSession;
    player.querySelector("video")?.pause();
    player.replaceChildren();
    if (!document.querySelector("dialog[open]"))
      document.body.classList.remove("modal-open");
    trigger.focus({ preventScroll: true });
    syncPreview();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.55) inView = true;
        else if (entry.intersectionRatio < 0.15) inView = false;
        syncPreview();
      },
      { threshold: [0, 0.15, 0.55] },
    ).observe(trigger);
  }
  new MutationObserver(syncPreview).observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["open"],
  });
  document.addEventListener("visibilitychange", syncPreview);
  reduced.addEventListener("change", syncPreview);
})();
